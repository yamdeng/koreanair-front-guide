import {
  DATE_PICKER_TYPE_DATE,
  DATE_PICKER_TYPE_MONTH,
  DATE_PICKER_TYPE_QUARTER,
  DATE_PICKER_TYPE_YEAR,
} from '@/config/CommonConstant';
import _ from 'lodash';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const convertEnterStringToBrTag = function (value) {
  return value.replace(/\\r\\n|\r\n|\n|\\n/g, '<br/>');
};

const replaceHighlightMarkup = function (text, highlightText) {
  let resultMarkup = text;
  if (text && highlightText) {
    highlightText = _.escapeRegExp(highlightText);
    const highlightRegExp = new RegExp(highlightText, 'g');
    resultMarkup = text.replace(highlightRegExp, `<span class="publish-table-highlight">${highlightText}</span>`);
  }
  return resultMarkup;
};

const getFilterListByMenuList = (menuList, keyword) => {
  const list = menuList;
  const filtedList = list.filter((menuInfo) => {
    const { title, fileName, path } = menuInfo;
    const componentName = fileName || path;
    if (keyword) {
      return title.indexOf(keyword) !== -1 || componentName.indexOf(keyword) !== -1;
    } else {
      return true;
    }
  });
  return filtedList;
};

const formatString = (template, ...args) => {
  return template.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === 'undefined' ? match : args[index];
  });
};

// 로컬 스토리지에 정보 저장 : json string으로 저장
const saveInfoToLocalStorage = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// 로컬 스토리지에 정보 가져오기 : json object로 가져옴
const getByLocalStorage = (key) => {
  const jsonString = localStorage.getItem(key);
  if (jsonString) {
    return JSON.parse(jsonString);
  } else {
    return null;
  }
};

const mergeColumnInfosByLocal = (columns) => {
  const localColumnInfos = getByLocalStorage(location.pathname);
  const applyColumns = _.cloneDeep(columns);
  if (localColumnInfos && localColumnInfos.length) {
    applyColumns.forEach((columnInfo) => {
      const searchLocalInfo = localColumnInfos.find((localInfo) => localInfo.field === columnInfo.field);
      if (searchLocalInfo) {
        Object.assign(columnInfo, searchLocalInfo);
      }
    });
  }
  return applyColumns;
};

const saveColumnInfos = (columns) => {
  saveInfoToLocalStorage(location.pathname, columns);
};

const applyGroupingRowSpanByPageSize = (data, columnName, pageSize = 1000000) => {
  let applyRowIndex = 0;
  let rowSpanGroupCount = 1;
  let diffValue = '';

  for (let index = 0; index < data.length; index++) {
    const dataInfo = data[index];
    const currentValue = dataInfo[columnName];
    if (index !== 0 && index % pageSize === 0) {
      data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
      rowSpanGroupCount = 1;
      applyRowIndex = index;
    } else {
      if (diffValue === currentValue) {
        rowSpanGroupCount++;
        if (index === data.length - 1) {
          data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
        }
      } else {
        data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
        rowSpanGroupCount = 1;
        applyRowIndex = index;
      }
    }
    diffValue = currentValue;
  }
  return _.cloneDeep(data);
};

// upper_dept_cd = '0'
// listToTreeData(deptList.result, 'DEPT_ID', 'PRNT_ID', '10073')
function listToTreeData(items, treeKey, treeParentKey, rootValue) {
  const rootItems = [];
  const lookup = {};
  for (const item of items) {
    const lookUpTreeValue = item[treeKey];
    const lookUpTreeParentValue = item[treeParentKey];
    if (!lookup[lookUpTreeValue]) {
      lookup[lookUpTreeValue] = { children: [] };
    }
    lookup[lookUpTreeValue] = { ...item, children: lookup[lookUpTreeValue].children };

    // if (lookUpTreeParentValue == rootValue) {
    // if (lookUpTreeValue == rootValue) {
    if (lookUpTreeParentValue == rootValue) {
      rootItems.push(lookup[lookUpTreeValue]);
    } else {
      if (!lookup[lookUpTreeParentValue]) {
        lookup[lookUpTreeParentValue] = { children: [] };
      }
      lookup[lookUpTreeParentValue].children.push(lookup[lookUpTreeValue]);
    }
  }
  return rootItems;
}

