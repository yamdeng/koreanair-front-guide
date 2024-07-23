import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect } from 'react';
import { create } from 'zustand';

/* 컬럼 영역 */
const columns: any = [
  { field: 'msgKey', headerName: '메시지 키' },
  { field: 'msgKor', headerName: '설명(한국어)' },
  { field: 'msgEng', headerName: '설명(영어)' },
  { field: 'msgChn', headerName: '설명(중국어)' },
  { field: 'msgJpn', headerName: '설명(일본어)' },
  { field: 'msgEtc', headerName: '설명(기타)' },
  { field: 'regUserId', headerName: '등록자ID' },
  { field: 'regDttm', headerName: '등록일시' },
  { field: 'updUserId', headerName: '수정자ID' },
  { field: 'updDttm', headerName: '수정일시' },
];

const initListData = {
  ...listBaseState,
  listApiPath: 'sys/messages',
  columns: columns,
};

/* zustand store 생성 */
const SysMessageListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  clear: () => {
    set(initListData);
  },
}));

function SysMessageList() {
  const state = SysMessageListStore();
  const { search, list, getColumns } = state;
  const columns = getColumns();

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      {/* 검색 input 영역입니다 */}
      <AppTable rowData={list} columns={columns} store={state} />
    </>
  );
}

export default SysMessageList;
