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
    set({ pageSize: pageSize, currentPage: 1 });
    get().search();
  },

  search: () => {
    const { currentPage, pageSize, searchParam } = get();
    const apiParam = { ...searchParam, currentPage, pageSize };
    console.log(`search call : ${JSON.stringify(apiParam)}`);
  },

  clearStore: () => set(defaultListInitailState),
});
