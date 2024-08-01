import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import ApiService from '@/services/ApiService';
import { produce } from 'immer';

/* yup validation */
const yupFormSchema = yup.object({
  groupCd: yup.string().required(),
  workScope: yup.string(),
  nameKor: yup.string(),
  nameEng: yup.string(),
  nameChn: yup.string(),
  nameJpn: yup.string(),
  nameEtc: yup.string(),
  remark: yup.string(),
  useYn: yup.string(),
  groupUsage: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  menuTreeData: [],
  virtualGroupList: [],
  selectedGroupInfo: null,
  treeWorkScope: 'A',

  selectManagerList: [],
  selectMemberList: [],
  selectMenuKeyList: [],

  isMemberSelectModalOpen: false,
  modalHandleType: 'A', // A(관리자), M(멤버:부서포함)
  onlyUserSelect: false,

  formApiPath: 'sys/virtual-groups',
  baseRoutePath: 'TODO : UI route path',
  formName: 'useSysGroupFormStore',

  requiredFields: ['groupCd'],

  groupCd: '',
  workScope: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  remark: '',
  useYn: '',
  groupUsage: 'M', // MENU/ ROLE
};

/* zustand store 생성 */
const useSysGroupFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  addGroup: () => {
    const { treeWorkScope } = get();
    const initFormData = {
      workScope: treeWorkScope,
      groupCd: '',
      nameKor: '',
      nameEng: '',
      nameChn: '',
      nameJpn: '',
      nameEtc: '',
      remark: '',
      useYn: '',
      groupUsage: 'M', // MENU/ ROLE
    };
    set({ ...initFormData, formType: FORM_TYPE_ADD });
  },

  save: async () => {
    const { validate, getApiParam, formType, formApiPath, menuId, workScope, getGroupList, getMenuTree } = get();
    const isValid = await validate();
    if (isValid) {
      const apiParam = getApiParam();
      if (formType === 'add') {
        await ApiService.post(`${formApiPath}`, apiParam);
        set({ formType: FORM_TYPE_UPDATE });
        await getMenuTree(workScope);
      } else {
        await ApiService.put(`${formApiPath}/${menuId}`, apiParam);
      }
      await getGroupList();
    }
  },

  saveDetail: async () => {
    const { groupCd, selectManagerList, selectMemberList, selectMenuKeyList } = get();
    let usersApiParam = selectManagerList.map((info) => {
      return {
        userId: info.userId,
        groupCd: groupCd,
        groupAdminYn: 'Y',
      };
    });
    usersApiParam = usersApiParam.concat(
      selectMemberList
        .filter((info) => (info.userId ? true : false))
        .map((info) => {
          return { userId: info.userId, groupCd: groupCd, groupAdminYn: 'N' };
        })
    );

    const deptsApiParam = selectMemberList
      .filter((info) => info.deptCd)
      .map((info) => {
        return { deptCd: info.deptCd, groupCd: groupCd };
      });
    await ApiService.put(`sys/virtual-groups/${groupCd}/users`, usersApiParam);
    await ApiService.put(`sys/virtual-groups/${groupCd}/depts`, deptsApiParam);
    await ApiService.put(
      `sys/virtual-groups/${groupCd}/menus`,
      selectMenuKeyList.map((menuKey) => {
        return {
          groupCd: groupCd,
          menuId: menuKey,
        };
      })
    );
    alert('저장완료');
  },

  getGroupList: async () => {
    const { treeWorkScope } = get();
    const apiParam = {
      workScope: treeWorkScope,
    };
    const response = await ApiService.get('sys/virtual-groups', apiParam);
    const virtualGroupList = response.data || [];
    set({ virtualGroupList: virtualGroupList });
  },

  handleTreeSelect: async (selectedKeys, info) => {
    const { getDetailListAll, getMenuTree } = get();
    const groupInfo = info.node;
    const workScope = groupInfo.workScope;
    set({ ...groupInfo, formType: FORM_TYPE_UPDATE });
    getDetailListAll();
    getMenuTree(workScope);
  },

  getDetailListAll: async () => {
    const { groupCd } = get();
    const usersResponse = await ApiService.get(`sys/virtual-groups/${groupCd}/users`);
    const deptsResponse = await ApiService.get(`sys/virtual-groups/${groupCd}/depts`);
    const menusResponse = await ApiService.get(`sys/virtual-groups/${groupCd}/menus`);
    const userList = usersResponse.data || [];
    const deptList = deptsResponse.data || [];
    const menuList = menusResponse.data || [];

    const selectManagerList = userList.filter((info) => info.groupAdminYn === 'Y');
    const selectMemberUserList = userList.filter((info) => info.groupAdminYn !== 'Y');
    selectMemberUserList.map((info) => {
      info.selectedType = 'U';
      return info;
    });
    deptList.map((info) => {
      info.selectedType = 'D';
      return info;
    });
    const selectMemberList = [...deptList, ...selectMemberUserList];

    set({
      selectMenuKeyList: menuList.filter((info) => info.upperMenuId !== '0').map((info) => info.menuId),
      selectMemberList: selectMemberList,
      selectManagerList: selectManagerList,
    });
  },

  getMenuTree: async (workScope) => {
    const apiParam = {
      workScope: workScope,
      isTree: 'Y',
      pageNum: 1,
      pageSize: 100000,
    };
    const response = await ApiService.get('sys/menus', apiParam);
    const treeData = response.data || [];
    set({ menuTreeData: treeData });
  },

  handleMenuTreeSelect: async (selectedKeys) => {
    set({ selectMenuKeyList: selectedKeys });
  },

  changeTreeWorkScope: (workScope) => {
    const { getGroupList } = get();
    set({ treeWorkScope: workScope });
    getGroupList();
  },

  changeWorkScope: (workScope) => {
    const { getMenuTree } = get();
    set({ workScope: workScope, selectMenuKeyList: [] });
    getMenuTree(workScope);
  },

  removeManager: (removeIndex) => {
    set(
      produce((state: any) => {
        state.selectManagerList.splice(removeIndex, 1);
      })
    );
  },

  removeMember: (removeIndex) => {
    set(
      produce((state: any) => {
        state.selectMemberList.splice(removeIndex, 1);
      })
    );
  },

  openMemberSelectModal: (modalHandleType) => {
    set({
      modalHandleType: modalHandleType,
      isMemberSelectModalOpen: true,
      onlyUserSelect: modalHandleType === 'A' ? true : false,
    });
  },

  okMemberSelect: (selectedList: []) => {
    const { modalHandleType, selectManagerList, selectMemberList } = get();
    if (modalHandleType === 'A') {
      // 관리자 선택일 경우에
      const filterManagerList = selectedList.filter((info: any) => {
        const searchInfo = selectManagerList.find((beforeInfo) => beforeInfo.userId === info.userId);
        if (!searchInfo) {
          return true;
        }
        return false;
      });
      set(
        produce((state: any) => {
          state.selectManagerList = state.selectManagerList.concat(filterManagerList);
        })
      );
    } else {
      // 멤버 선택일 경우에
      const filterMemberList = selectedList.filter((info: any) => {
        const searchInfo = selectMemberList.find((beforeInfo) => {
          return beforeInfo.userId === info.userId || beforeInfo.deptCd === info.deptCd;
        });
        if (!searchInfo) {
          return true;
        }
        return false;
      });

      set(
        produce((state: any) => {
          state.selectMemberList = state.selectMemberList.concat(filterMemberList);
        })
      );
    }
  },

  closeMemberSelectModal: () => {
    set({ isMemberSelectModalOpen: false });
  },

  init: async () => {
    const { getGroupList } = get();
    await getGroupList();
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useSysGroupFormStore;
