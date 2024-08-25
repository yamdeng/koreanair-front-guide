import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
// import { FORM_TYPE_ADD } from '@/config/CommonConstant';
// import ModalService from '@/services/ModalService';
// import ApiService from '@/services/ApiService';

/* yup validation */
const yupFormSchema = yup.object({
  // 부문 코드
  sectCd: yup.string().required(),
  // 등록자
  regUserId: yup.string().required(),
  // 등록일자
  regDttm: yup.string().required(),
  // 공지사항 구분
  noticeCls: yup.string().required(),
  // 상위 표출 여부
  upViewYn: yup.string().required(),
  // 제목
  noticeTitle: yup.string().required(),
  // 내용
  noticeContent: yup.string().required(),
  // 첨부파일 ID
  fileId: yup.string(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  sectCd: 'B',
  regUserId: 'SYSTEM',
  regDttm: '20240814',
  noticeCls: 'A',
  upViewYn: 'A',
  noticeTitle: '',
  noticeContent: '',
  fileId: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/general/notice',
  baseRoutePath: '/occupation/notice',
  formName: 'useOcuNoticeFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuNoticeFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuNoticeFormStore;
