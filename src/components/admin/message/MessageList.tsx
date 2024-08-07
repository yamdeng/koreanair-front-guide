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

  searchParam: {
    searchWord: '',
  },

  initSearchInput: () => {
    set({
      searchParam: {
        searchWord: '',
      },
    });
  },

  clear: () => {
    set(initListData);
  },
}));

function MessageList() {
  const state = SysMessageListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'msgKey', headerName: '메시지 키' },
      { field: 'msgKor', headerName: '설명(한국어)' },
      { field: 'msgEng', headerName: '설명(영어)' },
      { field: 'msgChn', headerName: '설명(중국어)' },
      { field: 'msgJpn', headerName: '설명(일본어)' },
      { field: 'msgEtc', headerName: '설명(기타)' },
    ])
  );
  const {
    initSearch,
    searchParam,
    list,
    goAddPage,
    goDetailPage,
    changeSearchInput,
    initSearchInput,
    isExpandDetailSearch,
    toggleExpandDetailSearch,
    clear,
  } = state;
  const { searchWord } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    const detailId = data.msgKey;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    initSearch();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메시지 관리</h2>
      </div>
      <div className="boxForm">
        <div className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}>
          <div className="form-table">
            <div className="form-cell wid50">
              <span className="form-group wid100">
                <AppSearchInput
                  label="이름"
                  value={searchWord}
                  onChange={(value) => {
                    changeSearchInput('searchWord', value);
                  }}
                  search={initSearch}
                />
              </span>
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={initSearch}>
              조회
            </button>
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={initSearchInput}>
              초기화
            </button>
          </div>
        </div>
        <button
          type="button"
          name="button"
          className={isExpandDetailSearch ? 'arrow button _control active' : 'arrow button _control'}
          onClick={toggleExpandDetailSearch}
        >
          <span className="hide">접기</span>
        </button>
      </div>
      <AppTable
        rowData={list}
        columns={columns}
        setColumns={setColumns}
        store={state}
        handleRowDoubleClick={handleRowDoubleClick}
      />
      <div className="contents-btns">
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
    </>
  );
}

export default MessageList;
