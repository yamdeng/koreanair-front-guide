import AppTable from '@/components/common/AppTable';
import AppNavigation from '@/components/common/AppNavigation';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppTextInput from '@/components/common/AppTextInput';
import AppSelect from '@/components/common/AppSelect';
import AppAutoComplete from '@/components/common/AppAutoComplete';

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/management/partner',
  baseRoutePath: '/occupation/partner',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  searchWord: '',
};

/* zustand store 생성 */
const OcuPartnerPlaceListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    searchWord: '',
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

function OcuPartnerPlaceList() {
  const state = OcuPartnerPlaceListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'prtnrNm', headerName: '협력업체_명' },
      { field: 'bizPlaceClsCd', headerName: '사업장_분류_코드' },
      { field: 'useSectCd', headerName: '사용부문_코드' },
      { field: 'mgntDeptCd', headerName: '관리부서_코드' },
    ])
  );
  const {
    enterSearch,
    //searchParam,
    list,
    goAddPage,
    //changeSearchInput,
    initSearchInput,
    // isExpandDetailSearch,
    // toggleExpandDetailSearch,
    clear,
    goDetailPage,
  } = state;
  // TODO : 검색 파라미터 나열
  //const { searchWord } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    // 규정_지침_매뉴얼_양식_ID
    const detailId = data.prtnId;
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
        <h2>협력업체</h2>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div id="" className="area-detail active">
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput label={'업체명'} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100 mr5">
                <AppSelect label={'사업장 분류'} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppSelect label={'사용부문'} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppAutoComplete label={'관리부서'} />
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
        {/* <button
          type="button"
          name="button"
          className={isExpandDetailSearch ? 'arrow button _control active' : 'arrow button _control'}
          onClick={toggleExpandDetailSearch}
        >
          <span className="hide">접기</span>
        </button> */}
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

export default OcuPartnerPlaceList;
