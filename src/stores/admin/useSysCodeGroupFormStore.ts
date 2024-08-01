import { create } from 'zustand';
import { formBaseState, createFormSliceYup, defaultFormExcludeKeys } from '@/stores/slice/formSlice';
import { createListSlice, listBaseState, defaultListExcludeKeys } from '@/stores/slice/listSlice';
import * as yup from 'yup';
import { produce } from 'immer';

/* 컬럼 영역 */
const columns: any = [
  { field: 'codeId', headerName: '코드ID', editable: true },
  { field: 'codeNameKor', headerName: '코드명(한국어)', editable: true },
  { field: 'codeNameEng', headerName: '코드명(영어)', editable: true },
  { field: 'codeField1', headerName: '예비필드 1', editable: true },
  { field: 'codeField2', headerName: '예비필드 2', editable: true },
  { field: 'codeField3', headerName: '예비필드 3', editable: true },
  { field: 'codeField4', headerName: '예비필드 4', editable: true },
  { field: 'codeField5', headerName: '예비필드 5', editable: true },
  {
    field: 'sortOrder',
    headerName: '정렬순서',
    editable: true,
    cellEditor: 'agNumberCellEditor',
    cellEditorParams: {
      min: 1,
      max: 300,
    },
  },
  {
    field: 'useYn',
    headerName: '사용여부',
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['Y', 'N'],
    },
  },
  { field: 'remark', headerName: '비고', editable: true },
];

const initListData = {
  ...listBaseState,
  excludeApiKeys: [...defaultFormExcludeKeys, ...defaultListExcludeKeys],
  listApiPath: '',
  baseRoutePath: '/codes',
  disablePaging: true,
  columns: columns,
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
  baseRoutePath: '/codes',
  formName: 'useSysCodeGroupFormStore',

  requiredFields: ['codeGrpId'],

  codeGrpId: '',
  workScope: '',
  codeGrpNameKor: '',
  codeGrpNameEng: '',
  useYn: 'Y',
  remark: '',
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

  getSearchParam: () => {
    const { getPageParam, searchWord } = get();
    const pageParam = getPageParam();
    const searchParam = { ...pageParam, searchWord };
    return searchParam;
  },

  addRow: () => {
    set(
      produce((state: any) => {
        state.list.push({ updated: true });
      })
    );
  },

  removeByIndex: (removeIndex) => {
    set(
      produce((state: any) => {
        state.list.splice(removeIndex, 1);
      })
    );
  },

  removeAll: () => {
    set({ list: [] });
  },

  clear: () => {
    set({ ...initFormData, ...initListData });
  },
}));

export default useSysCodeGroupFormStore;
