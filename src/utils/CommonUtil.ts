import {
  DATE_PICKER_TYPE_DATE,
  DATE_PICKER_TYPE_MONTH,
  DATE_PICKER_TYPE_QUARTER,
  DATE_PICKER_TYPE_YEAR,
  ERROR_TYPE_CORE,
} from '@/config/CommonConstant';
import dayjs from 'dayjs';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import Logger from './Logger';
import useUIStore from '@/stores/useUIStore';
import { AxiosError } from 'axios';

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
  } else {
    localStorage.setItem(key, '');
  }
};

// 로컬 스토리지에 정보 가져오기 : json object로 가져옴
const getByLocalStorage = (key) => {
  const jsonString = localStorage.getItem(key);
  try {
    if (jsonString) {
      return JSON.parse(jsonString);
    } else {
      return null;
    }
  } catch (e) {
    Logger.error(`localStorage getByLocalStorage error : ${key}`);
  }
  return null;
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

function convertTreeData(treeData, titleColumn, valueColumn) {
  treeData.forEach((treeInfo) => {
    if (titleColumn) {
      treeInfo.title = treeInfo[titleColumn];
    }
    if (valueColumn) {
      treeInfo.value = treeInfo[valueColumn];
    }
    if (treeInfo.children && treeInfo.children.length) {
      convertTreeData(treeInfo.children, titleColumn, valueColumn);
    }
  });
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

const validateYupForm = async (yupFormSchema, formValue) => {
  let success = true;
  let firstErrorFieldKey = '';
  const errors = {};
  try {
    await yupFormSchema.validate(formValue, { abortEarly: false });
  } catch (error: any) {
    success = false;
    console.log(error.errors);
    const yupErrors = error.inner;
    firstErrorFieldKey = yupErrors[0].path;
    const groupErrorInfo = _.groupBy(yupErrors, 'path');
    const errorKeys = Object.keys(groupErrorInfo);
    errorKeys.forEach((errorKey) => {
      errors[errorKey] = groupErrorInfo[errorKey][0].message;
    });
  }
  return { success, firstErrorFieldKey, errors };
};

const getNowByServerTime = (dateType = 'dateTime') => {
  const serverTimeDiffSecondValue = getByLocalStorage('serverTimeDiffSecondValue');
  if (serverTimeDiffSecondValue) {
    const resultDate = dayjs().add(serverTimeDiffSecondValue, 'second');
    if (dateType === 'date') {
      return resultDate.format('YYYY-MM-DD');
    } else {
      return resultDate.format('YYYY-MM-DD HH:mm:ss');
    }
  }
  return null;
};

const convertNumberFormat = (numberValue) => {
  const result = '';
  if (numberValue !== null && numberValue !== undefined) {
    return Number(numberValue).toLocaleString();
  }
  return result;
};

// 오늘날짜 가져오기 (EX: 2024-08-28)
const getToDate = () => {
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  return formattedDate;
};

// 전역 promise 에러 handle
const handleGlobalUnhandledRejection = function (event) {
  const reason = event.reason;
  if (reason) {
    const errorType = reason.errorType || '';
    if (reason instanceof AxiosError || errorType === 'api') {
      const apiConfig = reason.config || {};
      if (reason.response && reason.response.status === 401) {
        return;
      }

      const appErrorObject = {
        errorType: 'api',
        message: reason.message,
        url: apiConfig.url || '',
        method: apiConfig.method || '',
        stack: reason.stack ? reason.stack : '',
      };
      Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));
    } else {
      const appErrorObject = {
        errorType: 'otherpromis',
        message: reason.message || reason.toString(),
        stack: reason.stack ? reason.stack : '',
      };
      Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));
    }
  }
};

// 전역 오류 에러 handle
const handleGlobalError = function (message, sourceUrl, lineNumber, column, errorObject) {
  if (sourceUrl && sourceUrl.includes('.vite')) {
    // Vite와 관련된 에러는 무시
    return true;
  }
  const { lastErrorMessage, lastSourceUrl } = useUIStore.getState();
  if (message && sourceUrl) {
    if (lastErrorMessage === message && sourceUrl === lastSourceUrl) {
      return true;
    }
    useUIStore.getState().changeErrorInfo(message, sourceUrl);
  }
  errorObject = errorObject || {};
  if (errorObject && typeof errorObject === 'string') {
    errorObject = {
      message: errorObject,
    };
  }
  if (!errorObject.message) {
    errorObject.message = message || 'no_message';
  }

  // full error message
  let displayErrorMessage = '';
  displayErrorMessage = displayErrorMessage + 'url : ' + sourceUrl + '\n';
  displayErrorMessage = displayErrorMessage + 'lineNumber : ' + lineNumber + '\n';
  displayErrorMessage = displayErrorMessage + 'column : ' + column + '\n';
  displayErrorMessage = displayErrorMessage + 'message : ' + errorObject.message + '\n';

  // message, stack, errorType
  const appErrorObject: any = { errorType: errorObject.errorType || ERROR_TYPE_CORE, message: displayErrorMessage };
  if (errorObject.stack) {
    appErrorObject.statck = errorObject.stack;
  }
  Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));
  return false;
};

