import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';
import * as yup from 'yup';
import history from '@/utils/history';

/* yup validation */
const yupFormSchema = yup.object({
  zeroHzdDeptCd: yup.string().required(),
  completGoalMltp: yup.string().required().min(1),
  mgntTotGoalDays: yup.string().required().min(1),
  mgntStdGoalDays: yup.string().required().min(1),
  mgntCurrGoalDays: yup.string().required().min(1),
  mgntglStartDt: yup.string().required(),
  mgntglCompletGoalDt: yup.string().required(),
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

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'ocu/general/zeroHzdGoal',
  baseRoutePath: '/occupation/zeroHzdGoal',
  formName: 'useOcuZeroHzdGoalFormStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const useOcuZeroHzdGoalFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  save: async () => {
    const { validate, getApiParam, formApiPath, baseRoutePath } = get();
    const isValid = await validate();
    if (isValid) {
      ModalService.confirm({
        body: '저장하시겠습니까?',
        ok: async () => {
          const apiParam = getApiParam();
          console.log(`apiParam : ${JSON.stringify(apiParam)}`);
          await ApiService.post(`${formApiPath}`, apiParam);
          ToastService.success('저장되었습니다.');
          history.push(`${baseRoutePath}`);
        },
      });
    }
  },

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

export default useOcuZeroHzdGoalFormStore;
