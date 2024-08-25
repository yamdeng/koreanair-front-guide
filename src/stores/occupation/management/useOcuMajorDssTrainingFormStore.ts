import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  dssTypeCd: yup.string().required(),
  etcType: yup.string(),
  trainDt: yup.string().required(),
  trainLocation: yup.string().required(),
  prtc: yup.number().required(),
  trainNm: yup.string().required(),
  evalContent: yup.string().required(),
  fileId: yup.number().nullable(),
  linkId: yup.number().nullable(),
  regDttm: yup.string().required(),
  regUserId: yup.string().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  dssTypeCd: '',
  etcType: '',
  trainDt: '',
  trainLocation: '',
  prtc: null,
  trainNm: '',
  evalContent: '',
  fileId: null,
  linkId: null,
  regDttm: '',
  regUserId: '',
};
// const initFormValue = {
//   dssTypeCd: 'A',
//   etcType: '기타유형',
//   trainDt: '2024-08-24',
//   trainLocation: '훈련장소',
//   prtc: 1,
//   trainNm: '훈련명',
//   evalContent: '컨텐츠',
//   fileId: null,
//   linkId: null,
//   regDttm: '2024-08-24',
//   regUserId: 'SYSTEM',
// };

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/management/training',
  baseRoutePath: '/occupation/training',
  formName: 'useOcuMajorDssTrainingFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuMajorDssTrainingFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuMajorDssTrainingFormStore;
