import { create } from 'zustand';
import CommonUtil from '@/utils/CommonUtil';
import ApiService from '@/services/ApiService';

/* form 초기화 */
const initFormData = {
  orgTreeData: [],
  selectedDeptInfo: null,
};

/* zustand store 생성 */
const useSysDeptFormStore = create<any>((set) => ({
  ...initFormData,

  getOrgTree: async () => {
    const response = await ApiService.get('sys/depts', {
      pageNum: 1,
      pageSize: 100000,
    });
    const list = response.data.list;
    const treeData = CommonUtil.listToTreeData(list, 'deptCd', 'upperDeptCd', '0');
    set({ orgTreeData: treeData });
  },

  handleTreeSelect: (selectedKeys, info) => {
    set({ selectedDeptInfo: info.node });
  },

  clear: () => {
    set(initFormData);
  },
}));

export default useSysDeptFormStore;
