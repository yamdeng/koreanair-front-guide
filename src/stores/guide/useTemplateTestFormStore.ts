import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import LocalApiService from '@/services/LocalApiService';
import history from '@/utils/history';

const yupFormSchema = yup.object({
  id: yup.string().required('id는 필수입니다2.'),
  sabun: yup.string().required(),
  name: yup.string().required(),
  nameEn: yup.string().required(),
  position: yup.string(),
  phone: yup.string(),
  deptName: yup.string(),
  description: yup.string(),
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

const useTemplateTestFormStore = create<any>((set, get) => ({
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
        await LocalApiService.post(apiParam);
      } else {
        await LocalApiService.put(formDetailId, apiParam);
      }
      alert(formType === 'add' ? '신규폼생성' : '수정');
      history.push('/template/tests');
    }
  },

  getDetail: async (id) => {
    const detailInfo: any = await LocalApiService.getDetail(id);
    set({
      ...detailInfo,
      formDetailId: id,
      formType: 'update',
    });
  },

  gorFormPage: () => {
    const { formDetailId } = get();
    history.push(`/template/tests/${formDetailId}/form`);
  },

  cancel: () => {
    history.push('/template/tests');
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useTemplateTestFormStore;
