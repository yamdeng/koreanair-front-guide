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
  error: function (message) {
    console.error(message);
    try {
      //   const appStore = rootStore.appStore;
      //   const uiStore = rootStore.uiStore;
      //   const errorDoc = {};
      //   errorDoc.token = appStore.token;
      //   errorDoc.version = Config.version;
      //   errorDoc.message = message;
      //   errorDoc.created = moment().format('YYYY-MM-DD HH:mm:ss');
      //   errorDoc.currentRouteUrl = uiStore.currentRouteUrl || '';
      //   errorDoc.beforeRouteUrl = uiStore.beforeRouteUrl || '';
      //   errorDoc.userAgent = navigator.userAgent || '';
      //   errorDoc.message = message.substr(0, 2500);
    } catch (e) {
      console.error('Logger error : ' + JSON.stringify(e));
    }
  },
  log: function (message) {
    console.log(message);
  },
};

export default Logger;
