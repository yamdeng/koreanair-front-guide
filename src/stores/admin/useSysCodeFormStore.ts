import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';

/* yup validation */
const yupFormSchema = yup.object({
  codeId: yup.string().required(),
  codeNameKor: yup.string().required(),
  codeNameEng: yup.string().nullable(),
  codeField1: yup.string().nullable(),
  codeField2: yup.string().nullable(),
  codeField3: yup.string().nullable(),
  codeField4: yup.string().nullable(),
  codeField5: yup.string().nullable(),
  sortOrder: yup.number().nullable(),
  useYn: yup.string().required(),
  remark: yup.string().nullable(),
});

const initFormValue = {
  codeId: '',
  codeNameKor: '',
  codeNameEng: '',
  codeField1: '',
  codeField2: '',
  codeField3: '',
  codeField4: '',
  codeField5: '',
  sortOrder: null,
  useYn: '',
  remark: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,
  formName: 'useSysCodeFormStore',
  formValue: initFormValue,
  listUpdateIndex: 0,
};

/* zustand store 생성 */
const useSysCodeFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  // 모달 전용으로 formData를 set할때 사용
  setFormValue: (detailInfo, id = '', listUpdateIndex) => {
    set({
      detailInfo: detailInfo || initFormValue,
      formValue: detailInfo || initFormValue,
      formDetailId: id,
      formType: id ? FORM_TYPE_UPDATE : FORM_TYPE_ADD,
      listUpdateIndex: listUpdateIndex,
    });
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useSysCodeFormStore;
