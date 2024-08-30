import useAppStore from '@/stores/useAppStore';

export default (checkGroupCd, checkedAdmin = false) => {
  const { profile } = useAppStore.getState();
  let success = false;
  if (profile) {
    const { groupInfo } = profile;
    if (groupInfo && groupInfo.length) {
      const searchInfo = groupInfo.find((info) => {
        if (info.groupCd === checkGroupCd) {
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
      if (searchInfo) {
        success = true;
      }
    }
  }
  return success;
};
