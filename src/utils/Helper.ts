import _ from 'lodash';
import Config from '@/config/Config';
import moment from 'moment';
import queryString from 'query-string';

/*

  공통 Helper 함수

*/

// 로컬 스토리지에 정보 저장 : json string으로 저장
const saveInfoToLocalStorage = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// 로컬 스토리지에 정보 가져오기 : json object로 가져옴
const getByLocalStorage = (key) => {
  let jsonString = localStorage.getItem(key);
  if (jsonString) {
    return JSON.parse(jsonString);
  } else {
    return null;
  }
};

// 로컬 스토리지에 정보 삭제하기
const removeInfoToLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// url 라우트 정보중 /(슬러시) 기준 첫번째 route 이름 반환
const get1DepthRouteName = function (routeUrl) {
  let sliceFirstSlashString = routeUrl.substr(1);
  let secondSlashIndex = sliceFirstSlashString.indexOf('/');
  let result = '';
  if (secondSlashIndex === -1) {
    result = sliceFirstSlashString;
  } else {
    result = sliceFirstSlashString.substr(0, secondSlashIndex);
  }
  return result;
};

// 값이 없을 경우
const convertEmptyValue = function (value) {
  let valueString = value;
  if (!value) {
    valueString = '-';
  }
  return valueString;
};

// 숫자 변환 : null / undefined 값 처리, (콤마) 반영
const convertNumberValue = function (value) {
  let valueString = '';
  if (value) {
    valueString = value.toLocaleString();
  } else {
    valueString = '0';
  }
  return valueString;
};

// 오늘 날짜 반환
const getTodayString = function () {
  let todayString;
  let today = moment();
  todayString = today.format('YYYY-MM-DD');
  return todayString;
};

// Date 타입 or moment 타입의 값이 오늘 날짜인지 체크
const isToday = function (date) {
  return moment(date).isSame(moment(), 'day');
};

// date value를 custom한 format으로 변환
const convertDate = function (value, valueFormat, displayFormat) {
  let displayDate = '';
  displayFormat = displayFormat || Config.defaultDateDisplayFormat;
  if (value) {
    displayDate = moment(value, valueFormat).format(displayFormat);
  }
  return displayDate;
};

// 오늘인 경우와 아닌 경우로 분류해서 변환
const convertMessageDate = function (messageDate) {
  let dateString = '';
  if (isToday(messageDate)) {
    // 오늘인 경우 : 오전 6:28
    dateString = convertDate(messageDate, '', 'LT');
  } else {
    // 오늘 이전 날짜인 경우 : YY.MM HH:mm(01.19 06:28)
    dateString = convertDate(messageDate, '', 'MM.DD HH:mm');
  }
  return dateString;
};

// '2021-09-01' ---> new Date 타입으로 변경
const stringToDate = function (dateString, format) {
  let resultDate = null;
  if (dateString) {
    resultDate = moment(dateString, format).toDate();
  }
  return resultDate;
};

// '14:59' ---> new Date 타입으로 변경
const stringToTime = function (timeString, format) {
  let resultDate = null;
  if (timeString) {
    resultDate = moment(timeString, format).toDate();
  }
  return resultDate;
};

const dateToString = function (date, format) {
  return moment(date).format(format);
};

// 문자열을 콤마기준으로 나누기
function stringFromToArray(string) {
  let lists = string ? string.split(',') : [];
  return lists;
}

// 이미지 파일 업로드 확장자 체크
const checkImageFileUploadExtension = function (fileObject) {
  const imageExtensionList = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
  let fileName = fileObject.name;
  let fileExtenstion = '';
  let searchIndex = fileName.lastIndexOf('.');
  if (searchIndex !== -1) {
    fileExtenstion = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
    let extensionSearchIndex = _.findIndex(imageExtensionList, (info) => {
      return info === fileExtenstion;
    });
    if (extensionSearchIndex !== -1) {
      return true;
    }
  }
  return false;
};

// 이미지 파일 업로드 max 용량 체크
const checkFileUploadMaxSize = function (fileObject, maxSize) {
  let fileSize = fileObject.size;
  maxSize = maxSize ? maxSize : 50000;
  if (fileSize <= maxSize) {
    return true;
  } else {
    return false;
  }
};

// 변수가 숫자인지 체크
function isNumber(value) {
  let success = false;
  if (value !== null && value !== '' && !isNaN(value)) {
    success = true;
  }
  return success;
}

// 휴대폰번호 사이에 - 하이픈 넣기
function phoneNumberAddHypen(number) {
  let resultNumber = '';
  resultNumber = number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  return resultNumber;
}

// empty function
function emptyHandle() {}

// file download
function downloadFile(apiUrl, queryStringObject) {
  const apiQueryString = queryString.stringify(queryStringObject);
  let downLoadUrl = process.env.API_URL + apiUrl + '?' + apiQueryString;
  window.open(downLoadUrl);
}

