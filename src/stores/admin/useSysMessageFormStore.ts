import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  msgKey: yup.string().required(),
  msgKor: yup.string().required(),
  msgEng: yup.string().required(),
  msgChn: yup.string(),
  msgJpn: yup.string(),
  msgEtc: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'sys/messages',
  baseRoutePath: '/messages',
  formName: 'useSysMessageFormStore',
  formValue: {
    msgKey: '',
    msgKor: '',
    msgEng: '',
    msgChn: '',
    msgJpn: '',
    msgEtc: '',
  },
};

/* zustand store 생성 */
const useSysMessageFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set(initFormData);
  },
}));

export default useSysMessageFormStore;
