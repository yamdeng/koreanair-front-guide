import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  prtnrId: yup.number().required(),
  prtnrNm: yup.string().required(),
  bizNo: yup.string().required(),
  rprsn: yup.string().required(),
  bizIndst: yup.string().required(),
  bizType: yup.string().required(),
  regDttm: yup.string().required(),
  regUserId: yup.string().required(),
  updDttm: yup.string().required(),
  updUserId: yup.string().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  prtnrId: null,
  prtnrNm: '',
  bizNo: '',
  rprsn: '',
  bizIndst: '',
  bizType: '',
  regUserId: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/management/partner',
  baseRoutePath: '/occupation/partner',
  formName: 'OcuPartnerInfoForm',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuPartnerInfoFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuPartnerInfoFormStore;
