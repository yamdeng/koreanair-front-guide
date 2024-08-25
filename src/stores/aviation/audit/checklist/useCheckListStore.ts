import { create } from 'zustand';
import CodeService from '@/services/CodeService';
import ApiService from '@/services/ApiService';

/* zustand store 생성 */
const useCheckListStore = create<any>((set, get) => ({
  dsDivisionList: [],
  dsAuditChecklist: [],
  currentTabIndex: 0,
  isCheckListFormModal: false,

  getDivisionList: () => {
    const getCodeList = CodeService.getCodeListByCodeGrpId('CODE_GRP_301');
    set({ dsDivisionList: getCodeList });
  },

  getAuditCheckList: async () => {
    const { currentTabIndex, dsDivisionList } = get();
    const currentTabInfo = dsDivisionList[currentTabIndex];
    const { codeId } = currentTabInfo;
    const apiParam = { division: codeId };
    const apiResult = await ApiService.get(`avn/audit/checklist/getAuditChecklist`, apiParam);
    const data = apiResult.data;
    set({ dsAuditChecklist: data });
  },

  changeTabIndex: (tabIndex, tabInfo) => {
    const { getAuditCheckList } = get();
    set({ currentTabIndex: tabIndex });
    getAuditCheckList();
  },

  openCheckListFormModal: () => {
    set({ isCheckListFormModal: true });
  },

  closeCheckListFormModal: () => {
    set({ isCheckListFormModal: false });
  },

  okModal: (formValue) => {
    const { closeCheckListFormModal } = get();
    // TODO : 체크리스트 등록 api 호출후 완료되면 getAuditCheckList() 호출
    alert(formValue);
    closeCheckListFormModal();
  },

  clear: () => {
    set({ isCheckListFormModal: false, currentTabIndex: 0, dsDivisionList: [], dsAuditChecklist: [] });
  },
}));

export default useCheckListStore;
