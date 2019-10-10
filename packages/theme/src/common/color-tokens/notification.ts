import { localize } from '@ali/ide-core-common';
import { registerColor, lighten, darken } from '../color-registry';
import { editorWidgetBackground } from './editor';
import { contrastBorder } from './base';
import { textLinkForeground } from './text';

// < --- Notifications --- >

export const NOTIFICATIONS_CENTER_BORDER = registerColor('notificationCenter.border', {
  dark: null,
  light: null,
  hc: contrastBorder,
}, localize('notificationCenterBorder', 'Notifications center border color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_TOAST_BORDER = registerColor('notificationToast.border', {
  dark: null,
  light: null,
  hc: contrastBorder,
}, localize('notificationToastBorder', 'Notification toast border color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_FOREGROUND = registerColor('notifications.foreground', {
  dark: null,
  light: null,
  hc: null,
}, localize('notificationsForeground', 'Notifications foreground color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_BACKGROUND = registerColor('notifications.background', {
  dark: editorWidgetBackground,
  light: editorWidgetBackground,
  hc: editorWidgetBackground,
}, localize('notificationsBackground', 'Notifications background color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_LINKS = registerColor('notificationLink.foreground', {
  dark: textLinkForeground,
  light: textLinkForeground,
  hc: textLinkForeground,
}, localize('notificationsLink', 'Notification links foreground color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_CENTER_HEADER_FOREGROUND = registerColor('notificationCenterHeader.foreground', {
  dark: null,
  light: null,
  hc: null,
}, localize('notificationCenterHeaderForeground', 'Notifications center header foreground color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_CENTER_HEADER_BACKGROUND = registerColor('notificationCenterHeader.background', {
  dark: lighten(NOTIFICATIONS_BACKGROUND, 0.3),
  light: darken(NOTIFICATIONS_BACKGROUND, 0.05),
  hc: NOTIFICATIONS_BACKGROUND,
}, localize('notificationCenterHeaderBackground', 'Notifications center header background color. Notifications slide in from the bottom right of the window.'));

export const NOTIFICATIONS_BORDER = registerColor('notifications.border', {
  dark: NOTIFICATIONS_CENTER_HEADER_BACKGROUND,
  light: NOTIFICATIONS_CENTER_HEADER_BACKGROUND,
  hc: NOTIFICATIONS_CENTER_HEADER_BACKGROUND,
}, localize('notificationsBorder', 'Notifications border color separating from other notifications in the notifications center. Notifications slide in from the bottom right of the window.'));
