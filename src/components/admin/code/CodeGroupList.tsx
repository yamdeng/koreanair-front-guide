import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect } from 'react';
import { create } from 'zustand';
import AppSelect from '@/components/common/AppSelect';
import Code from '@/config/Code';

/*

  TODO
   1.workScope 검색 조건으로 전달해야 함
   2.목록 response 체계
   3.키워드 검색 필요
    -기존 safeadmin check

*/

/* 컬럼 영역 */
const columns: any = [
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
];

const initListData = {
  ...listBaseState,
  disablePaging: true,
  listApiPath: 'sys/code-groups',
  baseRoutePath: 'codes',
  columns: columns,
};

/* zustand store 생성 */
const CodeGroupListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* 검색에서 사용할 input 선언 */
  searchWord: '',
  workScope: 'A',

  changeWorkScope: (workScope) => {
    const { search } = get();
    set({ workScope: workScope, searchWord: '' });
    search();
  },

  clear: () => {
    set(initListData);
  },
}));

function CodeGroupList() {
  const state = CodeGroupListStore();
  const {
    search,
    searchWord,
    list,
    workScope,
    getColumns,
    goAddPage,
    goDetailPage,
    changeSearchInput,
    changeWorkScope,
    clear,
  } = state;
  const columns = getColumns();

  useEffect(() => {
    search();
    return clear;
  }, []);

  return (
    <>
      {/* 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>코드관리</h2>
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={search}>
            조회
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={goAddPage}>
            신규
          </button>
        </div>
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
      <AppTable
        rowData={list}
        columns={columns}
        store={state}
        hiddenPagination
        handleRowDoubleClick={(rowInfo) => {
          const data = rowInfo.data;
          const codeGrpId = data.codeGrpId;
          goDetailPage(codeGrpId);
        }}
      />
    </>
  );
}

export default CodeGroupList;
