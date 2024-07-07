import { getPageData } from '@/data/grid/example-data-new';

const defaultListInitailState = {
  currentPage: 1,
  pageSize: 10,
  list: [],
  searchParam: { keyword: 'air' },
};

export const createListSlice = (set, get) => ({
  ...defaultListInitailState,

  changeCurrentPage: (page) => {
    set({ currentPage: page });
    get().search();
  },

  changePageSize: (pageSize) => {
    console.log('changePageSize call');
    set({ pageSize: pageSize, currentPage: 1 });
    get().search();
  },

  search: () => {
    const { currentPage, pageSize, searchParam } = get();
    const apiParam = { ...searchParam, currentPage, pageSize };
    console.log(`search call : ${JSON.stringify(apiParam)}`);
    set({ list: getPageData(1, 5) });
  },

  clearStore: () => set(defaultListInitailState),
});
