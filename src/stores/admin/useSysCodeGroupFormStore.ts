import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import * as yup from 'yup';
import { create } from 'zustand';
import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import _ from 'lodash';

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
  useYn: yup.string().required().required(),
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

  searchWord: '',

  yupFormSchema: yupFormSchema,

  saveCodeDetail: async () => {
    const { list, formDetailId, formApiPath, search } = get();
    const apiList = _.cloneDeep(list);
    ModalService.confirm({
      body: '저장하시겠습니까?',
      ok: async () => {
        const apiParam = apiList
          ? apiList.map((info) => {
              info.codeGrpId = formDetailId;
              return info;
            })
          : [];
        await ApiService.post(`${formApiPath}/${formDetailId}/codes`, apiParam);
        search();
      },
    });
  },

  clear: () => {
    set({ ...initFormData, ...initListData });
  },
}));

export default useSysCodeGroupFormStore;