// report 페이지 handle 공통 함수
const openReportPage = (fileName, reportArg) => {
  window.open(
    `${import.meta.env.VITE_API_URL}/api/v1/ubihtml?reportFile=${fileName}&reportArg=${encodeURIComponent(reportArg)}`,
    '_blank',
    'status=no,titlebar=no,menubar=no'
  );
};

// yup error 기준으로 오류가 난 list index 추출, 첫번째 에러 정보 반환(row의 어떤 컬럼이 오류가 났는지)
const getYupListErrorInfo = (yupErrors, firstErrorPath, listKey = 'list') => {
  const validResult: any = {
    firstListErrorPath: '',
    firstErrorIndex: -1,
    isListFirstError: false,
    listErrorIndexList: [],
  };
  const listErrorIndexList = yupErrors
    .filter((error) => error.path.startsWith(listKey))
    .map((error) => {
      // const match = error.path.match(/list\[(\d+)\]/);
      const regex = listKey ? new RegExp(`${listKey}\\[(\\d+)\\]`) : new RegExp(`\\[(\\d+)\\]`);
      const match = error.path.match(regex);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((index) => index !== null);

  // 첫 번째 에러와 해당 경로 추출
  if (listErrorIndexList.length > 0) {
    const applyListErrorIndexList = _.uniq(listErrorIndexList);
    const firstErrorIndex = applyListErrorIndexList[0];
    const firstError = yupErrors.find((error) => error.path.indexOf(`${listKey}[${firstErrorIndex}]`) !== -1);
    validResult.listErrorIndexList = applyListErrorIndexList;
    validResult.firstListErrorPath = firstError.path;
    validResult.firstErrorIndex = firstErrorIndex;
    // 첫번째 에러가 list 에러면은 flag 반영
    if (firstErrorPath === validResult.firstListErrorPath) {
      validResult.isListFirstError = true;
    }
  }
  return validResult;
};

const getNowMonthString = () => {
  return dayjs().format('YYYY-MM');
};

// date value를 custom한 format으로 변환
const convertDate = (value, valueFormat, displayFormat = '') => {
  let displayDate = '';
  const applyDisplayFormat = displayFormat ? displayFormat : valueFormat;
  if (value) {
    displayDate = dayjs(value, valueFormat).format(applyDisplayFormat);
  }
  return displayDate;
};

const getDateListByMonth = (searchMonth) => {
  const result = [];
  const monthFormat = 'YYYYMM';
  const dateFormat = 'YYYYMMDD';
  const firstDateString = dayjs(searchMonth, monthFormat).startOf('month').format(dateFormat);
  const endDateString = dayjs(searchMonth, monthFormat).endOf('month').format(dateFormat);

  // dateString : '20240901'
  // date : 1 ~ 31
  // weekday : 0 ~ 6

  let dayPlusIndex = 0;

  while (dayPlusIndex < 32) {
    const nextDate = dayjs(firstDateString, dateFormat).add(dayPlusIndex, 'day');
    const nextDateString = nextDate.format(dateFormat);
    const weekday = nextDate.day();
    result.push({
      dateString: nextDateString,
      date: nextDate.date(),
      weekday: nextDate.day(),
      isHoliday: weekday === 0,
      isSaturday: weekday === 6,
    });
    if (nextDateString === endDateString) {
      break;
    }
    dayPlusIndex++;
  }

  return result;
};

const convertWeekDayList = (dataList) => {
  const result = [];
  // 0 ~ 6 : 일 ~ 토
  let weekDayList = [null, null, null, null, null, null, null];
  // for : 1~31일 반복함
  for (let index = 0; index < dataList.length; index++) {
    // 해당 일에 요일 정보를 가져옴 : 일 ~ 토
    const dayInfo = dataList[index];
    weekDayList[dayInfo.weekday] = dayInfo;
    // 토요일이면 초기화 넣고 초기화
    if (dayInfo.weekday === 6 || index === dataList.length - 1) {
      result.push(weekDayList);
      // 마지막일이 아닌 경우만 변수 초기화 셋팅
      if (index !== dataList.length - 1) {
        weekDayList = [null, null, null, null, null, null, null];
      }
    }
  }
  return result;
};

const calculateDate = (value, valueFormat, dateKind, calculateNumber, displayFormat = '') => {
  let displayDate = '';
  const applyDisplayFormat = displayFormat ? displayFormat : valueFormat;
  if (value) {
    displayDate = dayjs(value, valueFormat).add(calculateNumber, dateKind).format(applyDisplayFormat);
  }
  return displayDate;
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
  validateYupForm,
  getNowByServerTime,
  convertNumberFormat,
  convertTreeData,
  getToDate,
  handleGlobalError,
  handleGlobalUnhandledRejection,
  openReportPage,
  getYupListErrorInfo,
  getNowMonthString,
  convertDate,
  getDateListByMonth,
  convertWeekDayList,
  calculateDate,
};
