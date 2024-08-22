import * as yup from 'yup';
console.log('yup file load');

// yup의 locale 설정
yup.setLocale({
  mixed: {
    default: '이 필드는 유효하지 않습니다.',
    required: '이 필드는 필수입니다.',
    oneOf: '${values} 중 하나여야 합니다.',
    notOneOf: '${values} 중 하나여서는 안 됩니다.',
  },
});

export const yupLocaleConfigured = true;
