import AppTable from '@/components/common/AppTable';
import AppNavigation from '@/components/common/AppNavigation';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppCodeSelect from '@/components/common/AppCodeSelect';

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/management/training',
  baseRoutePath: '/occupation/training',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  searchWord: '',
};

/* zustand store 생성 */
const OcuMajorDssTrainingListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    trainNm: '',
    sectCode: '',
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

function OcuMajorDssTrainingList() {
  const state = OcuMajorDssTrainingListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'dssTypeCd', headerName: '재난_유형_코드' },
      { field: 'trainDt', headerName: '훈련_일자' },
      { field: 'trainNm', headerName: '훈련_명' },
      { field: 'updDttm', headerName: '수정_일시' },
      { field: 'updUserId', headerName: '수정자_ID' },
    ])
  );
  const {
    enterSearch,
    searchParam,
    list,
    goAddPage,
    changeSearchInput,
    initSearchInput,
    isExpandDetailSearch,
    toggleExpandDetailSearch,
    clear,
    goDetailPage,
  } = state;
  // TODO : 검색 파라미터 나열
  const { trainNm, sectCode } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    // TODO : 더블클릭시 상세 페이지 또는 모달 페이지 오픈
    const data = selectedInfo.data;
    const detailId = data.trainId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>중대재해대응훈련</h2>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppCodeSelect
                  label={'부문'}
                  codeGrpId="CODE_GRP_OC001"
                  value={sectCode}
                  onChange={(value) => {
                    changeSearchInput('sectCode', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100 mr5">
                <AppCodeSelect
                  label={'부서'}
                  codeGrpId="" //TODO : 코드 조회 수정
                  value={sectCode}
                  onChange={(value) => {
                    changeSearchInput('sectCode', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppCodeSelect
                  label={'재난유형'}
                  codeGrpId="CODE_GRP_OC006" //TODO : 코드 조회 수정
                  value={sectCode}
                  onChange={(value) => {
                    changeSearchInput('sectCode', value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group form-glow">
                <div className="df">
                  <div className="date1">
                    <AppDatePicker label="훈련실시기간" />
                  </div>
                  <span className="unt">~</span>
                  <div className="date2">
                    <AppDatePicker label="훈련실시기간" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppSearchInput
                  label="훈련명"
                  value={trainNm}
                  onChange={(value) => {
                    changeSearchInput('trainNm', value);
                  }}
                  search={enterSearch}
                />
              </div>
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={enterSearch}>
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
        {/* TODO : 버튼 목록 정의 */}
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
    </>
  );
}

export default OcuMajorDssTrainingList;
