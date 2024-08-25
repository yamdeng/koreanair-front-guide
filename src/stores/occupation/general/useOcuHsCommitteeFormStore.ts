import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
//import history from '@/utils/history';

/* yup validation */
const yupFormSchema = yup.object({
  // ID
  //advCmitId: yup.number().required(),
  // 부문
  advCmitSectCd: yup.string().required(),
  // 부서
  advCmitDeptCd: yup.string().required(),
  // 실시 연월
  advCmitImplmYm: yup.string().required(),
  // 제목
  advCmitTitle: yup.string().required(),
  // 내용
  advCmitRemark: yup.string().required(),
  // 회의록
  prcdnFileId: yup.string(),
  // 회의자료
  meetDocFileId: yup.string(),
  // 보고문서
  reportDocLinkId: yup.string(),
  // 작성자
  regUserId: yup.string().required(),
  // 작성일자
  regDttm: yup.string().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  advCmitId: '',
  // 현재 본부
  advCmitSectCd: 'A',
  // 현재 부서
  advCmitDeptCd: 'A',
  advCmitImplmYm: '',
  advCmitTitle: '',
  advCmitRemark: '',
  prcdnFileId: '',
  meetDocFileId: '',
  reportDocLinkId: '',
  // 현재날짜
  regDttm: '2024-08-27',
  // 현재 사용자 ID
  regUserId: 'SYSTEM23',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/general/hsCommittee',
  baseRoutePath: '/occupation/hsCommittee',
  formName: 'useOcuHsCommitteeFormStore',
  formValue: {
    ...initFormValue,
  },
};

console.log('formValue==>', initFormData);

/* zustand store 생성 */
const useOcuHsCommitteeFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  // const { formApiPath } = get();

  // cancel2: () => {
  //   const { baseRoutePath } = get();
  //   history.push(`${baseRoutePath}`);
  // },

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuHsCommitteeFormStore;
