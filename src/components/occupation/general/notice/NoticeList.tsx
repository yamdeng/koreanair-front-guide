import AppDatePicker from '@/components/common/AppDatePicker';
import AppSearchInput from '@/components/common/AppSearchInput';
// import AppSelect from '@/components/common/AppSelect';
import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import CommonUtil from '@/utils/CommonUtil';
import { useCallback, useEffect, useState } from 'react';
import { create } from 'zustand';
import AppCodeSelect from '@/components/common/AppCodeSelect';

// /occupation/notice/{id} : 상세
// /occupation/notice/{id}/edit : 폼(등록/수정)

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/general/notice',
  baseRoutePath: '/occupation/notice',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  // 부문
  sectCd: '',
  // FROM 등록일자
  fromRegDttm: '',
  // TO 등록일자
  toRegDttm: '',
  // 검색 구분
  selectType: '',
  // 제목
  noticeTitle: '',
  // 내용
  noticeDetail: '',
};

/* zustand store 생성 */
const NoticeListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  searchParam: {
    // 부문
    sectCd: '',
    // FROM 등록일자
    fromRegDttm: '',
    // TO 등록일자
    toRegDttm: '',
    // 검색 구분
    selectType: '',
    // 제목
    noticeTitle: '',
    // 내용
    noticeDetail: '',
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

function NoticeList() {
  const state = NoticeListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '번호' },
      { field: 'noticeTitle', headerName: '제목' },
      { field: 'sectNm', headerName: '부문' },
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
  const { sectCd, fromRegDttm, toRegDttm, selectType, noticeTitle } = searchParam;

  // 그리드 더블 클릭
  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    // 공지사항 id
    const detailId = data.noticeId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>공지사항</h2>
      </div>
      {/* <div className="boxForm">
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
                  search={enterSearch}
                />
              </span>
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
      </div> */}

      <div className="boxForm">
        {/* <div className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}> */}
        <div className="form-table">
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
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect
                label={'검색 구분'}
                applyAllSelect="true"
                codeGrpId="CODE_GRP_OC002"
                value={selectType}
                onChange={(value) => {
                  changeSearchInput('selectType', value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSearchInput
                label="검색"
                value={noticeTitle}
                onChange={(value) => {
                  changeSearchInput('noticeTitle', value);
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
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button>
      </div>
    </>
  );
}

export default NoticeList;
