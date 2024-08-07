import useAppStore from '@/stores/useAppStore';

// TODO : 자체 cache 반영 + changeLocale시에 cache 초기화

export const getCodeListByCodeGrpId = (codeGrpId) => {
  const { codeAllMap } = useAppStore.getState();
  if (codeGrpId) {
    const searchCodeOptions = codeAllMap[codeGrpId];
    if (searchCodeOptions && searchCodeOptions.length) {
      return searchCodeOptions;
    }
  }
  return [];
};

export const getCodeInfo = (codeGrpId, codeValue) => {
  const { codeAllMap } = useAppStore.getState();
  if (codeGrpId) {
    const searchCodeOptions = codeAllMap[codeGrpId];
    if (searchCodeOptions && searchCodeOptions.length) {
      return searchCodeOptions.find((info) => info.codeId === codeValue);
    }
  }
  return null;
};

export const getCodeLabelByValue = (codeGrpId, codeValue) => {
  const { codeAllMap, currentLocale } = useAppStore.getState();
  let codeLabel = '';
  if (codeGrpId && codeValue) {
    const searchCodeOptions = codeAllMap[codeGrpId];
    if (searchCodeOptions && searchCodeOptions.length) {
      const searchIndex = searchCodeOptions.findIndex((codeInfo) => codeInfo.codeId === codeValue);
      if (searchIndex !== -1) {
        const findCodeInfo = searchCodeOptions[searchIndex];
        const { codeNameKor, codeNameEng } = findCodeInfo;
        codeLabel = codeNameKor;
        if (currentLocale === 'en') {
          codeLabel = codeNameEng;
        }
      }
    }
  }
  return codeLabel;
};

export const getOptions = (codeGrpId) => {
  const { codeAllMap, currentLocale } = useAppStore.getState();
  if (codeGrpId) {
    const searchCodeOptions = codeAllMap[codeGrpId];
    if (searchCodeOptions) {
      const options = searchCodeOptions.map((info) => {
        const { codeNameKor, codeNameEng, codeId } = info;
        let label = codeNameKor;
        if (currentLocale === 'en') {
          label = codeNameEng;
        }
        return {
          value: codeId,
          label: label,
        };
      });
      return options;
    }
  }
  return [];
};

const CodeSerivce = {
  getCodeListByCodeGrpId,
  getCodeInfo,
  getOptions,
  getCodeLabelByValue,
};

export default CodeSerivce;
