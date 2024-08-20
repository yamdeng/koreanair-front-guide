import useAppStore from '@/stores/useAppStore';

// TODO : 자체 cache 반영 + changeLocale시에 cache 초기화

// code그룹id 기준으로 original 코드 목록 반환
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

// code그룹id + codeValue 기준으로 original 코드 info 반환
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

// code그룹id + codeValue 기준으로 라벨 반환 : 다국어 반영
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

// code그룹id 기준으로 코드 목록 반환 : code / value 키 적용
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

// 서버에서 받은 값을 기준으로 코드 목록 변환 : code / value 키 적용
export const convertOptionsByCurrentLocale = (options) => {
  const { currentLocale } = useAppStore.getState();
  if (options && options.length) {
    return options.map((info) => {
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
  }
  return [];
};

const CodeService = {
  getCodeListByCodeGrpId,
  getCodeInfo,
  getOptions,
  getCodeLabelByValue,
  convertOptionsByCurrentLocale,
};

export default CodeService;
