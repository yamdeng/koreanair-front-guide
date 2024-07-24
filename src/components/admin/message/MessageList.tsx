import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect } from 'react';
import { create } from 'zustand';

/* 컬럼 영역 */
const columns: any = [
  { field: 'msgKey', headerName: '메시지 키', isLink: true, linkPath: '/messages' },
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
  baseRoutePath: '/messages',
  columns: columns,
};

/* zustand store 생성 */
const SysMessageListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* 검색에서 사용할 input 선언 */
  searchWord: '',

  clear: () => {
    set(initListData);
  },
}));

function SysMessageList() {
  const state = SysMessageListStore();
  const { search, searchWord, list, getColumns, goAddPage, changeSearchInput } = state;
  const columns = getColumns();

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      {/* 검색 input 영역입니다 */}
      <div className="conts-title">
        <h2>메시지목록</h2>
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={search}>
            조회
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={goAddPage}>
            신규
          </button>
        </div>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <span className="form-group wid100 mr5">
              <input
                type="text"
                className="form-tag"
                name="title"
                value={searchWord}
                onChange={(event) => {
                  changeSearchInput('searchWord', event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event && event.key === 'Enter') {
                    search();
                  }
                }}
              />
              <label className="f-label">이름</label>
            </span>
          </div>
        </div>
      </div>
      <AppTable rowData={list} columns={columns} store={state} />
    </>
  );
}

export default SysMessageList;
