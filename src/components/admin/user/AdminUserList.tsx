import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useEffect, useState, useCallback } from 'react';
import CommonUtil from '@/utils/CommonUtil';
import { create } from 'zustand';
import AppSearchInput from '@/components/common/AppSearchInput';

const initListData = {
  ...listBaseState,
  listApiPath: 'sys/users',
  baseRoutePath: '/users',
};

/* zustand store 생성 */
const SysUserListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  searchParam: {
    searchWord: '',
  },

  initSearchInput: () => {
    set({
      searchParam: {
        searchWord: '',
      },
    });
  },

  clear: () => {
    set(initListData);
  },
}));

function AdminUserList() {
  const state = SysUserListStore();
  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'userId', headerName: '사용자ID' },
      { field: 'empNo', headerName: '사번' },
      { field: 'nameKor', headerName: '사용자명(한국어)' },
      { field: 'nameEng', headerName: '사용자명(영어)' },
      { field: 'nameChn', headerName: '사용자명(중국어)' },
      { field: 'nameJpn', headerName: '사용자명(일본어)' },
      { field: 'nameEtc', headerName: '사용자명(기타)' },
      { field: 'email', headerName: '메일' },
      { field: 'statusCd', headerName: '상태' },
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
      { field: 'eaiYn', headerName: 'EAI연동여부' },
      { field: 'className', headerName: 'KE CLASS NAME' },
    ])
  );
  const {
    enterSearch,
    searchParam,
    list,
    changeSearchInput,
    initSearchInput,
    isExpandDetailSearch,
    toggleExpandDetailSearch,
    goDetailPage,
    clear,
  } = state;
  const { searchWord } = searchParam;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const data = selectedInfo.data;
    const userId = data.userId;
    goDetailPage(userId);
  }, []);

  useEffect(() => {
    enterSearch();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>사용자관리</h2>
      </div>
      <div className="boxForm">
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
      </div>
      <AppTable
        rowData={list}
        columns={columns}
        setColumns={setColumns}
        store={state}
        handleRowDoubleClick={handleRowDoubleClick}
      />
    </>
  );
}

export default AdminUserList;
