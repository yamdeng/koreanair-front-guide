import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import ApiService from '@/services/ApiService';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import { create } from 'zustand';
import ModalService from '@/services/ModalService';

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

const initFormValue = {
  menuId: '',
  workScope: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  treeType: '',
  upperMenuId: '',
  sortOrder: 999, // number
  menuUrl: '',
  useYn: 'Y', // select
  remark: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  menuTreeData: [],
  parentMenuTreeData: [],
  selectedMenuInfo: null,

  formApiPath: 'sys/menus',
  baseRoutePath: '',
  formName: 'useSysMenuFormStore',

  treeWorkScope: 'A',

  formValue: initFormValue,
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
    set({ formValue: menuInfo, formType: FORM_TYPE_UPDATE, errors: {} });
    await getParentMenuTree(menuInfo.workScope);
  },

  handleParentTreeSelect: async (selectedKey, title, extra) => {
    const { changeInput, formValue } = get();
    const { menuId } = formValue;
    const menuInfo = extra.triggerNode.props;
    if (menuInfo.menuId === menuId) {
      ModalService.alert({ body: '현재 메뉴와 동일합니다.' });
      return;
    }
    if (menuInfo.treeType === 'M') {
      ModalService.alert({ body: '선택한 메뉴는 폴더가 아닙니다.' });
      return;
    }
    if (menuInfo.level > 2) {
      ModalService.alert({ body: '메뉴는 3depth 메뉴까지만 허용합니다.' });
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
    const { changeInput, getParentMenuTree } = get();
    changeInput('workScope', workScope);
    changeInput('upperMenuId', '');
    getParentMenuTree(workScope);
  },

  addMenu: () => {
    const { treeWorkScope } = get();
    const formValue = {
      ...initFormValue,
      workScope: treeWorkScope,
    };
    set({ formValue: formValue, formType: FORM_TYPE_ADD });
  },

  save: async () => {
    const { validate, getApiParam, formType, formValue, formApiPath, getMenuTree, getParentMenuTree } = get();
    const { menuId } = formValue;
    const isValid = await validate();
    if (isValid) {
      const apiParam = getApiParam();
      if (formType === FORM_TYPE_ADD) {
        await ApiService.post(`${formApiPath}`, apiParam);
      } else {
        await ApiService.put(`${formApiPath}/${menuId}`, apiParam);
      }
      ModalService.alert({
        body: '저장되었습니다.',
        ok: async () => {
          await getMenuTree();
          await getParentMenuTree(apiParam.workScope);
        },
      });
    }
  },

  init: async () => {
    const { getMenuTree, getParentMenuTree, treeWorkScope, addMenu } = get();
    await getMenuTree();
    await getParentMenuTree(treeWorkScope);
    await addMenu();
  },

  remove: async () => {
    ModalService.confirm({
      body: '삭제하시겠습니까?',
      ok: async () => {
        const { formValue, init } = get();
        const { menuId } = formValue;
        await ApiService.delete(`sys/menus/${menuId}`);
        ModalService.alert({
          body: '삭제되었습니다.',
          ok: async () => {
            await init();
          },
        });
      },
    });
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useSysMenuFormStore;
