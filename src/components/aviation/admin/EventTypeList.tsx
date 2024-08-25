import AppTable from '@/components/common/AppTable';
import AppNavigation from '@/components/common/AppNavigation';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import Code from '@/config/Code';
import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';

const initListData = {
  ...listBaseState,
  listApiPath: 'avn/admin/criteria/event-types',
  baseRoutePath: '/aviation/eventtype-manage',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  reportType: '',
  eventName: '',
  useYn: '',
  notes: '',
};

/* zustand store 생성 */
const EventTypeListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    reportType: '',
    eventName: '',
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

function EventTypeList() {
  const state = EventTypeListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'eventId', headerName: '순번' },
      { field: 'reportType', headerName: '리포트 구분' },
      { field: 'eventName', headerName: '이벤트명' },
      { field: 'useYn', headerName: '사용여부' },
      { field: 'notes', headerName: '비고' },
      // { field: 'viewOrder', headerName: '표시순서, -1은 표시하지 않음. 0부터 시작' },
      { field: 'regUserId', headerName: '등록자' },
      { field: 'regDttm', headerName: '등록일' },
      { field: 'updUserId', headerName: '수정자' },
      { field: 'updDttm', headerName: '수정일' },
    ])
  );
  const { enterSearch, searchParam, list, goAddPage, changeSearchInput, isExpandDetailSearch, clear, goDetailPage } =
    state;
  // TODO : 검색 파라미터 나열
  const { reportType, eventName, useYn, notes } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    // TODO : 더블클릭시 상세 페이지 또는 모달 페이지 오픈
    console.log(selectedInfo);
    const data = selectedInfo.data;
    const detailId = data.eventId;
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
        <h2>EVENT TYPE 목록</h2>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}>
          <div className="form-table">
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppSelect
                  label="리포트 구분"
                  options={Code.reportType}
                  value={reportType}
                  onChange={(value) => {
                    changeSearchInput('reportType', value);
                  }}
                  search={enterSearch}
                />
              </div>
            </div>

            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppTextInput
                  label="이벤트 명"
                  value={eventName}
                  onChange={(value) => {
                    changeSearchInput('eventName', value);
                  }}
                  search={enterSearch}
                />
              </div>
            </div>

            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppSelect
                  label="사용여부"
                  options={Code.useYn}
                  value={useYn}
                  onChange={(value) => {
                    changeSearchInput('useYn', value);
                  }}
                  search={enterSearch}
                />
              </div>
            </div>

            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppTextInput
                  label="비고"
                  value={notes}
                  onChange={(value) => {
                    changeSearchInput('notes', value);
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

export default EventTypeList;
