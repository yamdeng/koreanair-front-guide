import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  sectCd: yup.string().required(),
  fileId: yup.string(),
  linkId: yup.string(),
  regDttm: yup.string().required(),
  regUserId: yup.string().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  title: '',
  content: '',
  sectCd: 'A',
  fileId: '',
  linkId: '',
  regDttm: '20240814',
  regUserId: 'SYSTEM',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/general/committee',
  baseRoutePath: '/occupation/committee',
  formName: 'useOcuCommitteeFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuCommitteeFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuCommitteeFormStore;