function checkValidation(inputData, customErrorMessage) {
  let validResult = { isValid: true, errorMessage: '' };
  let inputValue = inputData.value;
  if (inputData.touched || !inputData.byPassValid) {
    if (inputData.isRequired) {
      // 0은 isRequired에 포함되지 않음
      if (!inputValue && !isNumber(inputValue)) {
        validResult.isValid = false;
        validResult.errorMessage = inputData.notRequiredMessage
          ? inputData.notRequiredMessage
          : customErrorMessage || '필수 정보입니다';
        return validResult;
      } else if (inputValue && inputValue.trim && !inputValue.trim()) {
        validResult.isValid = false;
        validResult.errorMessage = inputData.notRequiredMessage
          ? inputData.notRequiredMessage
          : customErrorMessage || '필수 정보입니다';
      } else if (inputData.isArray && inputValue.length === 0) {
        validResult.isValid = false;
        validResult.errorMessage = inputData.notRequiredMessage
          ? inputData.notRequiredMessage
          : customErrorMessage || '필수 정보입니다';
        return validResult;
      } else if (inputData.isArray && inputValue.length !== 0) {
        for (let inputArrayIndex = 0; inputArrayIndex < inputData.value.length; inputArrayIndex++) {
          let info = inputData.value[inputArrayIndex];
          if (!info) {
            validResult.isValid = false;
            validResult.errorMessage = inputData.notRequiredMessage
              ? inputData.notRequiredMessage
              : customErrorMessage || '필수 정보입니다';
            return validResult;
          }
        }
      }
    }

    if (inputData.isNumber) {
      inputValue += '';
      let removeComma = inputValue.replace(/,/g, '');
      if (isNaN(removeComma)) {
        validResult.isValid = false;
        validResult.errorMessage = customErrorMessage || '숫자가 아닙니다';
        return validResult;
      }
    }

    if (inputValue && inputData.maxLength) {
      if (inputValue && inputValue.length > inputData.maxLength) {
        validResult.isValid = false;
        validResult.errorMessage = customErrorMessage || '입력값을 초과하였습니다(' + inputData.maxLength + '자리)';
        return validResult;
      }
    }

    if (inputValue && inputData.minLength) {
      if (inputValue && inputValue.length < inputData.minLength) {
        validResult.isValid = false;
        validResult.errorMessage = customErrorMessage || '최소 ' + inputData.minLength + '자리 이상 입력하여야 합니다';
        return validResult;
      }
    }

    if (inputValue && inputData.max) {
      if (Number(inputValue) > inputData.max) {
        validResult.isValid = false;
        validResult.errorMessage = customErrorMessage || '쵀대값을 초과하였습니다(' + inputData.max + '이하)';
        return validResult;
      }
    }

    if (inputValue && inputData.min) {
      if (Number(inputValue) < inputData.min) {
        validResult.isValid = false;
        validResult.errorMessage =
          customErrorMessage || '최소값보다 큰값을 입력하여야 합니다(' + inputData.min + '이상)';
        return validResult;
      }
    }

    if (inputValue && inputData.pattern) {
      if (!inputData.pattern.test(inputValue)) {
        validResult.isValid = false;
        validResult.errorMessage = inputData.notPatternMessage
          ? inputData.notPatternMessage
          : customErrorMessage || '양식에 맞지 않습니다';
        return validResult;
      }
    }
  }
  return validResult;
}

// os 클립보드에 textarea에 저장된 정보 복사
function copyToClipboard(id) {
  let textArea: any = document.getElementById(id);
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    let range, selection;
    range = document.createRange();
    range.selectNodeContents(textArea);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
  document.execCommand('copy');
  alert('복사되었습니다');
}

// 첫번째 글자 대문자로 변경
function capitalizeFirstLetter(value) {
  if (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return '';
}

// route url 기준으로 full url 추출
const getAppLink = function (routeUrl) {
  let linkUrl = location.protocol + '//' + location.host + process.env.PUBLIC_URL + '/index.html#' + routeUrl;
  return linkUrl;
};

// 기간 date 날짜 검증 : 아규먼트는 moment 객체임
const validteRangeDate = function (startDate, endDate) {
  // 시작일은 종료일보다 클 수 없고 종료일은 시작일보다 작을 수 없습니다.
  let success = true;
  let startDiffDays = startDate.diff(endDate, 'days');
  if (startDiffDays > 0) {
    success = false;
  }
  let endDiffDays = endDate.diff(startDate, 'days');
  if (endDiffDays < 0) {
    success = false;
  }
  return success;
};

const getDefaultInputData = function (inputName, required, value) {
  if (!value) {
    if (isNumber(value)) {
      value = 0;
    } else {
      value = '';
    }
  }
  let inputData = {
    inputName: inputName,
    touched: false,
    isRequired: required,
    isValid: true,
    errorMessage: '',
    value: value,
  };
  return inputData;
};

const getQueryStringValue = function (queryString, paramKey) {
  const query = new URLSearchParams(queryString);
  return query.get(paramKey);
};

export default {
  saveInfoToLocalStorage,
  getByLocalStorage,
  removeInfoToLocalStorage,
  get1DepthRouteName,
  convertEmptyValue,
  convertNumberValue,
  getTodayString,
  isToday,
  convertDate,
  convertMessageDate,
  stringToDate,
  stringToTime,
  dateToString,
  stringFromToArray,
  checkImageFileUploadExtension,
  checkFileUploadMaxSize,
  isNumber,
  phoneNumberAddHypen,
  emptyHandle,
  downloadFile,
  checkValidation,
  copyToClipboard,
  capitalizeFirstLetter,
  getAppLink,
  validteRangeDate,
  getDefaultInputData,
  getQueryStringValue,
};
