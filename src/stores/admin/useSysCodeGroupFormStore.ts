import { produce } from 'immer';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import * as yup from 'yup';
import { create } from 'zustand';
import ApiService from '@/services/ApiService';
import ModalService from '@/services/ModalService';
import _ from 'lodash';
import useSysCodeFormStore from '@/stores/admin/useSysCodeFormStore';
import { FORM_TYPE_ADD } from '@/config/CommonConstant';

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

  isCodeFormModalOpen: false,

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

  openFormModal: (selectedRowInfo, updateIndex) => {
    const { setFormValue } = useSysCodeFormStore.getState();
    setFormValue(selectedRowInfo, selectedRowInfo ? selectedRowInfo.codeId : '', updateIndex);
    set({ isCodeFormModalOpen: true });
  },

  closeFormModal: () => {
    set({ isCodeFormModalOpen: false });
  },

  okModal: (formValue, formType, updateIndex) => {
    set(
      produce((state: any) => {
        if (formType === FORM_TYPE_ADD) {
          state.list.push({ ...formValue });
        } else {
          state.list.findIndex((info) => info.codeId);
          state.list[updateIndex] = formValue;
        }
        state.isCodeFormModalOpen = false;
      })
    );
  },

  clear: () => {
    set({ ...initFormData, ...initListData });
  },
}));

export default useSysCodeGroupFormStore;
