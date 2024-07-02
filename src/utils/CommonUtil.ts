import _ from 'lodash';

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
};
