import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
//import AppSearchInput from '@/components/common/AppSearchInput';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppCodeSelect from '@/components/common/AppCodeSelect';
//import AppAutoComplete from '@/components/common/AppAutoComplete';
import AppDeptSelectInput from '@/components/common/AppDeptSelectInput';

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/general/hsCommittee',
  baseRoutePath: '/occupation/hsCommittee',
};

// 현재 연도
const currentYear = new Date().getFullYear().toString();

// TODO : 검색 초기값 설정
const initSearchParam = {
  // 실시 년도
  advCmitImplmYY: currentYear,
  // 실시 연월
  advCmitImplmYm: '',
  // 본부 코드
  advCmitSectCd: '',
  // 부서 코드
  advCmitDeptCd: '',
  // 조회 구분 값(A: 현황, B: 목록)
  activeTab: '',
};

/* zustand store 생성 */
const OcuHsCommitteeListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  advCmitDeptInfo: null,

  changeSearchDeptInfo: (deptInfo) => {
    set({ advCmitDeptInfo: deptInfo });
  },

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    // 실시 년도 (현재년도)
    advCmitImplmYY: currentYear,
    // 실시 연월
    advCmitImplmYm: '',
    // 본부 코드
    advCmitSectCd: '',
    // 부서 코드
    advCmitDeptCd: '',

    // 조회 구분 값(A: 현황, B: 목록)
    activeTab: 'A',
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

