import type { IBufferRange, ILink, ILinkDecorations, Terminal } from 'xterm';
import { Disposable, DisposableCollection, Emitter, Event, isOSX } from '@ali/ide-core-common';

export class TerminalLink extends Disposable implements ILink {
  decorations: ILinkDecorations;

  private _hoverListeners: DisposableCollection | undefined;

  private readonly _onInvalidated = new Emitter<void>();
  public get onInvalidated(): Event<void> { return this._onInvalidated.event; }

  constructor(
    private readonly _xterm: Terminal,
    public readonly range: IBufferRange,
    public readonly text: string,
    private readonly _viewportY: number,
    private readonly _activateCallback: (event: MouseEvent | undefined, uri: string) => void,
    private readonly _isHighConfidenceLink: boolean,
  ) {
    super();
    this.decorations = {
      pointerCursor: false,
      underline: this._isHighConfidenceLink,
    };
  }

  dispose(): void {
    super.dispose();
    this._hoverListeners?.dispose();
    this._hoverListeners = undefined;
  }

  activate(event: MouseEvent | undefined, text: string): void {
    this._activateCallback(event, text);
  }

  private _addDisposableListener(node: Node, type: string, handler: EventListener) {
    node.addEventListener(type, handler);
    return Disposable.create(() => {
      node.removeEventListener(type, handler);
    });
  }

  hover(event: MouseEvent, text: string): void {
    // Listen for modifier before handing it off to the hover to handle so it gets disposed correctly
    this._hoverListeners = new DisposableCollection();
    this._hoverListeners.push(this._addDisposableListener(document, 'keydown', (e) => {
      if (!e.repeat && this._isModifierDown(e)) {
        this._enableDecorations();
      }
    }));
    this._hoverListeners.push(this._addDisposableListener(document, 'keyup', (e) => {
      if (!e.repeat && !this._isModifierDown(e)) {
        this._disableDecorations();
      }
    }));

    // Listen for when the terminal renders on the same line as the link
    this._hoverListeners.push(this._xterm.onRender((e) => {
      const viewportRangeY = this.range.start.y - this._viewportY;
      if (viewportRangeY >= e.start && viewportRangeY <= e.end) {
        this._onInvalidated.fire();
      }
    }));

    this._hoverListeners.push(this._addDisposableListener(document, 'mousemove', (e) => {
      // Update decorations
      if (this._isModifierDown(e)) {
        this._enableDecorations();
      } else {
        this._disableDecorations();
      }
    }));
  }

  leave(): void {
    this._hoverListeners?.dispose();
    this._hoverListeners = undefined;
  }

  private _enableDecorations(): void {
    if (!this.decorations.pointerCursor) {
      this.decorations.pointerCursor = true;
    }
    if (!this.decorations.underline) {
      this.decorations.underline = true;
    }
  }

  private _disableDecorations(): void {
    if (this.decorations.pointerCursor) {
      this.decorations.pointerCursor = false;
    }
    if (this.decorations.underline !== this._isHighConfidenceLink) {
      this.decorations.underline = this._isHighConfidenceLink;
    }
  }

  private _isModifierDown(event: MouseEvent | KeyboardEvent): boolean {
    return isOSX ? event.metaKey : event.ctrlKey;
  }
}
