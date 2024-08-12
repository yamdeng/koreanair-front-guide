import { produce } from 'immer';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import history from '@/utils/history';

export const listBaseState = {
  beforeApiParam: {},
  displayTableLoading: false,
  list: [],
  excludeApiKeys: [],
  currentPage: 1,
  lastPage: 0,
  totalCount: 0,
  prevPage: null,
  nextPage: null,
  displayPageIndexList: [],
  pageSize: 10,
  searchParam: {},
  isExpandDetailSearch: true,
};

export const createListSlice = (set, get) => ({
  ...listBaseState,

  changeStateProps: (propsName, propsValue) => {
    set({ [propsName]: propsValue });
  },

  goFirstPage() {
    const { prevPage } = get();
    if (prevPage) {
      get().changeCurrentPage(1);
    }
  },

  goLastPage() {
    const { nextPage, totalCount, pageSize } = get();
    if (nextPage) {
      get().changeCurrentPage(Math.ceil(totalCount / pageSize));
    }
  },

  changeCurrentPage(currentPage) {
    set({ currentPage: currentPage });
    get().search();
  },

  changePageSize(pageSize) {
    set({ pageSize: pageSize, currentPage: 1 });
    get().search();
  },

  changeLoading: (loading) => {
    set({ displayTableLoading: loading });
  },

  changeSearchInput: (inputName, inputValue) => {
    const { searchParam } = get();
    searchParam[inputName] = inputValue;
    set({ searchParam: searchParam });
  },

  getSearchParam: () => {
    const state = get();
    const apiParam = { ...state.searchParam };
    apiParam.pageNum = state.currentPage;
    apiParam.pageSize = state.pageSize;
    set({ beforeApiParam: apiParam });
    return apiParam;
  },

  getPageParam: () => {
    const state = get();
    const pageParam = {
      pageNum: state.currentPage,
      pageSize: state.pageSize,
    };
    return pageParam;
  },

  // 검색정보 : list, pageable 추출
  setTotalCount(totalCount = 0) {
    const { pageSize, currentPage } = get();
    // 최대 보여지는 페이징갯수
    const maxPagingSize = 10;
    const totalPageSize = Math.ceil(totalCount / pageSize);
    let currentPageStep = Math.floor(currentPage / maxPagingSize);
    if (currentPage % maxPagingSize !== 0) {
      currentPageStep = currentPageStep + 1;
    }
    const pageInfoStartIndex = currentPageStep * maxPagingSize - (maxPagingSize - 1);
    const pageInfoLastIndex =
      currentPageStep * maxPagingSize <= totalPageSize ? currentPageStep * maxPagingSize : totalPageSize;
    const displayPageIndexList = [];
    for (let pageInfoIndex = pageInfoStartIndex; pageInfoIndex <= pageInfoLastIndex; pageInfoIndex++) {
      displayPageIndexList.push(pageInfoIndex);
    }
    const lastPageStep = Math.ceil(totalPageSize / maxPagingSize);
    const isNextPageStep = currentPageStep < lastPageStep;
    const nextPage = isNextPageStep ? currentPageStep * maxPagingSize + 1 : null;
    const isPrevPageStep = currentPageStep > 1;
    const prevPage = isPrevPageStep ? (currentPageStep - 2) * maxPagingSize + 1 : null;
    set({
      displayPageIndexList: displayPageIndexList,
      prevPage: prevPage,
      nextPage: nextPage,
      lastPage: Math.ceil(totalCount / pageSize),
      totalCount: totalCount,
    });
  },

  search: async () => {
    const { listApiPath, getSearchParam, setTotalCount, listApiMethod, disablePaging } = get();
    const applyListApiMethod = listApiMethod || 'get';
    const apiParam = getSearchParam();
    const apiResult: any = await ApiService[applyListApiMethod](listApiPath, apiParam, { disableLoadingBar: true });
    const data = apiResult.data;
    const list = disablePaging ? data : data.list;
    const totalCount = disablePaging && list ? list.length : data.total;
    setTotalCount(totalCount);
    set({ list: list || [] });
  },

  enterSearch: () => {
    set({ currentPage: 1 });
    get().search();
  },

  initSearchInput: () => {
    const { searchParam } = get();
    const resultSearchParam = {};
    if (searchParam) {
      const searchParamKeys = Object.keys(searchParam);
      searchParamKeys.forEach((keyName) => {
        const typeName = typeof searchParam[keyName];
        if (typeName === 'string') {
          resultSearchParam[keyName] = '';
        } else {
          resultSearchParam[keyName] = null;
        }
      });
      set({ searchParam: resultSearchParam });
    }
  },

  getColumns: () => {
    const { columns } = get();
    return CommonUtil.mergeColumnInfosByLocal(columns);
  },

  goDetailPage: (detailId) => {
    const { baseRoutePath } = get();
    history.push(`${baseRoutePath}/${detailId}`);
  },

  goEditPage: (detailId) => {
    const { baseRoutePath } = get();
    history.push(`${baseRoutePath}/${detailId}/edit`);
  },

  goAddPage: () => {
    const { baseRoutePath } = get();
    history.push(`${baseRoutePath}/add/edit`);
  },

  excelDownload: () => {
    // TODO : 엑셀 다운로드
  },

  addRow: () =>
    set(
      produce((state: any) => {
        state.list.push({
          updated: true,
        });
      })
    ),

  deleteAll: () => {
    set({ list: [] });
  },

  toggleExpandDetailSearch: () => {
    const { isExpandDetailSearch } = get();
    set({ isExpandDetailSearch: !isExpandDetailSearch });
  },

  changeListApiPath: (listApiPath) => {
    set({ listApiPath: listApiPath });
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

  setList: (newList) => {
    set({ list: newList });
  },

  changeListInfoByIndex: (rowIndex, colId, newValue) => {
    set(
      produce((state: any) => {
        const listInfo = state.list[rowIndex];
        state.list[rowIndex][colId] = '';
        listInfo[colId] = newValue;
        listInfo.updated = true;
      })
    );
  },

  // TODO : 폼 모달 open 공통 처리 add
});
