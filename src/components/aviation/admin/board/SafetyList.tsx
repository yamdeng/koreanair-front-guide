import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppNavigation from '@/components/common/AppNavigation';
import AppCodeSelect from '@/components/common/AppCodeSelect';

const initListData = {
  ...listBaseState,
  listApiPath: 'avn/admin/board/safety-policis',
  baseRoutePath: '/aviation/board-manage/safety-policy',
};

/* zustand store 생성 */
const BoardListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    policyType: '',
    titleKo: '',
    useYn: '',
  },
  //초기화 버튼 클릭 시 검색 조건 초기화
  initSearchInput: () => {
    set({
      searchParam: {
        policyType: '',
        titleKo: '',
        useYn: '',
      },
    });
  },

  clear: () => {
    set(initListData);
  },
}));

//실제 안전정책 component
function SafetyList() {
  const state = BoardListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      //테이블 column 선언
      { field: 'num', headerName: '순번', cellStyle: { textAlign: 'center' } },
      { field: 'policyType', headerName: '정책구분', cellStyle: { textAlign: 'center' } },
      { field: 'titleKo', headerName: '제목' },
      { field: 'useYn', headerName: '사용여부', cellStyle: { textAlign: 'center' } },
      { field: 'regUserId', headerName: '등록자ID', cellStyle: { textAlign: 'center' } },
      { field: 'regDttm', headerName: '등록일시', cellStyle: { textAlign: 'center' } },
      { field: 'updUserId', headerName: '수정자ID', cellStyle: { textAlign: 'center' } },
      { field: 'updDttm', headerName: '수정일시', cellStyle: { textAlign: 'center' } },
    ])
  );

  //BoardListStore에서 정의된 메소드 사용시 이곳에서 분해할당
  const { enterSearch, searchParam, list, goAddPage, initSearchInput, changeSearchInput, clear, goDetailPage, search } =
    state;

  //input value에 넣기 위한 분리 선언
  const { policyType, titleKo, useYn } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    //더블클릭시 상세 페이지 또는 모달 페이지 오픈
    const data = selectedInfo.data;
    const detailId = data.boardId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    initSearchInput();
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      {/* TODO : 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>안전정책</h2>
      </div>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_144/codes`}
                applyAllSelect
                label="정책구분"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={policyType}
                onChange={(value) => {
                  changeSearchInput('policyType', value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSearchInput
                label="제목"
                value={titleKo}
                onChange={(value) => {
                  changeSearchInput('titleKo', value);
                }}
                search={search}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                apiUrl={`com/code-groups/CODE_GRP_146/codes`}
                applyAllSelect
                label="사용여부"
                labelKey="codeNameKor"
                valueKey="codeId"
                value={useYn}
                onChange={(value) => {
                  changeSearchInput('useYn', value);
                }}
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

export default SafetyList;
