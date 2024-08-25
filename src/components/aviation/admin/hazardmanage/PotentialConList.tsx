import AppTable from '@/components/common/AppTable';
import AppTextInput from '@/components/common/AppTextInput';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import Code from '@/config/Code';
import AppNavigation from '@/components/common/AppNavigation';
import AppCodeSelect from '@/components/common/AppCodeSelect';

const initListData = {
  ...listBaseState,
  listApiPath: 'avn/admin/criteria/consequences',
  baseRoutePath: '/aviation/hazard-manage/potential-consequence',
};

const initSearchParam = {
  reportType: '',
  nameKo: '',
  nameEn: '',
  useYn: '',
  notes: '',
};

/* zustand store 생성 */
const ConsequenceListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    reportType: '',
    nameKo: '',
    nameEn: '',
    useYn: '',
    notes: '',
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

// Potencial Consequence component
function PotentialConList() {
  const state = ConsequenceListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '순번', cellStyle: { textAlign: 'center' } },
      { field: 'reportType', headerName: '리포트 구분', cellStyle: { textAlign: 'center' } },
      { field: 'nameKo', headerName: '잠재적결과(KOR)' },
      { field: 'nameEn', headerName: '잠재적결과(ENG)' },
      { field: 'useYn', headerName: '사용여부', cellStyle: { textAlign: 'center' } },
      { field: 'notes', headerName: '비고', cellStyle: { textAlign: 'center' } },
      { field: 'regUserId', headerName: '등록자', cellStyle: { textAlign: 'center' } },
      { field: 'regDttm', headerName: '등록일', cellStyle: { textAlign: 'center' } },
      { field: 'updUserId', headerName: '수정자', cellStyle: { textAlign: 'center' } },
      { field: 'updDttm', headerName: '수정일', cellStyle: { textAlign: 'center' } },
    ])
  );
  // PotencialConListStore 에서 정의된 메소드 사용 시 이곳에서 분해할당
  const {
    enterSearch,
    searchParam,
    list,
    goAddPage,
    changeSearchInput,
    isExpandDetailSearch,
    toggleExpandDetailSearch,
    clear,
    goDetailPage,
  } = state;

  // input value에 넣기 위한 분리 선언
  const { reportType, nameKo, nameEn, useYn, notes } = searchParam;

  // 더블클릭 시 상세페이지 또는 모달페이지 오픈
  const handleRowDoubleClick = useCallback((selectedInfo) => {
    console.log(selectedInfo);
    const data = selectedInfo.data;
    const detailId = data.consequenceId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <AppNavigation />
      {/* TODO : 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>Potential Consequence</h2>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div id="" className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppCodeSelect
                  apiUrl={`com/code-groups/CODE_GRP_145/codes`}
                  // 전체 값 선언
                  applyAllSelect
                  label="리포트구분"
                  // 공통코드로 사용하는 법
                  options={Code.reportType}
                  // value값 선언
                  value={reportType}
                  labelKey="codeNameKor"
                  valueKey="codeId"
                  // 값 변경 시 해당 메소드
                  onChange={(value) => {
                    changeSearchInput('reportType', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label={'잠재적결과(KOR)'}
                  value={nameKo}
                  onChange={(value) => {
                    changeSearchInput('nameKo', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label={'잠재적결과(ENG)'}
                  value={nameEn}
                  onChange={(value) => {
                    changeSearchInput('nameEn', value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-table">
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
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppTextInput
                  label={'비고'}
                  value={notes}
                  onchange={(value) => {
                    changeSearchInput('notes', value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={enterSearch}>
              조회
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
        {/* TODO : 버튼 목록 정의 */}
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
    </>
  );
}

export default PotentialConList;