function OcuHsCommitteeList() {
  const state = OcuHsCommitteeListStore();

  const [activeTab, setActiveTab] = useState('A');

  const {
    enterSearch,
    searchParam,
    list,
    goAddPage,
    goDetailPage,
    changeSearchInput,
    // initSearchInput,
    // isExpandDetailSearch,
    // toggleExpandDetailSearch,
    changeSearchDeptInfo,
    advCmitDeptInfo,
    clear,
  } = state;
  // TODO : 검색 파라미터 나열
  const { advCmitImplmYm, advCmitSectCd, advCmitImplmYY } = searchParam;

  // // 현황
  // if (activeTab === 'A') {
  //   // 검색조건 초기화(현재 연도)
  //   searchParam.advCmitImplmYm = currentYear;
  //   // 목록
  // } else {
  //   // 검색조건 초기화(현재 연도월)
  //   searchParam.advCmitImplmYm = '';
  // }

  // A: 현황, B: 목록
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '번호' },
      { field: 'advCmitImplmYm', headerName: '해당연도' },
      { field: 'advCmitSectNm', headerName: '부문' },
      { field: 'advCmitDeptCd', headerName: '부서' },
      { field: 'advCmitDeptCd', headerName: '팀' },
      { field: 'advCmitDeptCd', headerName: '그룹' },
      { field: 'month1', headerName: '1월' },
      { field: 'month2', headerName: '2월' },
      { field: 'month3', headerName: '3월' },
      { field: 'month4', headerName: '4월' },
      { field: 'month5', headerName: '5월' },
      { field: 'month6', headerName: '6월' },
      { field: 'month7', headerName: '7월' },
      { field: 'month8', headerName: '8월' },
      { field: 'month9', headerName: '9월' },
      { field: 'month10', headerName: '10월' },
      { field: 'month11', headerName: '11월' },
      { field: 'month12', headerName: '12월' },
    ])
  );

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    // 안전보건협의체_ID
    const detailId = data.advCmitId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  // function TestComponent(rowData) {
  //   console.log('params@@==>', rowData);

  //   //return <button type="button">Click Me</button>;

  //   return <button type="button">보기</button>;

  //   // const { codeGrpId, onClick } = params;

  //   // return (
  //   //   <button type="button" onClick={() => onClick('팝업')}>
  //   //     회의록
  //   //   </button>
  //   // );
  // }

  const selectFile = (params) => {
    console.log('params==>', params);
    //alert('여기2' + params);
  };

  // 현황, 목록 탭 클릭 이벤트
  const tabClick = (tabName) => {
    setActiveTab(tabName);
    // 현황 탭
    searchParam.activeTab = tabName;

    // 현재년도

    // 현재월

    // 검색조건 초기화(연도)
    //searchParam.advCmitImplmYm = '';
    // 검색조건 초기화(부문)
    searchParam.advCmitSectNm = '';
    // 검색조건 초기화(부서)
    searchParam.advCmitDeptCd = '';

    // 현황
    if (tabName === 'A') {
      setColumns(
        CommonUtil.mergeColumnInfosByLocal([
          { field: 'num', headerName: '번호' },
          { field: 'advCmitImplmYm', headerName: '해당연도' },
          { field: 'advCmitSectNm', headerName: '부문' },
          { field: 'advCmitDeptCd', headerName: '부서' },
          { field: 'advCmitDeptCd', headerName: '팀' },
          { field: 'advCmitDeptCd', headerName: '그룹' },
          { field: 'month1', headerName: '1월' },
          { field: 'month2', headerName: '2월' },
          { field: 'month3', headerName: '3월' },
          { field: 'month4', headerName: '4월' },
          { field: 'month5', headerName: '5월' },
          { field: 'month6', headerName: '6월' },
          { field: 'month7', headerName: '7월' },
          { field: 'month8', headerName: '8월' },
          { field: 'month9', headerName: '9월' },
          { field: 'month10', headerName: '10월' },
          { field: 'month11', headerName: '11월' },
          { field: 'month12', headerName: '12월' },
        ])
      );
      // 목록
    } else {
      setColumns(
        CommonUtil.mergeColumnInfosByLocal([
          { field: 'num', headerName: '번호' },
          { field: 'advCmitImplmYm', headerName: '실시연월' },
          { field: 'advCmitSectNm', headerName: '부문' },
          { field: 'advCmitDeptCd', headerName: '부서' },
          { field: 'advCmitDeptCd', headerName: '팀' },
          { field: 'advCmitDeptCd', headerName: '그룹' },
          { field: 'regUserId', headerName: '작성자' },
          {
            field: 'prcDnFileId',
            headerName: '회의록',
            //cellRenderer: TestComponent(),
            // cellRendererParams: {
            //   codeGrpId: 'CODE_GRP_009',
            //   onClick: (value) => alert(value),
            //
            // },

            cellRenderer: (params) => {
              return <button onClick={() => selectFile(params)}>보기</button>;
            },
          },
        ])
      );
    }

    enterSearch();
    //celnoos.log('state==>', state.list);
    //state.list = null;
  };

  // 년도 필수 체크
  const validCheck = () => {
    if (searchParam.activeTab === 'A') {
      // 해당연도 필수 체크
      if (searchParam.advCmitImplmYY == '') {
        alert('검색조건 해당연도는 필수 입니다.');
        return false;
      }
    }
    enterSearch();
  };

  const handleDeptSelectInput = (selectedValue, deptCd) => {
    changeSearchDeptInfo(selectedValue);
    changeSearchInput('advCmitDeptCd', deptCd);
  };

  return (
    <>
      {/*경로 */}
      <div className="Breadcrumb">
        <ol>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">홈</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">안전관리</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">위험기계기구</a>
          </li>
        </ol>
      </div>
      {/*경로 */}
      <div className="conts-title">
        <h2>안전보건협의체</h2>
      </div>
      {/*탭 */}
      <div className="menu-tab-nav">
        <div className="menu-tab">
          <a
            href="javascript:void(0);"
            className={activeTab === 'A' ? 'active' : ''} // activeTab 상태에 따라 className을 동적으로 설정합니다.
            data-label="현황"
            onClick={(e) => {
              e.preventDefault(); // 페이지 이동을 막습니다.
              tabClick('A');
            }}
          >
            현황
          </a>
          <a
            href="javascript:void(0);"
            className={activeTab === 'B' ? 'active' : ''} // activeTab 상태에 따라 className을 동적으로 설정합니다.
            data-label="목록"
            onClick={(e) => {
              e.preventDefault(); // 페이지 이동을 막습니다.
              tabClick('B');
            }}
          >
            목록
          </a>
        </div>
      </div>
      {/*//탭 */}
      {/*검색영역 */}
      <div className="boxForm">
        {/*area-detail명 옆에 active  */}
        <div className="area-detail active">
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppDatePicker
                  label={activeTab === 'A' ? '해당연도' : '실시연월'}
                  pickerType={activeTab === 'A' ? 'year' : 'month'}
                  // pickerType="year"
                  // value={advCmitImplmYm}
                  value={activeTab === 'A' ? advCmitImplmYY : advCmitImplmYm}
                  // onChange={(value) => {
                  //   changeSearchInput('advCmitImplmYm', value);
                  // }}
                  onChange={(value) => {
                    {
                      activeTab === 'A'
                        ? changeSearchInput('advCmitImplmYY', value)
                        : changeSearchInput('advCmitImplmYm', value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppCodeSelect
                  applyAllSelect="true"
                  label={'부문'}
                  codeGrpId="CODE_GRP_OC001"
                  value={advCmitSectCd}
                  onChange={(value) => {
                    changeSearchInput('advCmitSectCd', value);
                  }}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                {/* <AppAutoComplete */}
                <AppDeptSelectInput
                  label={'부서'}
                  value={advCmitDeptInfo}
                  onChange={(value, deptCd) => {
                    handleDeptSelectInput(value, deptCd);
                  }}
                />
              </div>
            </div>
            <div className="btn-area">
              {/* <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={enterSearch}> */}
              <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={validCheck}>
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppTable
        // activeTab === 'B' ? 'active' : ''
        rowData={list}
        columns={columns}
        setColumns={setColumns}
        store={state}
        className={activeTab === 'A' ? 'active' : ''}
        handleRowDoubleClick={activeTab === 'A' ? '' : handleRowDoubleClick}
        // customButtons="1,버튼"
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

export default OcuHsCommitteeList;
