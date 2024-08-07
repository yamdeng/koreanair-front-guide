import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import * as yup from 'yup';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
  listApiPath: '',
  baseRoutePath: '/codes',
  disablePaging: true,
};

/* yup validation */
const yupFormSchema = yup.object({
  codeGrpId: yup.string().required(),
  workScope: yup.string().required(),
  codeGrpNameKor: yup.string().required(),
  codeGrpNameEng: yup.string().required(),
  useYn: yup.string().required(),
  remark: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'sys/code-groups',
  formName: 'useSysCodeGroupFormStore',

  searchParam: {
    searchWord: '',
  },

  formValue: {
    codeGrpId: '',
    workScope: '',
    codeGrpNameKor: '',
    codeGrpNameEng: '',
    useYn: 'Y',
    remark: '',
  },
};

/* zustand store 생성 */
const useSysCodeGroupFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),
  ...createListSlice(set, get),

  ...initFormData,
  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 */
  searchWord: '',

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...initFormData, ...initListData });
  },
}));

export default useSysCodeGroupFormStore;
