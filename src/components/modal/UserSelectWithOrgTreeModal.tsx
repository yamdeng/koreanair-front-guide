import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useCallback, useEffect, useState } from 'react';
import { Tree } from 'antd';
import Modal from 'react-modal';
import { create } from 'zustand';
import AppSearchInput from '../common/AppSearchInput';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';

const initListData = {
  ...listBaseState,
  listApiPath: import.meta.env.VITE_API_URL_USERS,
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
    set({
      ...listBaseState,
      searchParam: {
        searchWord: '',
      },
    });
  },
}));

function UserSelectWithOrgTreeModal(props) {
  const [treeData, setTreeData] = useState([]);
  const { isOpen, closeModal, isMultiple = false, ok } = props;

  const state = SysUserListStore();

  const [columns, setColumns] = useState([
    { field: 'userId', headerName: '사용자ID' },
    { field: 'empNo', headerName: '사번' },
    { field: 'nameKor', headerName: '사용자명(한국어)' },
    { field: 'nameEng', headerName: '사용자명(영어)' },
    { field: 'nameChn', headerName: '사용자명(중국어)' },
    { field: 'nameJpn', headerName: '사용자명(일본어)' },
    { field: 'nameEtc', headerName: '사용자명(기타)' },
    { field: 'email', headerName: '메일' },
    { field: 'statusCd', headerName: '상태' },
    { field: 'deptCd', headerName: '부서코드' },
    { field: 'mobileTelNo', headerName: '핸드폰 번호' },
    { field: 'compCd', headerName: '법인코드' },
  ]);

  const [selectUserList, setSelectUserList] = useState([]);
  const [selectUserInfo, setSelectUserInfo] = useState(null);

  const { enterSearch, searchParam, list, setList, changeSearchInput, initSearchInput, clear } = state;
  const { searchWord } = searchParam;

  const onSelect = useCallback(
    async (selectedKeys) => {
      const apiUrl = import.meta.env.VITE_API_URL_USERS;
      const apiParam = { deptCd: selectedKeys[0], searchWord: searchWord };
      const apiResult = await ApiService.get(apiUrl, apiParam);
      const list = apiResult.data.list;
      list.forEach((listInfo) => {
        listInfo.checked = false;
        listInfo.selectedType = 'U';
      });
      setList(list);
    },
    [isOpen, searchWord]
  );

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    const { data } = selectedInfo;
    if (!isMultiple) {
      ok(data);
    }
  }, []);

  const handleRowSelect = (selectedInfo) => {
    if (isMultiple) {
      setSelectUserList(selectedInfo);
    }
  };

  const handleRowSingleClick = (selectedInfo) => {
    const { data } = selectedInfo;
    if (!isMultiple) {
      setSelectUserInfo(data);
    }
  };

  const handleClose = () => {
    initSearchInput();
    setSelectUserList([]);
    setSelectUserInfo(null);
    clear();
    closeModal();
  };

  const handleOk = () => {
    if (isMultiple) {
      ok(selectUserList);
    } else {
      ok(selectUserInfo);
    }
    clear();
  };

  const getOrgTree = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL_DEPTS;
    const apiResult = await ApiService.get(apiUrl, {
      pageNum: 1,
      pageSize: 100000,
    });
    const list = apiResult.data;
    const treeData = CommonUtil.listToTreeData(list, 'deptCd', 'upperDeptCd', null);
    setTreeData(treeData);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      getOrgTree();
    } else {
      clear();
    }
  }, [isOpen]);

  let saveDisabled = false;
  if (isMultiple) {
    if (!selectUserList || !selectUserList.length) {
      saveDisabled = true;
    }
  } else {
    if (!selectUserInfo) {
      saveDisabled = true;
    }
  }

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'list-common-modal-content'}
      onRequestClose={handleClose}
    >
      <div className="popup-container">
        <h3 className="pop_title">사용자 목록</h3>
        <div className="pop_full_cont_box">
          <div className="pop_flex_group">
            <div className="tree_wrap">
              <Tree
                blockNode
                treeData={treeData}
                checkStrictly
                onSelect={onSelect}
                fieldNames={{ title: 'nameKor', key: 'deptCd' }}
              />
            </div>
            <div className="pop_cont_form">
              <div className="boxForm">
                <div id="" className="area-detail active">
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <span className="form-group wid100 mr5">
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
                </div>
              </div>
              <AppTable
                rowData={list}
                columns={columns}
                enableCheckBox={isMultiple ? true : false}
                handleRowSelect={handleRowSelect}
                handleRowDoubleClick={handleRowDoubleClick}
                handleRowSingleClick={handleRowSingleClick}
                setColumns={setColumns}
              />
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={handleOk} disabled={saveDisabled}>
            확인
          </button>
        </div>
        <span className="pop_close" onClick={handleClose}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default UserSelectWithOrgTreeModal;
