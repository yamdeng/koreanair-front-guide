import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppSearchInput from '@/components/common/AppSearchInput';
//import AppTextInput from '@/components/common/AppTextInput';
//import AppSelect from '@/components/common/AppSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppCodeSelect from '@/components/common/AppCodeSelect';

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/general/committee',
  baseRoutePath: '/occupation/committee',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  // 제목
  title: '',
  // 부문
  sectCd: '',
  // FROM 등록일자
  fromRegDttm: '',
  // TO 등록일자
  toRegDttm: '',
};

/* zustand store 생성 */
const OcuCommitteeListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    // 제목
    title: '',
    // 부문
    sectCd: '',
    // FROM 등록일자
    fromRegDttm: '',
    // TO 등록일자
    toRegDttm: '',
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

function OcuCommitteeList() {
  const state = OcuCommitteeListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '번호' },
      { field: 'sectNm', headerName: '부문' },
      { field: 'title', headerName: '제목' },
      { field: 'regDttm', headerName: '등록일자' },
    ])
  );
  const {
    enterSearch,
    searchParam,
    list,
    goAddPage,
    goDetailPage,
    changeSearchInput,
    //initSearchInput,
    // isExpandDetailSearch,
    // toggleExpandDetailSearch,
    clear,
  } = state;
  // TODO : 검색 파라미터 나열
  const { title, sectCd, fromRegDttm, toRegDttm } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    // 산업안전보건위원회 id
    console.log('data.ocuCommitId===>', data.ocuCommitId);
    const detailId = data.ocuCommitId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>산업안전보건위원회</h2>
      </div>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-table">
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppSearchInput
                  label="제목"
                  value={title}
                  onChange={(value) => {
                    changeSearchInput('title', value);
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
                    label="등록일자"
                    value={fromRegDttm}
                    onChange={(value) => {
                      changeSearchInput('fromRegDttm', value);
                    }}
                  />
                </div>
                <span className="unt">~</span>
                <div className="date2">
                  <AppDatePicker
                    label="등록일자"
                    value={toRegDttm}
                    onChange={(value) => {
                      changeSearchInput('toRegDttm', value);
                    }}
                  />
                </div>
              </div>
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

export default OcuCommitteeList;
