import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  userId: yup.string().required(),
  empNo: yup.string(),
  nameKor: yup.string(),
  nameEng: yup.string(),
  nameChn: yup.string(),
  nameJpn: yup.string(),
  nameEtc: yup.string(),
  email: yup.string(),
  officeTelNo: yup.string(),
  mobileTelNo: yup.string(),
  subEmpNo: yup.string(),
  subCompCd: yup.string(),
  subEmail: yup.string(),
  empType: yup.string(),
  dsptYn: yup.string(),
  eaiYn: yup.string(),
  className: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'sys/users',
  baseRoutePath: '/users',
  formName: 'useSysUserFormStore',
  formValue: {
    userId: '',
    empNo: '',
    nameKor: '',
    nameEng: '',
    nameChn: '',
    nameJpn: '',
    nameEtc: '',
    email: '',
    officeTelNo: '',
    mobileTelNo: '',
    subEmpNo: '',
    subCompCd: '',
    subEmail: '',
    empType: '',
    dsptYn: '',
    eaiYn: '',
    className: '',
  },
};

/* zustand store 생성 */
const useSysUserFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set(initFormData);
  },
}));

export default useSysUserFormStore;
