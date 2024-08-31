import useAppStore from '@/stores/useAppStore';
import useUIStore from '@/stores/useUIStore';
import Config from '@/config/Config';
import dayjs from 'dayjs';

const Logger = {
  debug: function (message) {
    console.debug(message);
  },
  info: function (message) {
    console.info(message);
  },
  warn: function (message) {
    console.warn(message);
  },
  error: function (message, consoleByPass = false) {
    if (message) {
      if (!consoleByPass) {
        console.error(message);
      }
      try {
        const { accessToken } = useAppStore.getState();
        const { beforePath, currentPath } = useUIStore.getState();
        const errorDoc: any = {};
        errorDoc.token = accessToken;
        errorDoc.version = Config.appVersion;
        errorDoc.message = message;
        errorDoc.created = dayjs().format('YYYY-MM-DD HH:mm:ss');
        errorDoc.currentRouteUrl = currentPath || '';
        errorDoc.beforeRouteUrl = beforePath || '';
        errorDoc.userAgent = navigator.userAgent || '';
        errorDoc.message = message.substr(0, 2500);
        // TODO : front error 서버 api로 전달
      } catch (e) {
        console.error('Logger error : ' + JSON.stringify(e));
      }
    }
  },
  log: function (message) {
    console.log(message);
  },
};

export default Logger;
