import AppTable from '@/components/common/AppTable';
import withSourceView from '@/hooks/withSourceView';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect } from 'react';
import { create } from 'zustand';

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
  listApiPath: 'data',
  columns: columns,
};

const testStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  clear: () => {
    set(initListData);
  },
}));

function AppTableServerPage2() {
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

export default withSourceView(AppTableServerPage2);
