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
    const { title, path } = menuInfo;
    const fileName = path;
    if (keyword) {
      return title.indexOf(keyword) !== -1 || fileName.indexOf(keyword) !== -1;
    } else {
      return true;
    }
  });
  return filtedList;
};

export default { convertEnterStringToBrTag, replaceHighlightMarkup, getFilterListByMenuList };
