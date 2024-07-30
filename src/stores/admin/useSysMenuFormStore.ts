import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import ApiService from '@/services/ApiService';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import { create } from 'zustand';

/* yup validation */
const yupFormSchema = yup.object({
  menuId: yup.string().required(),
  workScope: yup.string().required(),
  nameKor: yup.string().required(),
  nameEng: yup.string().required(),
  nameChn: yup.string(),
  nameJpn: yup.string(),
  nameEtc: yup.string(),
  treeType: yup.string().required(),
  upperMenuId: yup.string(),
  sortOrder: yup.number().required(),
  menuUrl: yup.string(),
  useYn: yup.string().required(),
  remark: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  menuTreeData: [],
  parentMenuTreeData: [],
  selectedMenuInfo: null,

  formApiPath: 'sys/menus',
  baseRoutePath: '',
  formName: 'useSysMenuFormStore',

  requiredFields: ['menuId', 'workScope', 'nameKor', 'nameEng', 'treeType', 'sortOrder', 'useYn'],

  treeWorkScope: 'A',

  workScope: 'A',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  treeType: '', // select
  upperMenuId: '',
  sortOrder: 999, // number
  menuUrl: '',
  useYn: 'Y', // select
  remark: '',
};

/* zustand store 생성 */
const useSysMenuFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  getMenuTree: async () => {
    const { treeWorkScope } = get();
    const apiParam = {
      workScope: treeWorkScope,
      isTree: 'Y',
      pageNum: 1,
      pageSize: 100000,
    };
    const response = await ApiService.get('sys/menus', apiParam);
    const treeData = response.data || [];
    set({ menuTreeData: treeData });
  },

  getParentMenuTree: async (workScope) => {
    const apiParam = {
      workScope: workScope,
      isTree: 'Y',
      pageNum: 1,
      pageSize: 100000,
    };
    const response = await ApiService.get('sys/menus', apiParam);
    const treeData = response.data || [];
    set({ parentMenuTreeData: [{ nameKor: '최상위', menuId: 'S000000', children: treeData, level: 0 }] });
  },

  handleTreeSelect: async (selectedKeys, info) => {
    const { getParentMenuTree } = get();
    const menuInfo = info.node;
    set({ ...menuInfo, formType: FORM_TYPE_UPDATE });
    await getParentMenuTree(menuInfo.workScope);
  },

  handleParentTreeSelect: async (selectedKey, title, extra) => {
    const { changeInput, menuId } = get();
    const menuInfo = extra.triggerNode.props;
    if (menuInfo.menuId === menuId) {
      alert('자기자신입니다.');
      return;
    }
    if (menuInfo.treeType === 'M') {
      alert('선택한 메뉴는 폴더가 아닙니다.');
      return;
    }
    if (menuInfo.level > 2) {
      alert('메뉴는 3depth 메뉴까지만 허용합니다.');
      return;
    }
    changeInput('upperMenuId', selectedKey);
  },

  changeTreeWorkScope: (workScope) => {
    const { getMenuTree } = get();
    set({ treeWorkScope: workScope });
    getMenuTree();
  },

  changeWorkScope: (workScope) => {
    const { getParentMenuTree } = get();
    set({ workScope: workScope, upperMenuId: '' });
    getParentMenuTree(workScope);
  },

  addMenu: () => {
    const { treeWorkScope } = get();
    const initFormData = {
      workScope: treeWorkScope,
      menuId: '',
      nameKor: '',
      nameEng: '',
      nameChn: '',
      nameJpn: '',
      nameEtc: '',
      treeType: '', // select
      upperMenuId: '',
      sortOrder: 999, // number
      menuUrl: '',
      useYn: 'Y', // select
      remark: '',
    };
    set({ ...initFormData, formType: FORM_TYPE_ADD });
  },

  save: async () => {
    const { validate, getApiParam, formType, formApiPath, menuId, getMenuTree, getParentMenuTree } = get();
    const isValid = await validate();
    if (isValid) {
      const apiParam = getApiParam();
      if (formType === 'add') {
        await ApiService.post(`${formApiPath}`, apiParam);
      } else {
        await ApiService.put(`${formApiPath}/${menuId}`, apiParam);
      }
      alert('저장되었습니다.');
      await getMenuTree();
      await getParentMenuTree(apiParam.workScope);
    }
  },

  init: async () => {
    const { getMenuTree, getParentMenuTree, treeWorkScope } = get();
    await getMenuTree();
    await getParentMenuTree(treeWorkScope);
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useSysMenuFormStore;
