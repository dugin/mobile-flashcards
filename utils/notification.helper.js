import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'Flashcard:notifications';

const createNotification = () => {
  return {
    title: 'Daily Studies',
    body: "You haven't started any quiz today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
};

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);

  return Notifications.cancelAllScheduledNotificationsAsync();
}
export async function setLocalNotification() {
  const notification = await AsyncStorage.getItem(NOTIFICATION_KEY);

  if (JSON.parse(notification) === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20);
      tomorrow.setMinutes(0);

      Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tomorrow,
        repeat: 'day'
      });

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
}
