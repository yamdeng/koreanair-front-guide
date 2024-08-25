import AppTable from '@/components/common/AppTable';
import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import Code from '@/config/Code';

const initListData = {
  ...listBaseState,
  listApiPath: 'avn/admin/criteria/taxonomies',
  baseRoutePath: '/aviation/hazard-manage/taxonomy',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  hazardLv1Id: '',
  hazardLv2Id: '',
  hazardLv3Id: '',
  lvText1: '',
  lvText2: '',
  lvText3: '',
  hazardDetail: '',
  sources: '',
  potentialConsequence: '',
  useYn: '',
  notes: '',
  viewOrder: '',
};

/* zustand store 생성 */
const HazardTaxonomyListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    hazardLv1Id: '',
    hazardLv2Id: '',
    hazardLv3Id: '',
    lvText1: '',
    lvText2: '',
    lvText3: '',
    hazardDetail: '',
    sources: '',
    potentialConsequence: '',
    useYn: '',
    notes: '',
    viewOrder: '',
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

// Taxonomy component
function TaxonomyList() {
  const state = HazardTaxonomyListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      // { field: 'hazardLv1Id', headerName: 'Level 1', cellStyle: { textAlign: 'center' } },
      // { field: 'hazardLv2Id', headerName: 'Level 2', cellStyle: { textAlign: 'center' } },
      // { field: 'hazardLv3Id', headerName: 'Level 3', cellStyle: { textAlign: 'center' } },
      { field: 'lvText1', headerName: 'Level 1', cellStyle: { textAlign: 'center' } },
      { field: 'lvText2', headerName: 'Level 2', cellStyle: { textAlign: 'center' } },
      { field: 'lvText3', headerName: 'Level 3', cellStyle: { textAlign: 'center' } },
      { field: 'hazardDetail', headerName: '위해요인 내용' },
      { field: 'sources', headerName: '출처' },
      { field: 'potentialConsequence', headerName: '잠재결과' },
      { field: 'useYn', headerName: '사용여부' },
      { field: 'notes', headerName: '비고' },
      { field: 'viewOrder', headerName: '정렬순서' },
      { field: 'regUserId', headerName: '등록자', cellStyle: { textAlign: 'center' } },
      { field: 'regDttm', headerName: '등록일', cellStyle: { textAlign: 'center' } },
      { field: 'updUserId', headerName: '수정자', cellStyle: { textAlign: 'center' } },
      { field: 'updDttm', headerName: '수정일', cellStyle: { textAlign: 'center' } },
    ])
  );
  // HazardTaxonomyListStore 에서 정의된 메소드 사용 시 이곳에서 분해할당
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
  // TODO : 검색 파라미터 나열
  const { lvText1, lvText2, lvText3, hazardDetail, sources, potentialConsequence, useYn, notes } = searchParam;

  // TODO : 더블클릭시 상세 페이지 또는 모달 페이지 오픈
  const handleRowDoubleClick = useCallback((selectedInfo) => {
    console.log(selectedInfo);
    const data = selectedInfo.data;
    // Lv3가 메인??
    const detailId = data.hazardLv3Id;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <div className="Breadcrumb">
        <ol>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">홈</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">관리자</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">HAZARD관리</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">Taxonomy관리</a>
          </li>
        </ol>
      </div>
      {/*경로 */}
      <div className="conts-title">
        <h2>Taxonomy 관리</h2>
      </div>
      {/*검색영역 */}
      <div className="boxForm">
        {/*area-detail명 옆에 active  */}
        <div id="" className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label="Level1"
                  value={lvText1}
                  onChange={(value) => {
                    changeSearchInput('lvText1', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                {/* TODO : lv2 확인 */}
                <AppTextInput
                  label="Level2"
                  value={lvText2}
                  onChange={(value) => {
                    changeSearchInput('lvText2', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                {/* TODO : lv3 확인 */}
                <AppTextInput
                  label="Level3"
                  value={lvText3}
                  onChange={(value) => {
                    changeSearchInput('lvText3', value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell ">
              <div className="form-group wid100">
                <AppTextInput
                  label={'위해요인내용'}
                  value={hazardDetail}
                  onChange={(value) => {
                    changeSearchInput('hazardDetail', value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label={'출처'}
                  value={sources}
                  onChange={(value) => {
                    changeSearchInput('sources', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label={'잠재결과'}
                  value={potentialConsequence}
                  onChange={(value) => {
                    changeSearchInput('potentialConsequence', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppSelect
                  label={'사용여부'}
                  options={Code.useYn}
                  // SelectBox 초기 '전체'
                  // applyAllSelect
                  value={useYn}
                  onChange={(value) => {
                    changeSearchInput('useYn', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label={'비고'}
                  value={notes}
                  onChange={(value) => {
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
        {/*__control명 옆에 active  */}
        <button
          type="button"
          name="button"
          className={isExpandDetailSearch ? 'arrow button _control active' : 'arrow button _control'}
          onClick={toggleExpandDetailSearch}
        >
          <span className="hide">접기</span>
        </button>
      </div>
      {/* //검색영역 */}

      {/*그리드영역 */}
      <div className="">
        <AppTable
          rowData={list}
          columns={columns}
          setColumns={setColumns}
          store={state}
          handleRowDoubleClick={handleRowDoubleClick}
        />
      </div>
      {/*//그리드영역 */}

      {/* 하단버튼영역 */}
      <div className="contents-btns">
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
      {/*//하단버튼영역*/}
    </>
  );
}

export default TaxonomyList;
