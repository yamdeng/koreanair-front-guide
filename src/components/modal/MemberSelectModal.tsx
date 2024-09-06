import { useEffect, useState, useCallback } from 'react';
import { produce } from 'immer';
import Modal from 'react-modal';
import { Tree } from 'antd';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import AppSearchInput from '../common/AppSearchInput';

function MemberSelectModal(props) {
  const [treeData, setTreeData] = useState([]);
  const [checkedDeptList, setCheckedDeptList] = useState([]);
  const [userSearchInputValue, setUserSearchInputValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [finalSelectList, setFinalSelectList] = useState([]);
  const { isOpen, closeModal, onlyUserSelect, ok } = props;

  const onSelect = useCallback(
    async (selectedKeys) => {
      const apiUrl = import.meta.env.VITE_API_URL_USERS;
      const apiParam = { deptCd: selectedKeys[0] };
      const response = await ApiService.get(apiUrl, apiParam);
      const list = response.data.list;
      list.forEach((listInfo) => {
        listInfo.checked = false;
        listInfo.selectedType = 'U';
      });
      setUserList(list);
    },
    [isOpen, onlyUserSelect]
  );

  const onCheck = useCallback(
    (checkedInfo, treeInfo) => {
      const deptList = treeInfo.checkedNodes || [];
      deptList.forEach((listInfo) => {
        listInfo.selectedType = 'D';
      });
      setCheckedDeptList(deptList);
    },
    [isOpen, onlyUserSelect]
  );

  const searchUser = async () => {
    if (userSearchInputValue) {
      const apiParam = { searchWord: userSearchInputValue };
      const apiUrl = import.meta.env.VITE_API_URL_USERS;
      const response = await ApiService.get(apiUrl, apiParam);
      const list = response.data.list;
      list.forEach((listInfo) => {
        listInfo.checked = false;
        listInfo.selectedType = 'U';
      });
      setUserList(list);
    } else {
      alert('검색어를 입력해주세요.');
    }
  };

  const clear = useCallback(() => {
    setTreeData([]);
    setCheckedDeptList([]);
    setUserSearchInputValue('');
    setUserList([]);
    setFinalSelectList([]);
  }, []);

  const getOrgTree = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL_DEPTS;
    const apiResult = await ApiService.get(apiUrl, {
      pageNum: 1,
      pageSize: 100000,
    });
    const list = apiResult.data;
    const treeData = CommonUtil.listToTreeData(list, 'deptCd', 'upperDeptCd', null);
    setTreeData(treeData);
  }, []);

  const moveSelectedArea = useCallback(() => {
    const checkedUserList = userList.filter((info) => info.checked);
    const selectAllList = [...checkedUserList, ...checkedDeptList];
    const filterAllList = selectAllList.filter((info) => {
      const searchFinalInfo = finalSelectList.find((finalInfo) => {
        if (finalInfo.selectedType === 'U') {
          return info.userId === finalInfo.userId;
        } else {
          return info.deptCd === finalInfo.deptCd;
        }
      });
      if (!searchFinalInfo) {
        return true;
      }
      return false;
    });

    setFinalSelectList([...filterAllList, ...finalSelectList]);
  }, [checkedDeptList, userList]);

  const changeUserSearchInputValue = (value) => {
    setUserSearchInputValue(value);
  };

  const save = useCallback(() => {
    ok(finalSelectList);
    closeModal();
  }, [finalSelectList]);

  const changeUserListChecked = (event, index) => {
    const checked = event.target.checked;
    const newUserList = produce(userList, (draft) => {
      draft[index].checked = checked;
    });
    setUserList(newUserList);
  };

  const deleteFinalListByInfo = (deleteInfo) => {
    let searchIndex = -1;
    if (deleteInfo.selectedType === 'U') {
      searchIndex = finalSelectList.findIndex((finalInfo) => finalInfo.userId === deleteInfo.userId);
    } else {
      searchIndex = finalSelectList.findIndex((finalInfo) => finalInfo.deptCd === deleteInfo.deptCd);
    }
    const newFinalSelectList = produce(finalSelectList, (draft) => {
      draft.splice(searchIndex, 1);
    });
    setFinalSelectList(newFinalSelectList);
  };

  const deleteAllFinalList = () => {
    setFinalSelectList([]);
  };

  useEffect(() => {
    if (isOpen) {
      getOrgTree();
    } else {
      clear();
    }
  }, [isOpen]);

  const checkedKeys = checkedDeptList.map((info) => info.deptCd);
  const userFinalSelectList = finalSelectList.filter((info) => info.selectedType === 'U');
  const deptFinalSelectList = finalSelectList.filter((info) => info.selectedType === 'D');

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'list-common-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">제목</h3>
        <div className="user-checkbox">
          <div className="checklist">
            <div className="listbox">
              <div className="tree_wrap tree-right-space">
                <div className="tree_box bg" style={{ height: '35rem' }}>
                  <Tree
                    blockNode
                    checkedKeys={checkedKeys}
                    treeData={treeData}
                    multiple={onlyUserSelect ? false : false}
                    checkable={onlyUserSelect ? false : true}
                    checkStrictly
                    onSelect={onSelect}
                    onCheck={onCheck}
                    fieldNames={{ title: 'nameKor', key: 'deptCd' }}
                  />
                </div>
              </div>
            </div>
            <div className="search_box">
              <div className="search">
                <div className="form-cell mb20">
                  <div className="form-group wid100">
                    <AppSearchInput
                      label="사용자 검색"
                      search={searchUser}
                      value={userSearchInputValue}
                      onChange={changeUserSearchInputValue}
                    />
                  </div>
                </div>
                <div className="search-list">
                  <ul className="list">
                    {userList.map((info, index) => {
                      const { nameKor, rankNmKor, deptNmKor, userId, checked } = info;
                      return (
                        <li key={userId}>
                          <div className="form-cell">
                            <div className="chk-wrap">
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={(event) => changeUserListChecked(event, index)}
                                  checked={checked}
                                />
                                <span className="ck-list">
                                  {nameKor} / {rankNmKor} / {deptNmKor}
                                </span>
                              </label>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="checkbutton">
            <button onClick={moveSelectedArea}></button>
          </div>
          <div className="selectlist">
            <div className="title">
              <p>
                선택목록
                <a
                  className="icon"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAllFinalList();
                  }}
                >
                  <span></span>
                </a>
              </p>
            </div>
            <div
              className="uesrlist"
              style={{ display: userFinalSelectList && userFinalSelectList.length ? '' : 'none' }}
            >
              <p className="stitle">사용자 목록</p>
              <ul className="list">
                {userFinalSelectList.map((info) => {
                  const { nameKor } = info;
                  return (
                    <li key={nameKor}>
                      {nameKor}
                      <a href="" onClick={(e) => e.preventDefault()}>
                        <span className="delete" onClick={() => deleteFinalListByInfo(info)}>
                          X
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className="departmentlist"
              style={{ display: deptFinalSelectList && deptFinalSelectList.length ? '' : 'none' }}
            >
              <div className="stitle">부서 목록</div>
              <ul className="list">
                {deptFinalSelectList.map((info) => {
                  const { nameKor } = info;
                  return (
                    <li key={nameKor}>
                      {nameKor}
                      <a href="" onClick={(e) => e.preventDefault()}>
                        <span className="delete" onClick={() => deleteFinalListByInfo(info)}>
                          X
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="pop_btns">
          <button
            className="btn_text text_color_neutral-10 btn_confirm"
            onClick={save}
            disabled={!finalSelectList || !finalSelectList.length}
          >
            적용
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default MemberSelectModal;
