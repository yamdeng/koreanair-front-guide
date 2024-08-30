import { FORM_TYPE_ADD, FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import ApiService from '@/services/ApiService';
import { produce } from 'immer';
import ModalService from '@/services/ModalService';
import ToastService from '@/services/ToastService';

const initFormValue = {
  groupId: null,
  groupCd: '',
  workScope: '',
  nameKor: '',
  nameEng: '',
  nameChn: '',
  nameJpn: '',
  nameEtc: '',
  remark: '',
  useYn: 'Y',
  groupUsage: 'MENU',
  auditAdminYn: 'N',
  reportType: '',
  groupAdminYn: 'N',
};

/* yup validation */
const yupFormSchema = yup.object({
  groupCd: yup.string().required(),
  workScope: yup.string().required(),
  nameKor: yup.string().required(),
  nameEng: yup.string(),
  nameChn: yup.string(),
  nameJpn: yup.string(),
  nameEtc: yup.string(),
  remark: yup.string(),
  useYn: yup.string().required(),
  groupUsage: yup.string().required(),
  auditAdminYn: yup.string().required(),
  reportType: yup.string(),
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  menuTreeData: [],
  virtualGroupList: [],
  selectedGroupId: null,
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
    set({
      formValue: formValue,
      formType: FORM_TYPE_ADD,
      selectedGroupId: null,
      selectManagerList: [],
      selectMemberList: [],
      selectMenuKeyList: [],
    });
  },

  save: async () => {
    const { validate, getApiParam, formType, formApiPath, formValue, getGroupList, getDetail } = get();
    const { groupId } = formValue;
    const isValid = await validate();
    if (isValid) {
      const apiParam = getApiParam();
      if (formType === FORM_TYPE_ADD) {
        const apiReuslt = await ApiService.post(`${formApiPath}`, apiParam);
        const detailInfo = apiReuslt.data;
        ModalService.alert({
          body: '저장되었습니다.',
          ok: async () => {
            await getDetail(detailInfo.groupId);
            await getGroupList();
          },
        });
      } else {
        await ApiService.put(`${formApiPath}/${groupId}`, apiParam);
        ModalService.alert({
          body: '저장되었습니다.',
          ok: async () => {
            await getDetail(groupId);
            await getGroupList();
          },
        });
      }
    }
  },

  saveDetail: async () => {
    const { formValue, selectManagerList, selectMemberList, selectMenuKeyList } = get();
    const { groupId } = formValue;
    let usersApiParam = selectManagerList.map((info) => {
      return {
        userId: info.userId,
        groupId: groupId,
        groupAdminYn: 'Y',
      };
    });
    usersApiParam = usersApiParam.concat(
      selectMemberList
        .filter((info) => info.selectedType === 'U')
        .map((info) => {
          return { userId: info.userId, groupId: groupId, groupAdminYn: 'N' };
        })
    );

    const deptsApiParam = selectMemberList
      .filter((info) => info.selectedType === 'D')
      .map((info) => {
        return { deptCd: info.deptCd, groupId: groupId };
      });
    await ApiService.put(`sys/virtual-groups/${groupId}/users`, usersApiParam);
    await ApiService.put(`sys/virtual-groups/${groupId}/depts`, deptsApiParam);
    await ApiService.put(
      `sys/virtual-groups/${groupId}/menus`,
      selectMenuKeyList.map((menuKey) => {
        return {
          groupId: groupId,
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
    if (selectedKeys && selectedKeys.length) {
      const { getDetailListAll, getMenuTree, getDetail } = get();
      const groupInfo = info.node;
      const workScope = groupInfo.workScope;
      await getDetail(selectedKeys[0]);
      await getDetailListAll();
      await getMenuTree(workScope);
    }
  },

  getDetailListAll: async () => {
    const { formValue } = get();
    const { groupId } = formValue;
    const usersResponse = await ApiService.get(`sys/virtual-groups/${groupId}/users`);
    const deptsResponse = await ApiService.get(`sys/virtual-groups/${groupId}/depts`);
    const menusResponse = await ApiService.get(`sys/virtual-groups/${groupId}/menus`);
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

  handleMenuTreeSelect: async (selectedInfoList) => {
    set({ selectMenuKeyList: selectedInfoList.map((info) => info.value) });
  },

  changeTreeWorkScope: (workScope) => {
    const { getGroupList } = get();
    set({ treeWorkScope: workScope, selectedGroupId: null });
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
      const filterManagerList = selectedList.filter((selectedInfo: any) => {
        const adminSearchInfo = selectManagerList.find((beforeInfo) => beforeInfo.userId === selectedInfo.userId);
        const memberSearchInfo = selectMemberList.find((beforeInfo) => {
          if (selectedInfo.selectedType === 'U' && beforeInfo.selectedType === 'U') {
            if (selectedInfo.userId === beforeInfo.userId) {
              return true;
            }
          }
          return false;
        });
        if (!adminSearchInfo && !memberSearchInfo) {
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
      const filterMemberList = selectedList.filter((selectedInfo: any) => {
        const adminSearchInfo = selectManagerList.find((beforeInfo) => beforeInfo.userId === selectedInfo.userId);
        const memberSearchInfo = selectMemberList.find((beforeInfo) => {
          if (selectedInfo.selectedType === 'U' && beforeInfo.selectedType === 'U') {
            if (selectedInfo.userId === beforeInfo.userId) {
              return true;
            }
          }
          if (selectedInfo.selectedType === 'D' && beforeInfo.selectedType === 'D') {
            if (selectedInfo.deptCd === beforeInfo.deptCd) {
              return true;
            }
          }
          return false;
        });
        if (!adminSearchInfo && !memberSearchInfo) {
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
    const { groupId } = formValue;
    ModalService.confirm({
      body: '삭제하시겠습니까?',
      ok: async () => {
        await ApiService.delete(`${formApiPath}/${groupId}`);
        ModalService.alert({
          body: '삭제되었습니다.',
          ok: () => {
            init();
          },
        });
      },
    });
  },

  getDetail: async (groupId) => {
    const { formApiPath } = get();
    const apiResult = await ApiService.get(`${formApiPath}/${groupId}`);
    const groupInfo = apiResult.data;
    set({ formValue: groupInfo, formType: FORM_TYPE_UPDATE, selectedGroupId: groupId, errors: {} });
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
