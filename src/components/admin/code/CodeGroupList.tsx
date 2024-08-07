import AppTable from '@/components/common/AppTable';
import AppSearchInput from '@/components/common/AppSearchnput';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import { create } from 'zustand';
import AppSelect from '@/components/common/AppSelect';
import CommonUtil from '@/utils/CommonUtil';
import Code from '@/config/Code';

const initListData = {
  ...listBaseState,
  disablePaging: true,
  listApiPath: 'sys/code-groups',
  baseRoutePath: 'codes',
};

/* zustand store 생성 */
const SysCodeGroupListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* 검색에서 사용할 input 선언 */
  searchParam: {
    searchWord: '',
  },

  workScope: 'A',

  changeWorkScope: (workScope) => {
    const { search } = get();
    set({
      workScope: workScope,
      searchParam: {
        searchWord: '',
      },
    });
    search();
  },

  getSearchParam: () => {
    const { workScope, searchParam } = get();
    const { searchWord } = searchParam;
    return {
      workScope: workScope,
      searchWord: searchWord,
    };
  },

  clear: () => {
    set(initListData);
  },
}));

function CodeGroupList() {
  const state = SysCodeGroupListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'codeGrpId', headerName: '코드그룹ID' },
      { field: 'workScope', headerName: '업무구분(A:항공안전, O:산업안전, S:시스템)' },
      { field: 'codeGrpNameKor', headerName: '코드그룹명(한국어)' },
      { field: 'codeGrpNameEng', headerName: '코드그룹명(영어)' },
      { field: 'useYn', headerName: '사용여부' },
      { field: 'remark', headerName: '비고' },
      { field: 'regUserId', headerName: '등록자ID' },
      { field: 'regDttm', headerName: '등록일시' },
      { field: 'updUserId', headerName: '수정자ID' },
      { field: 'updDttm', headerName: '수정일시' },
    ])
  );

  const {
    initSearch,
    searchParam,
    list,
    workScope,
    goAddPage,
    goDetailPage,
    changeSearchInput,
    initSearchInput,
    isExpandDetailSearch,
    toggleExpandDetailSearch,
    changeWorkScope,
    clear,
  } = state;

  const { searchWord } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    const codeGrpId = data.codeGrpId;
    goDetailPage(codeGrpId);
  }, []);

  useEffect(() => {
    initSearch();
    return clear;
  }, []);

  return (
    <>
      {/* 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>코드관리</h2>
      </div>
      {/* 검색 input 영역입니다 */}
      <div className="form-group wid100 mb5">
        <AppSelect
          style={{ width: 150, marginBottom: 10 }}
          options={Code.adminWorkScope}
          value={workScope}
          onChange={(appSelectValue) => {
            changeWorkScope(appSelectValue);
          }}
        />
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
        hiddenPagination
      />
      <div className="contents-btns">
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
    </>
  );
}

export default CodeGroupList;
