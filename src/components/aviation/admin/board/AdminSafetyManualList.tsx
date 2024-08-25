import AppTable from '@/components/common/AppTable';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppNavigation from '@/components/common/AppNavigation';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
  listApiPath: 'avn/admin/board/manuals',
  baseRoutePath: '/aviation/board-manage/safety-manual',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  jobType: '',
  manualName: '',
  languageType: '',
  useYn: '',
};

/* zustand store 생성 */
const ManualListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    jobType: '',
    manualName: '',
    languageType: '',
    useYn: '',
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...initSearchParam,
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...initSearchParam } });
  },
}));

function AdminSafetyManualList() {
  const state = ManualListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '순번', cellStyle: { textAlign: 'center' } },
      { field: 'jobType', headerName: '업무구분', cellStyle: { textAlign: 'center' } },
      { field: 'manualName', headerName: '메뉴얼명' },
      { field: 'languageType', headerName: '언어구분', cellStyle: { textAlign: 'center' } },
      { field: 'useYn', headerName: '사용여부', cellStyle: { textAlign: 'center' } },
      { field: 'regUserId', headerName: '등록자ID', cellStyle: { textAlign: 'center' } },
      { field: 'regDttm', headerName: '등록일시', cellStyle: { textAlign: 'center' } },
      { field: 'updUserId', headerName: '수정자ID', cellStyle: { textAlign: 'center' } },
      { field: 'updDttm', headerName: '수정일시', cellStyle: { textAlign: 'center' } },
    ])
  );
  const { enterSearch, searchParam, list, goAddPage, changeSearchInput, initSearchInput, clear, search, goDetailPage } =
    state;

  // TODO : 검색 파라미터 나열
  const { jobType, manualName, languageType, useYn } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    // TODO : 더블클릭시 상세 페이지 또는 모달 페이지 오픈
    const data = selectedInfo.data;
    const detailId = data.manualId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      {/* TODO : 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>안전메뉴얼</h2>
      </div>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_148/codes`}
                applyAllSelect
                id="useSafetyBoardFormStorepolicyType"
                name="jobType"
                label="업무구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={jobType}
                onChange={(value) => changeSearchInput('jobType', value)}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSearchInput
                label="메뉴얼명"
                value={manualName}
                onChange={(value) => {
                  changeSearchInput('manualName', value);
                }}
                search={search}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_147/codes`}
                applyAllSelect
                name="languageType"
                label="언어구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={languageType}
                onChange={(value) => changeSearchInput('languageType', value)}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_146/codes`}
                applyAllSelect
                name="useYn"
                label="사용여부"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={useYn}
                onChange={(value) => changeSearchInput('useYn', value)}
              />
            </div>
          </div>
          <div className="btn-area df">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={enterSearch}>
              조회
            </button>
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={initSearchInput}>
              초기화
            </button>
          </div>
        </div>
      </div>
      {/* //검색영역 */}
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

export default AdminSafetyManualList;
