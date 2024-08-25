import MobileDetect from 'mobile-detect';

export const clientDeviceType = () => {
  const md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    return {
      clientDeviceType: 'mobile',
      detail: md.mobile(),
    };
  } else if (md.tablet()) {
    return {
      clientDeviceType: 'tablet',
      detail: md.tablet(),
    };
  } else {
    return {
      clientDeviceType: 'desktop',
      detail: null,
    };
  }
};
