import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import ApiService from '@/services/ApiService';
import { produce } from 'immer';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';

const initFormValue = {
  groupCd: '',
  workScope: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  remark: '',
  useYn: '',
  groupUsage: 'MENU',
};

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

  formValue: initFormValue,
};

/* zustand store 생성 */
const useSysGroupFormStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  addGroup: () => {
    const { treeWorkScope } = get();
    const formValue = {
      ...initFormValue,
      workScope: treeWorkScope,
    };
    set({ formValue: formValue, formType: FORM_TYPE_ADD });
  },

  save: async () => {
    const { validate, getApiParam, formType, formApiPath, formValue, getGroupList, getMenuTree } = get();
    const { workScope, groupCd } = formValue;
    const isValid = await validate();
    if (isValid) {
      const apiParam = getApiParam();
      if (formType === FORM_TYPE_ADD) {
        await ApiService.post(`${formApiPath}`, apiParam);
        ModalService.alert({
          body: '저장되었습니다.',
          ok: async () => {
            set({ formType: FORM_TYPE_UPDATE });
            await getMenuTree(workScope);
            await getGroupList();
          },
        });
      } else {
        await ApiService.put(`${formApiPath}/${groupCd}`, apiParam);
        ModalService.alert({
          body: '저장되었습니다.',
          ok: async () => {
            await getGroupList();
          },
        });
      }
    }
  },

  saveDetail: async () => {
    const { formValue, selectManagerList, selectMemberList, selectMenuKeyList } = get();
    const { groupCd } = formValue;
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
    ToastService.success('저장되었습니다.');
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
    set({ formValue: groupInfo, formType: FORM_TYPE_UPDATE });
    await getDetailListAll();
    await getMenuTree(workScope);
  },

  getDetailListAll: async () => {
    const { formValue } = get();
    const { groupCd } = formValue;
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
    const { changeInput, getMenuTree } = get();
    changeInput('workScope', workScope);
    set({ selectMenuKeyList: [] });
    getMenuTree(workScope);
  },

  removeManager: (removeIndex) => {
    set(
      produce((state: any) => {
        state.selectManagerList.splice(removeIndex, 1);
      })
    );
  },

  removeManagerAll: () => {
    set(
      produce((state: any) => {
        state.selectManagerList = [];
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

  removeMemberAll: () => {
    set(
      produce((state: any) => {
        state.selectMemberList = [];
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

  remove: async () => {
    const { formValue, formApiPath, init } = get();
    const { groupCd } = formValue;
    ModalService.confirm({
      body: '삭제하시겠습니까?',
      ok: async () => {
        await ApiService.delete(`${formApiPath}/${groupCd}`);
        ModalService.alert({
          body: '삭제되었습니다.',
          ok: () => {
            init();
          },
        });
      },
    });
  },

  init: async () => {
    const { getGroupList, addGroup } = get();
    await getGroupList();
    await addGroup();
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useSysGroupFormStore;
