import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppSearchInput from '@/components/common/AppSearchnput';

const initListData = {
  ...listBaseState,
  listApiPath: 'sys/messages',
  baseRoutePath: '/messages',
};

/* zustand store 생성 */
const SysMessageListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchWord: '',

  resetSearchInput: () => {
    set({ searchWord: '' });
  },

  clear: () => {
    set(initListData);
  },
}));

function SysMessageList() {
  const state = SysMessageListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
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
    ])
  );
  const { resetSearch, searchWord, list, goAddPage, goDetailPage, changeSearchInput, resetSearchInput, clear } = state;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    // TODO : 더블클릭시 상세 페이지 또는 모달 페이지 오픈
    const data = selectedInfo.data;
    const detailId = data.msgKey;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    resetSearch();
    return clear;
  }, []);

  return (
    <>
      {/* TODO : 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>메시지 목록</h2>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <span className="form-group wid100">
              <AppSearchInput
                label="이름"
                value={searchWord}
                onChange={(value) => {
                  changeSearchInput('searchWord', value);
                }}
                search={resetSearch}
              />
            </span>
          </div>
        </div>
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={resetSearch}>
            조회
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={resetSearchInput}>
            초기화
          </button>
        </div>
      </div>
      <AppTable
        rowData={list}
        columns={columns}
        setColumns={setColumns}
        store={state}
        handleRowDoubleClick={handleRowDoubleClick}
      />
      <div className="contents-btns">
        {/* TODO : 버튼 목록 정의 */}
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
    </>
  );
}

export default SysMessageList;
