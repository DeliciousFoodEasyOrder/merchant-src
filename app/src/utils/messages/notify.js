import { Notification } from 'element-ui';

export function notify({type, title, message, duration}) {
  try {
    Notification({
      type,
      title,
      message,
      duration
    });
  } catch(e) {
    console.error('Notification error:', e);
  }
}