import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import ApiService from '@/services/ApiService';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';

/* yup validation */
const yupFormSchema = yup.object({
  // 부문
  sectCd: yup.string().required(),
  // 등록자
  regUserId: yup.string().required(),
  // 구분
  formCls: yup.string().required(),
  // 개정 번호
  revisionNo: yup.string().required(),
  // 제정 일자
  enactedDt: yup.string().required(),
  // 개정 일자 (추후 오늘 날짜 넣기)
  revisionDt: yup.string(),
  // 첨부 링크 ID
  linkId: yup.string(),
  // 제목
  revisionTitle: yup.string().required(),
  // 개정내용
  majorRevisionCn: yup.string().required(),
  // 첨부 파일 ID
  fileId: yup.string(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  sectCd: '',
  formCls: '',
  revisionNo: '',
  enactedDt: '',
  revisionDt: '',
  revisionTitle: '',
  majorRevisionCn: '',
  fileId: '',
  linkId: '',
  regUserId: 'SYSTEM',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  searchRevisionNo: null,

  formApiPath: 'ocu/general/regulations',
  baseRoutePath: '/occupation/regulations',
  formName: 'useOcuRegulationsFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuRegulationsFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  // getCustomDetail: async (id) => {
  //   const { getDetail, detailInfo } = get();
  //   getDetail(id);
  //   set({ searchRevisionNo: detailInfo ? detailInfo.revisionNo : '' });
  // },

  getDetail: async (id) => {
    const { formApiPath } = get();
    const response: any = await ApiService.get(`${formApiPath}/${id}`);
    const detailInfo = response.data;
    set({
      detailInfo: detailInfo,
      formValue: detailInfo,
      formDetailId: id,
      formType: FORM_TYPE_UPDATE,
      searchRevisionNo: detailInfo.revisionNo,
    });
  },

  //  getDetail: async (id) => {
  //   const { formApiPath } = get();
  //   const response: any = await ApiService.get(`${formApiPath}/${id}`);
  //   const detailInfo = response.data;
  //   set({
  //     detailInfo: detailInfo,
  //     formValue: detailInfo,
  //     formDetailId: id,
  //     formType: FORM_TYPE_UPDATE,
  //   });
  // },

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuRegulationsFormStore;
