import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppCodeSelect from '@/components/common/AppCodeSelect';

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/general/regulations',
  baseRoutePath: '/occupation/regulations',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  // 제목
  revisionTitle: '',
  // 부문
  sectCd: '',
  // FROM 제정 일자
  fromEnactedDt: '',
  // TO 제정 일자
  toEnactedDt: '',
  // 구분
  formCls: '',
};

/* zustand store 생성 */
const OcuRulesFormListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    // 제목
    revisionTitle: '',
    // 부문
    sectCd: '',
    // FROM 제정 일자
    fromEnactedDt: '',
    // TO 제정 일자
    toEnactedDt: '',
    // 구분
    formCls: '',
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

function OcuRulesFormList() {
  const state = OcuRulesFormListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '번호' },
      { field: 'revisionTitle', headerName: '제목' },
      { field: 'sectNm', headerName: '부문' },
      { field: 'enactedDt', headerName: '제정일자' },
      { field: 'revisionDt', headerName: '개정일자' },
      { field: 'revisionNo', headerName: '개정번호' },
      { field: 'formClsNm', headerName: '구분' },
    ])
  );
  const {
    enterSearch,
    searchParam,
    list,
    goAddPage,
    changeSearchInput,
    //initSearchInput,
    //isExpandDetailSearch,
    //toggleExpandDetailSearch,
    clear,
    goDetailPage,
  } = state;
  // TODO : 검색 파라미터 나열
  const { revisionTitle, sectCd, fromEnactedDt, toEnactedDt, formCls } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    // 규정_지침_매뉴얼_양식_ID
    const detailId = data.rulesFormId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>규정/지침/매뉴얼/양식</h2>
      </div>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-table">
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppSearchInput
                  label="제목"
                  value={revisionTitle}
                  onChange={(value) => {
                    changeSearchInput('revisionTitle', value);
                  }}
                  search={enterSearch}
                />
              </div>
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label={'부문'}
                applyAllSelect="true"
                codeGrpId="CODE_GRP_OC001"
                value={sectCd}
                onChange={(value) => {
                  changeSearchInput('sectCd', value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group form-glow">
              <div className="df">
                <div className="date1">
                  <AppDatePicker
                    label="제정일자"
                    value={fromEnactedDt}
                    onChange={(value) => {
                      changeSearchInput('fromEnactedDt', value);
                    }}
                  />
                </div>
                <span className="unt">~</span>
                <div className="date2">
                  <AppDatePicker
                    label="제정일자"
                    value={toEnactedDt}
                    onChange={(value) => {
                      changeSearchInput('toEnactedDt', value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label="구분"
                value={formCls}
                applyAllSelect="true"
                codeGrpId="CODE_GRP_OC005"
                onChange={(value) => {
                  changeSearchInput('formCls', value);
                }}
                search={enterSearch}
              />
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={enterSearch}>
              조회
            </button>
          </div>
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

export default OcuRulesFormList;
