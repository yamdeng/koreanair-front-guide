import withSourceView from '@/hooks/withSourceView';
import { useEffect } from 'react';
import AppTable from '@/components/common/AppTable';
import { create } from 'zustand';
import ApiService from '@/services/ApiService';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';

/*

  서버 페이징 예시
   -기본은 서버페이징임

*/

const columns: any = [
  { field: 'id', headerName: 'Id' },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Nameen' },
  { field: 'email', headerName: 'Email' },
];

const initListData = {
  ...listBaseState,
  columns: columns,
};

const testStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  search: async () => {
    const apiParam = get().getSearchParam();
    const response: any = await ApiService.get('data', apiParam, { disableLoadingBar: true });
    const data = response.data;
    const rows = data.rows;
    const totalCount = data.total;
    get().setTotalCount(totalCount);
    set({ list: rows });
  },

  clear: () => {
    set(initListData);
  },
}));

function AppTableServerPage() {
  const state = testStore();
  const { search, list, columns } = state;

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <AppTable rowData={list} columns={columns} store={state} />
    </>
  );
}

export default withSourceView(AppTableServerPage);
