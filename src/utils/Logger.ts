import useAppStore from '@/stores/useAppStore';
import useUIStore from '@/stores/useUIStore';
import Config from '@/config/Config';
import dayjs from 'dayjs';
import ApiService from '@/services/ApiService';

const Logger = {
  debug: function (message) {
    console.debug(message);
  },
  info: function (message) {
    // TODO : front info log 서버 api로 전달
    console.info(message);
  },
  warn: function (message) {
    console.warn(message);
  },
  error: async (message, consoleByPass = false) => {
    if (message) {
      if (!consoleByPass) {
        console.error(message);
      }
      try {
        let applyMessage = message.toString();
        if (message instanceof Error) {
          if (message.message) {
            applyMessage = message.message;
          }
        }
        const { accessToken } = useAppStore.getState();
        const { beforePath, currentPath } = useUIStore.getState();
        const errorDoc: any = {};
        errorDoc.token = accessToken;
        errorDoc.version = Config.appVersion;
        errorDoc.created = dayjs().format('YYYY-MM-DD HH:mm:ss');
        errorDoc.currentRouteUrl = currentPath || '';
        errorDoc.beforeRouteUrl = beforePath || '';
        errorDoc.userAgent = navigator.userAgent || '';
        errorDoc.message = applyMessage.substr(0, 2500);
        await ApiService.post('com/receive-fe-error', errorDoc);
      } catch (e) {
        console.error(`Logger error : ${e}`);
      }
    }
  },
  log: function (message) {
    console.log(message);
  },
};

export default Logger;
