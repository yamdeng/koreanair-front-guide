import useAppStore from '@/stores/useAppStore';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

export const getMessage = (messageKey, defaultMessage = '') => {
  if (messageKey) {
    const { messageAllList, currentLocale } = useAppStore.getState();
    const currentLocaleMessageMap = messageAllList[currentLocale];
    const messageLabel = currentLocaleMessageMap[messageKey] || defaultMessage || messageKey;
    return messageLabel;
  }
  return 'not message key';
};

export const initializeI18n = async (messageMap) => {
  i18n.use(initReactI18next).init({
    resources: {
      ko: {
        translation: messageMap['ko'],
      },
      en: {
        translation: messageMap['en'],
      },
    },
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
