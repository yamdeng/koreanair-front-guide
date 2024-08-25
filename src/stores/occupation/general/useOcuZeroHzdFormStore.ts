import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';

import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import _ from 'lodash';
// import ApiService from '@/services/ApiService';
// import ModalService from '@/services/ModalService';
// import ToastService from '@/services/ToastService';
import history from '@/utils/history';
import * as yup from 'yup';

/* yup validation */
const yupFormSchema = yup.object({
  zeroHzdDeptCd: yup.string().required(),
  completGoalMltp: yup.string().required(),
  mgntTotGoalDays: yup.string().required(),
  mgntStdGoalDays: yup.string().required(),
  mgntCurrGoalDays: yup.string().required(),
  mgntglStartDt: yup.string().required(),
  mgntglCompletGoalDt: yup.string().required(),
});

const modalYupFormSchema = yup.object({
  zeroHzdDeptCd: yup.string().required(),
  completGoalMltp: yup.string().required(),
  mgntTotGoalDays: yup.string().required(),
  mgntStdGoalDays: yup.string().required(),
  mgntCurrGoalDays: yup.string().required(),
  mgntglStartDt: yup.string().required(),
  mgntglCompletGoalDt: yup.string().required(),
  statMltp: yup.number().required().min(1).max(100),
  statStartDt: yup.string().required(),
  statCmpltGoalDt: yup.string().required(),
  currMltpGoalDt: yup.number().required().min(1).max(100),
  statTotGoalDays: yup.number().required().min(1).max(100),
  statFailDt: yup.string().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  // 부서
  zeroHzdDeptCd: 'SELDM',
  // 달성 목표 배수
  completGoalMltp: '',
  // 총 목표일수
  mgntTotGoalDays: '',
  // 기준 목표일수
  mgntStdGoalDays: '',
  // 현 목표일수
  mgntCurrGoalDays: '',
  // 개시일
  mgntglStartDt: '',
  // 달성 목표일
  mgntglCompletGoalDt: '',
};

const modalFormInitFormValue = {
  // 부서
  zeroHzdDeptCd: '',
  // 달성 목표 배수
  completGoalMltp: '',
  // 총 목표일수
  mgntTotGoalDays: '',
  // 기준 목표일수
  mgntStdGoalDays: '',
  // 현 목표일수
  mgntCurrGoalDays: '',
  // 개시일
  mgntglStartDt: '',
  // 달성 목표일
  mgntglCompletGoalDt: '',

  // 배수
  statMltp: null,
  // 개시일
  statStartDt: '',
  // 달성 목표일
  statCmpltGoalDt: '',
  // 현 배수 목표일
  currMltpGoalDt: '',
  // 총 목표일수
  statTotGoalDays: null,
  // 실패일
  statFailDt: '',
  // 비고
  statRemark: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/general/zeroHzdGoal',
  baseRoutePath: '/occupation/zeroHzdGoal',
  formName: 'useOcuZeroHzdFormStore',
  formValue: {
    ...initFormValue,
  },
};

// modal store
export const useOcuZeroHzdGoalModalFormStore = create<any>((set, get) => ({
  ...formBaseState,

  formName: 'ZeroHzdGoalFormModal',

  formValue: {
    ...modalFormInitFormValue,
  },

  yupFormSchema: modalYupFormSchema,

  ...createFormSliceYup(set, get),

  save: async () => {
    const { validate, formValue } = get();
    const isValid = await validate();
    if (isValid) {
      useOcuZeroHzdGoalFormStore.getState().okModal(formValue);
    }
  },
}));

/* zustand store 생성 */
const useOcuZeroHzdGoalFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...createListSlice(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  search: async () => {
    const { formDetailId, setList } = get();

    const apiResult = await ApiService.get(`ocu/general/selectZeroHzdList/${formDetailId}`);
    const data = apiResult.data;
    setList(data);

    //   // 첫번째 방법
    //   const sd = get();
    //   sd.changeStateProps();

    //  // 두번째 방법
    //  const { changeStateProps } = get();
  },

  saveCodeDetail: async () => {
    const { list, formDetailId, formApiPath, search, formValue, baseRoutePath } = get();
    const apiList = _.cloneDeep(list);

    ModalService.confirm({
      body: '저장하시겠습니까?',
      ok: async () => {
        const listParam = apiList
          ? apiList.map((info) => {
              info.zeroHzdId = formDetailId;
              return info;
            })
          : [];
        const formParam = formValue;
        const apiParam = {
          list: listParam,
          form: formParam,
        };

        console.log('apiParam===>', apiParam);
        await ApiService.post(`${formApiPath}/${formDetailId}/update`, apiParam);
        // await ApiService.post(`${formApiPath}/${formDetailId}`, apiParam);
        search();
        history.push(`${baseRoutePath}`);
        ToastService.success('저장되었습니다.');
      },
    });
  },

  openFormModal: () => {
    const { detailInfo } = get();
    const { setFormValue } = useOcuZeroHzdGoalModalFormStore.getState();
    setFormValue(detailInfo);
    set({ isCodeFormModalOpen: true });
  },

  closeFormModal: () => {
    set({ isCodeFormModalOpen: false });
  },

  okModal: async (formValue) => {
    const { formDetailId, getDetail, search } = get();
    const formApiPath = 'ocu/general/zeroHzdGoal/saveZeroHzdGoalStatus';
    ModalService.confirm({
      body: '저장하시겠습니까?',
      ok: async () => {
        await ApiService['post'](formApiPath, formValue, { disableLoadingBar: true });
        set({ isCodeFormModalOpen: false });
        ToastService.success('저장되었습니다.');
        await getDetail(formDetailId);
        search();
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: {} });
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuZeroHzdGoalFormStore;
