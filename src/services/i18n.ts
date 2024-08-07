import useAppStore from '@/stores/useAppStore';

const getMessage = (messageKey, defaultMessage = '') => {
  if (messageKey) {
    const { messageAllList, currentLocale } = useAppStore.getState();
    const currentLocaleMessageMap = messageAllList[currentLocale];
    const messageLabel = currentLocaleMessageMap[messageKey] || defaultMessage || messageKey;
    return messageLabel;
  }
  return 'not message key';
};

export default getMessage;
