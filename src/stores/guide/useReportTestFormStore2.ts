import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

export const EMAIL_PATTERN = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

// const yupFormSchema = yup.object().shape({
//   id: yup.string().required('id는 필수입니다.'),
//   name: yup.string().required().min(5).max(10),
//   age: yup.number().required().nullable().max(100),
//   email: yup.string().required().matches(EMAIL_PATTERN),
//   password: yup.string().required(),
//   password2: yup.string().required(),
//   job: yup.string(),
//   description: yup.string(),
// });

const yupFormSchema = yup.object({
  id: yup.string().required('id는 필수입니다.'),
  name: yup.string().required().min(5).max(10),
  age: yup.number().required().nullable().max(100),
  email: yup.string().required().matches(EMAIL_PATTERN),
  password: yup.string().required(),
  password2: yup.string().required(),
  job: yup.string(),
  description: yup.string(),
});

const initFormData = {
  ...formBaseState,
  requiredFields: ['id', 'name', 'email', 'job'],

  id: '',
  name: '',
  age: null,
  email: '',
  password: '',
  password2: '',
  job: '',
  description: '',
};

const useReportTestFormStore2 = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  save: () => {
    const { validate, getApiParam } = get();
    if (validate()) {
      const apiParam = getApiParam();
      console.log(`apiParam : ${JSON.stringify(apiParam)}`);
    }
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useReportTestFormStore2;