const getDateFormatByPickerType = (pickerType, useWithTimePicker, excludeSecondsTime) => {
  if (pickerType === DATE_PICKER_TYPE_DATE) {
    if (useWithTimePicker) {
      if (excludeSecondsTime) {
        return 'YYYY-MM-DD HH:mm';
      } else {
        return 'YYYY-MM-DD HH:mm:ss';
      }
    } else {
      return 'YYYY-MM-DD';
    }
  } else if (pickerType === DATE_PICKER_TYPE_MONTH) {
    return 'YYYY-MM';
  } else if (pickerType === DATE_PICKER_TYPE_YEAR) {
    return 'YYYY';
  } else if (pickerType === DATE_PICKER_TYPE_QUARTER) {
    return `YYYY-MM-DD`;
  }
};

// 'YYYY-MM-DD'인 날짜를 분기 문자열로 변환
const convertDateToQuarterValueString = (dateStringInfo) => {
  let result = null;
  if (dateStringInfo) {
    if (Array.isArray(dateStringInfo)) {
      if (dateStringInfo.length) {
        result = dateStringInfo.map((dateString) => dayjs(dateString, 'YYYY-MM-DD').format('YYYY-[Q]Q'));
      }
    } else {
      result = dayjs(dateStringInfo, 'YYYY-MM-DD').format('YYYY-[Q]Q');
    }
  }

  return result;
};

// date util start

// // '2021-09-01' ---> new Date 타입으로 변경
// const stringToDate = function (dateString, format) {
//   let resultDate = null;
//   if (dateString) {
//     resultDate = moment(dateString, format).toDate();
//   }
//   return resultDate;
// };

// // '14:59' ---> new Date 타입으로 변경
// const stringToTime = function (timeString, format) {
//   let resultDate = null;
//   if (timeString) {
//     resultDate = moment(timeString, format).toDate();
//   }
//   return resultDate;
// };

// const dateToString = function (date, format) {
//   return moment(date).format(format);
// };

// // Date 타입 or moment 타입의 값이 오늘 날짜인지 체크
// const isToday = function (date) {
//   return moment(date).isSame(moment(), 'day');
// };

// // date value를 custom한 format으로 변환
// const convertDate = function (value, valueFormat, displayFormat) {
//   let displayDate = '';
//   displayFormat = displayFormat || Config.defaultDateDisplayFormat;
//   if (value) {
//     displayDate = moment(value, valueFormat).format(displayFormat);
//   }
//   return displayDate;
// };

/**
 *
 * @param dateLabel : moment 라이브러리 add, substract 함수의 파라미터(문자열)
 * 예시) dateLabel : '1 days', '10 minutes'
 * https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/02-subtract/
 * @returns
 */
// export const convertLabelToDate = (dateLabel: string): Date => {
//   const dateLabelDetails = dateLabel.split(' ');
//   const dateNumber = Number(dateLabelDetails[0]);
//   const dateKind = dateLabelDetails[1] as moment.unitOfTime.DurationConstructor;

//   return moment().subtract(dateNumber, dateKind).toDate();
// };

// TODO : convertLabelToDate 체크
// TODO : 2개의 date 기준으로 차이값 반환하기
// TODO : 1개의 date와 수로 결과값 반환 : 문자열, date
// TODO : <DateValue value="" valueFormat="" displayFormat="" />, <TimeValue value="" valueFormat="" displayFormat="" />
// <DateValue/>, <TimeValue/>의 기본 valueFormat과 displayFormat이 존재함

// date util end

/**
 *
 * @param params : query string으로 변환할 object
 * 예시) { page:1, pageSize: 10} : ?page=1&pageSize=10
 * https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
 */
const objectToQueryString = (params: object): string => {
  const urlSearchParamsInstance = new URLSearchParams(params as Record<string, string>);

  return urlSearchParamsInstance.toString() ? '?' + urlSearchParamsInstance.toString() : '';
};

const getQueryStringByArray = (parameterName: string, arr: string[]): string => {
  let result = '';
  if (arr && arr.length) {
    for (let arrIndex = 0; arrIndex < arr.length; arrIndex++) {
      const stringValue = arr[arrIndex];
      if (arrIndex === 0) {
        result = result + `?${encodeURIComponent(parameterName)}=` + stringValue;
      } else {
        result = result + `&${encodeURIComponent(parameterName)}=` + stringValue;
      }
    }
  }

  return result;
};

const getUUID = () => {
  return nanoid();
};

export default {
  convertEnterStringToBrTag,
  replaceHighlightMarkup,
  getFilterListByMenuList,
  formatString,
  saveInfoToLocalStorage,
  getByLocalStorage,
  mergeColumnInfosByLocal,
  saveColumnInfos,
  applyGroupingRowSpanByPageSize,
  listToTreeData,
  getDateFormatByPickerType,
  convertDateToQuarterValueString,
  getQueryStringByArray,
  objectToQueryString,
  getUUID,
};
