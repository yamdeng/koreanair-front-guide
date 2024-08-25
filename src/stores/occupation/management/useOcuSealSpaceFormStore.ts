import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  sectCd: yup.string(),
  deptCd: yup.string(),
  areaCd: yup.string(),
  bizPlace: yup.string(),
  positionCls1: yup.string(),
  positionCls2: yup.string(),
  hndChmcl: yup.string(),
  hzdFactor: yup.string(),
  stdRuleCd: yup.string(),
  wrkCompanyNm: yup.string(),
  entExtIntrv: yup.string(),
  wrkContent: yup.string(),
  pohtoId1: yup.number().nullable(),
  pohtoId2: yup.number().nullable(),
  regDttm: yup.string().required(),
  regUserId: yup.string().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  sectCd: 'DM',
  deptCd: 'LAXDAM',
  areaCd: 'SEL',
  bizPlace: '사업장',
  positionCls1: '위치분류1',
  positionCls2: '위치분류2',
  hndChmcl: '취급화학물질',
  hzdFactor: '유해인자',
  stdRuleCd: '01',
  wrkCompanyNm: '작업업체명',
  entExtIntrv: '출입주기',
  wrkContent: '작업내용',
  pohtoId1: null,
  pohtoId2: null,
  regDttm: '2024-07-07',
  regUserId: 'SYSTEM',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/management/sealSpace',
  baseRoutePath: '/occupation/sealSpace',
  formName: 'useOcuSealSpaceFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuSealSpaceFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuSealSpaceFormStore;
