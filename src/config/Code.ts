import _ from 'lodash';
import { WORK_SCOPE_AVIATION, WORK_SCOPE_OCCUPATION, WORK_SCOPE_SYSTEM } from './CommonConstant';

const Code: any = {};

/*
    업무구분 : 관리자
*/
Code.adminWorkScope = [
  {
    label: '항공안전',
    value: WORK_SCOPE_AVIATION,
  },
  {
    label: '산업안전',
    value: WORK_SCOPE_OCCUPATION,
  },
  {
    label: '시스템',
    value: WORK_SCOPE_SYSTEM,
  },
];

/*
    업무구분 : 사용자
*/
Code.userWorkScope = [
  {
    label: '항공안전',
    value: WORK_SCOPE_AVIATION,
  },
  {
    label: '산업안전',
    value: WORK_SCOPE_OCCUPATION,
  },
];

/*
    사용여부
*/
Code.useYn = [
  {
    label: '예',
    value: 'Y',
  },
  {
    label: '아니오',
    value: 'N',
  },
];

// 코드명 가져오기 : value 기준
Code.getCodeLabelByValue = function (codeCategory, codeValue) {
  let codeLabel = null;
  const codeList = Code[codeCategory] || [];
  const searchIndex = _.findIndex(codeList, (codeInfo) => {
    if (codeValue === codeInfo.value) {
      return true;
    } else {
      return false;
    }
  });
  if (searchIndex !== -1) {
    const findCodeInfo = codeList[searchIndex];
    codeLabel = findCodeInfo.label;
  }
  return codeLabel;
};

export default Code;
