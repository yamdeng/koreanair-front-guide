import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import ApiService from '@/services/ApiService';
import history from '@/utils/history';
const EMAIL_PATTERN = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const yupFormSchema = yup.object({
  loginId: yup.string().required('loginId는 필수입니다'),
  name: yup.string().required(),
  nameEn: yup.string(),
  sabun: yup.string().required(),
  positionTitle: yup.string(),
  email: yup.string().required().matches(EMAIL_PATTERN),
  phoneNumber: yup.string().required(),
  address: yup.string(),
  zipcode: yup.string(),
  status: yup.string(),
});

const initFormData = {
  ...formBaseState,

  id: '',
  sabun: '',
  name: '',
  nameEn: '',
  position: '',
  phone: '',
  deptName: '',
  description: '',
};

const useUserFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  save: async () => {
    const { validate, getApiParam, formType, formDetailId } = get();
    const isValid = await validate();
    if (isValid) {
      const apiParam = getApiParam();
      console.log(`apiParam : ${JSON.stringify(apiParam)}`);
      if (formType === 'add') {
        await ApiService.post(`users`, apiParam);
      } else {
        await ApiService.put(`users/${formDetailId}`, apiParam);
      }
      history.push('/users');
    }
  },

  getDetail: async (id) => {
    const response: any = await ApiService.get(`/users/${id}`);
    const detailInfo = response.data.data;
    set({
      ...detailInfo,
      formDetailId: id,
      formType: 'update',
    });
  },

  gorFormPage: () => {
    const { formDetailId } = get();
    history.push(`/users/${formDetailId}/form`);
  },

  cancel: () => {
    history.push('/users');
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useUserFormStore;
