import AppTable from '@/components/common/AppTable';
//import AppNavigation from '@/components/common/AppNavigation';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
//import AppSearchInput from '@/components/common/AppSearchInput';
import AppDeptSelectInput from '@/components/common/AppDeptSelectInput';
import AppTextInput from '@/components/common/AppTextInput';
import history from '@/utils/history';
import ApiService from '@/services/ApiService';

const initListData = {
  ...listBaseState,
  listApiPath: 'ocu/general/zeroHzdGoal',
  baseRoutePath: '/occupation/zeroHzdGoal',
};

// TODO : 검색 초기값 설정
const initSearchParam = {
  // 부서
  zeroHzdDeptCd: '',
  // 달성 목표 배수
  completGoalMltp: '',
};

/* zustand store 생성 */
const OcuZeroHzdGoalListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  zeroHzdDeptCdInfo: null,

  changeSearchDeptInfo: (deptInfo) => {
    set({ zeroHzdDeptCdInfo: deptInfo });
  },

  // goAddPage2: () => {

  //   // 내 부서 정보
  //   const deptCd = 'SELDM';

  //   // 등록된 부서 조회

  //   if (deptCd != 'SELDM') {
  //     const { baseRoutePath } = get();
  //     history.push(`${baseRoutePath}/insert`);
  //   } else {
  //     alert('이미 등록된 부서가 존재합니다.');
  //   }
  // },

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    // 부서
    zeroHzdDeptCd: '',
    // 달성 목표 배수
    completGoalMltp: '',
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

function OcuZeroHzdGoalList() {
  const state = OcuZeroHzdGoalListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'zeroHzdDeptCd', headerName: '부서' },
      { field: 'completGoalMltp', headerName: '당성 목표 배수' },
      { field: 'mgntTotGoalDays', headerName: '총 목표 일수' },
      { field: 'mgntStdGoalDays', headerName: '기준 목표 일수' },
      { field: 'mgntCurrGoalDays', headerName: '현 목표 일수' },
      { field: 'mgntglStartDt', headerName: '개시일' },
      { field: 'mgntglCompletGoalDt', headerName: '달성 목표일' },
    ])
  );
  const {
    enterSearch,
    searchParam,
    list,
    // goAddPage,
    //goAddPage2,
    changeSearchInput,
    clear,
    goDetailPage,
    changeSearchDeptInfo,
    zeroHzdDeptCdInfo,
  } = state;
  // TODO : 검색 파라미터 나열
  const { completGoalMltp } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    // 무재해운동 ID
    const detailId = data.zeroHzdId;
    goDetailPage(detailId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  const handleDeptSelectInput = (selectedValue, deptCd) => {
    changeSearchDeptInfo(selectedValue);
    changeSearchInput('zeroHzdDeptCd', deptCd);
  };

  const goAddPage2 = async () => {
    // 내 부서 정보
    const deptCd = 'SELDM';

    // 내가 접속한 정보에 부서가 저장된게 있는지 확인
    const formApiPath = 'ocu/general/selectZeroHzdGoalDupChk';

    // 등록된 부서 조회(중복 체크)
    const apiParam = {
      zeroHzdDeptCd: deptCd,
    };
    const apiResult: any = await ApiService['get'](formApiPath, apiParam, { disableLoadingBar: true });

    if (apiResult.ItemCount > 0) {
      alert('이미 등록된 부서가 존재합니다.');
    } else {
      history.push('/occupation/zeroHzdGoal/insert');
    }
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
        <h2>무재해운동</h2>
      </div>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid-300">
            <div className="form-group wid100">
              <AppDeptSelectInput
                label={'부서'}
                value={zeroHzdDeptCdInfo}
                onChange={(value, deptCd) => {
                  handleDeptSelectInput(value, deptCd);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid-300">
            <div className="form-group wid100">
              <AppTextInput
                label="달성 목표 배수"
                value={completGoalMltp}
                onChange={(value) => {
                  changeSearchInput('completGoalMltp', value);
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
        {/* <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage}>
          신규
        </button> */}
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={goAddPage2}>
          신규
        </button>
      </div>
    </>
  );
}

export default OcuZeroHzdGoalList;
