// 개행 분자를 <br/> 태그로 변환
const convertEnterStringToBrTag = function (value) {
  return value.replace(/\\r\\n|\r\n|\n|\\n/g, '<br/>');
};

export default {
  convertEnterStringToBrTag,
};
