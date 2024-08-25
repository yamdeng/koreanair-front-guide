import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppNavigation from '@/components/common/AppNavigation';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import CommonUtil from '@/utils/CommonUtil';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { create } from 'zustand';
import PSPILoadModal from './PSPILoadModal';
import PSPINewModal from './PSPINewModal';

const now = dayjs();

const initListData = {
  ...listBaseState,
  disablePaging: true,
  listApiPath: 'avn/assurance/spi-spt/indicators',
  baseRoutePath: '/aviation/spi-spt/spiIndicatorList',
};

const initSearchParam = {
  year: '' + now.year(),
  spiType: 'A',
  spiName: '',
};

/* zustand store 생성 */
const SpiIndicatorListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    year: '' + now.year(),
    spiType: 'A',
    spiName: '',
  },

  getSearchParam: () => {
    const { searchParam } = get();
    const { year, spiType, spiName } = searchParam;
    return {
      year: year,
      spiType: spiType,
      spiName: spiName,
    };
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...initSearchParam } });
  },
}));

function SpiIndicatorList() {
  const state = SpiIndicatorListStore();

  const [isPSPILoadModal, setIsPSPILoadModal] = useState(false);
  const [isPSPINewModal, setIsPSPINewModal] = useState(false);

  const handlePSPILoadModal = (selectedValue) => {
    console.log(selectedValue);
    setIsPSPILoadModal(false);
  };
  const handlePSPINewModal = (selectedValue) => {
    console.log(selectedValue);
    setIsPSPINewModal(false);
  };

  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'num', headerName: '순번', cellStyle: { textAlign: 'center' } },
      { field: 'spiTypeKor', headerName: '지표구분', cellStyle: { textAlign: 'center' } },
      { field: 'spiTaxonomyKor', headerName: '지표분류', cellStyle: { textAlign: 'center' } },
      { field: 'outputStndKor', headerName: '산출기준', cellStyle: { textAlign: 'center' } },
      { field: 'spiName', headerName: '지표명' },
      { field: 'spiDescr', headerName: '지표정의' },
      { field: 'cautionPoint', headerName: '주의', cellStyle: { textAlign: 'center' } },
      { field: 'warnPoint', headerName: '경계', cellStyle: { textAlign: 'center' } },
      { field: 'criticalPoint', headerName: '심각', cellStyle: { textAlign: 'center' } },
      { field: 'sptPoint', headerName: 'SPT', cellStyle: { textAlign: 'center' } },
      { field: 'useYn', headerName: '사용여부', cellStyle: { textAlign: 'center' } },
    ])
  );

  const { enterSearch, searchParam, list, goDetailPage, changeSearchInput, initSearchInput, clear } = state;

  const { year, spiType, spiName } = searchParam;

  const customButtons = [
    {
      title: '불러오기',
      onClick: () => {
        setIsPSPILoadModal(true);
      },
    },
    {
      title: '편집',
      onClick: () => {
        setIsPSPINewModal(true);
      },
    },
  ];

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    const codeGrpId = data.codeGrpId;
    goDetailPage(codeGrpId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <AppNavigation />
      {/*경로 */}
      <div className="conts-title">
        <h2>지표관리</h2>
      </div>

      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid20">
            <div className="form-group form-glow">
              <div className="row1">
                <div className="date1">
                  <AppDatePicker
                    label="연도"
                    value={year}
                    onChange={(value) => {
                      changeSearchInput('year', value);
                    }}
                    pickerType="year"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-cell wid20">
            <div className="form-group wid100">
              <AppCodeSelect
                label={'지표구분'}
                codeGrpId="CODE_GRP_113"
                value={spiType}
                onChange={(value) => {
                  changeSearchInput('spiType', value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid30">
            <div className="form-group wid100">
              <AppSearchInput
                label="지표명"
                value={spiName}
                search={enterSearch}
                onChange={(value) => {
                  changeSearchInput('spiName', value);
                }}
              />
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={enterSearch}>
              조회
            </button>
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={clear}>
              초기화
            </button>
          </div>
        </div>
      </div>
      {/* //검색영역 */}

      {/*그리드영역 */}
      <div>
        <AppTable
          rowData={list}
          columns={columns}
          setColumns={setColumns}
          store={state}
          handleRowDoubleClick={handleRowDoubleClick}
          hiddenPagination
          customButtons={customButtons}
        />
      </div>
      {/*//그리드영역 */}
      <PSPILoadModal isOpen={isPSPILoadModal} closeModal={() => setIsPSPILoadModal(false)} ok={handlePSPILoadModal} />
      <PSPINewModal isOpen={isPSPINewModal} closeModal={() => setIsPSPINewModal(false)} ok={handlePSPINewModal} />
    </>
  );
}

export default SpiIndicatorList;
