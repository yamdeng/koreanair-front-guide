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
  statusCd: yup.string(),
  deptId: yup.string(),
  pstnId: yup.string(),
  dutyId: yup.string(),
  rankId: yup.string(),
  photo: yup.string(),
  sortOrder: yup.number(),
  officeTelNo: yup.string(),
  mobileTelNo: yup.string(),
  compCd: yup.string(),
  subEmpNo: yup.string(),
  subCompCd: yup.string(),
  subEmail: yup.string(),
  empType: yup.string(),
  dsptYn: yup.string(),
  jobCd: yup.string(),
  bareaCd: yup.string(),
  eaiYn: yup.string(),
  classCd: yup.string(),
  className: yup.string(),
  regUserId: yup.string(),
  regDttm: yup.string(),
  updUserId: yup.string(),
  updDttm: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'sys/users',
  baseRoutePath: '/users',
  formName: 'useSysUserFormStore',

  requiredFields: ['userId'],

  userId: '',
  empNo: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  email: '',
  statusCd: '',
  deptId: '',
  pstnId: '',
  dutyId: '',
  rankId: '',
  photo: '',
  sortOrder: null,
  officeTelNo: '',
  mobileTelNo: '',
  compCd: '',
  subEmpNo: '',
  subCompCd: '',
  subEmail: '',
  empType: '',
  dsptYn: '',
  jobCd: '',
  bareaCd: '',
  eaiYn: '',
  classCd: '',
  className: '',
  regUserId: '',
  regDttm: '',
  updUserId: '',
  updDttm: '',
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
