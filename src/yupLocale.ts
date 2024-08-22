import * as yup from 'yup';

// yup의 locale 설정
// validation.required, validation.required.label

yup.setLocale({
  mixed: {
    default: '이 필드는 유효하지 않습니다.',
    required: 'validation.required.label',
    oneOf: '${values} 중 하나여야 합니다.',
    notOneOf: '${values} 중 하나여서는 안 됩니다.',
  },
});

export const yupLocaleConfigured = true;
