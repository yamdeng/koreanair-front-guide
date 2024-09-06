import useAppStore from '@/stores/useAppStore';

export default (checkGroupCd, checkedAdmin = false) => {
  const { profile } = useAppStore.getState();
  let success = false;
  if (profile && checkGroupCd) {
    const checkGroupCdList = Array.isArray(checkGroupCd) ? checkGroupCd : [checkGroupCd];
    const { groupInfo } = profile;
    if (groupInfo && groupInfo.length) {
      const searchInfo = groupInfo.find((info) => {
        const filterList = checkGroupCdList.filter((filterGroupCd) => {
          if (info.groupCd === filterGroupCd) {
            if (checkedAdmin) {
              if (info.groupAdminYn === 'Y') {
                return true;
              }
            } else {
              return true;
            }
          }
          return false;
        });
        if (filterList && filterList.length) {
          return true;
        } else {
          return false;
        }
      });
      if (searchInfo) {
        success = true;
      }
    }
  }
  return success;
};
