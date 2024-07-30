import { produce } from 'immer';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import history from '@/utils/history';

export const defaultListExcludeKeys = [
  'list',
  'excludeApiKeys',
  'displayTableLoading',
  'listApiPath',
  'beforeApiParam',
  'currentPage',
  'pageSize',
  'totalCount',
  'prevPage',
  'nextPage',
  'lastPage',
  'displayPageIndexList',
  'listApiMethod',
  'columns',
  'baseRoutePath',
  'disablePaging',
];

export const listBaseState = {
  listApiPath: '',
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
  listApiMethod: 'get',
  baseRoutePath: '',
};

export const createListSlice = (set, get) => ({
  ...listBaseState,

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
    set({ [inputName]: inputValue });
  },

  getSearchParam: () => {
    const state = get();
    const stateKeys = Object.keys(state);
    const excludeFilterKeys = defaultListExcludeKeys;
    if (state.excludeApiKeys && state.excludeApiKeys.length) {
      excludeFilterKeys.push(...state.excludeApiKeys);
    }
    const applyStateKeys = stateKeys.filter((key) => {
      if (typeof state[key] === 'function') {
        return false;
      } else if (excludeFilterKeys.includes(key)) {
        return false;
      }
      return true;
    });
    const apiParam: any = {};
    applyStateKeys.forEach((apiRequestKey) => {
      apiParam[apiRequestKey] = state[apiRequestKey];
    });
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
    const apiParam = getSearchParam();
    const response: any = await ApiService[listApiMethod](listApiPath, apiParam, { disableLoadingBar: true });
    const data = response.data;
    const list = disablePaging ? data : data.list;
    const totalCount = disablePaging && list ? list.length : data.total;
    setTotalCount(totalCount);
    set({ list: list || [] });
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
        state.list.push({});
      })
    ),

  deleteAll: () => {
    set({ list: [] });
  },

  changeListApiPath: (listApiPath) => {
    set({ listApiPath: listApiPath });
  },
});
