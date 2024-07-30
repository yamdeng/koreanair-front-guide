import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect } from 'react';
import { create } from 'zustand';
import OrgTreeSelectModal from '@/components/modal/OrgTreeSelectModal';

/* 컬럼 영역 */
const columns: any = [
  { field: 'userId', headerName: '사용자ID' },
  { field: 'empNo', headerName: '사번' },
  { field: 'nameKor', headerName: '사용자명(한국어)' },
  { field: 'nameEng', headerName: '사용자명(영어)' },
  { field: 'nameChn', headerName: '사용자명(중국어)' },
  { field: 'nameJpn', headerName: '사용자명(일본어)' },
  { field: 'nameEtc', headerName: '사용자명(기타)' },
  { field: 'email', headerName: '메일' },
  { field: 'statusCd', headerName: '상태' },
  { field: 'deptId', headerName: '부서ID' },
  { field: 'pstnId', headerName: '직위ID' },
  { field: 'dutyId', headerName: '직책ID' },
  { field: 'rankId', headerName: 'RANK ID' },
  { field: 'photo', headerName: '사진파일 이름' },
  { field: 'sortOrder', headerName: '정렬순서' },
  { field: 'officeTelNo', headerName: '사무실전화번호' },
  { field: 'mobileTelNo', headerName: '핸드폰 번호' },
  { field: 'compCd', headerName: '법인코드' },
  { field: 'subEmpNo', headerName: '부 사번' },
  { field: 'subCompCd', headerName: '파견 법인코드' },
  { field: 'subEmail', headerName: '부 메일주소' },
  { field: 'empType', headerName: '직원구분' },
  { field: 'dsptYn', headerName: '주재원여부' },
  { field: 'jobCd', headerName: '직무코드' },
  { field: 'bareaCd', headerName: '사업장코드' },
  { field: 'eaiYn', headerName: 'EAI연동여부' },
  { field: 'classCd', headerName: 'KE CLASS CODE' },
  { field: 'className', headerName: 'KE CLASS NAME' },
  { field: 'regUserId', headerName: '등록자ID' },
  { field: 'regDttm', headerName: '등록일시' },
  { field: 'updUserId', headerName: '수정자ID' },
  { field: 'updDttm', headerName: '수정일시' },
];

const initListData = {
  ...listBaseState,
  listApiPath: 'sys/users',
  baseRoutePath: '/users',
  columns: columns,
};

/* zustand store 생성 */
const SysUserListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 */
  /* 사번, 이름, 상태, 부서ID, 부서명 */
  searchWord: '',

  /* modal open */
  isDeptSelectModalOpen: false,

  selectedDeptInfo: null,

  handleSelectTreeModalData: (selectedDeptInfo) => {
    set({ selectedDeptInfo: selectedDeptInfo, isDeptSelectModalOpen: false });
  },

  changeModalDisplay: (isOpen) => {
    set({ isDeptSelectModalOpen: isOpen });
  },

  clear: () => {
    set(initListData);
  },
}));

function SysUserList() {
  const state = SysUserListStore();
  const {
    search,
    searchWord,
    list,
    getColumns,
    changeSearchInput,
    goDetailPage,
    handleSelectTreeModalData,
    changeModalDisplay,
    isDeptSelectModalOpen,
    selectedDeptInfo,
    clear,
  } = state;
  const columns = getColumns();

  useEffect(() => {
    search();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>사용자관리</h2>
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={search}>
            조회
          </button>
        </div>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <span className="form-group wid100 mr5">
              <input
                type="text"
                className="form-tag"
                name="title"
                value={searchWord}
                onChange={(event) => {
                  changeSearchInput('searchWord', event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event && event.key === 'Enter') {
                    search();
                  }
                }}
              />
              <label className="f-label">이름</label>
            </span>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100 mr5" onClick={() => changeModalDisplay(true)}>
              <input
                id="firstInput3"
                type="text"
                className="form-tag"
                name="title"
                disabled
                value={selectedDeptInfo ? selectedDeptInfo.nameKor : ''}
              />
              <label className="f-label" htmlFor="firstInput3">
                부서명
              </label>
              <button type="button" className="icon-sch"></button>
            </div>
          </div>
        </div>
      </div>
      <AppTable
        rowData={list}
        columns={columns}
        store={state}
        handleRowDoubleClick={(rowInfo) => {
          const data = rowInfo.data;
          const userId = data.userId;
          goDetailPage(userId);
        }}
      />
      <OrgTreeSelectModal
        isOpen={isDeptSelectModalOpen}
        closeModal={() => {
          changeModalDisplay(false);
        }}
        ok={handleSelectTreeModalData}
      />
    </>
  );
}

export default SysUserList;
