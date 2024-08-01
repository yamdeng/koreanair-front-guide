import { useEffect, useState, useCallback } from 'react';
import { produce } from 'immer';
import Modal from 'react-modal';
import { Tree } from 'antd';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';

function MemberSelectModal(props) {
  const [treeData, setTreeData] = useState([]);
  const [checkedDeptList, setCheckedDeptList] = useState([]);
  const [userSearchInputValue, setUserSearchInputValue] = useState('');
  const [userList, setUserList] = useState([]);
  const [finalSelectList, setFinalSelectList] = useState([]);
  const { isOpen, closeModal, onlyUserSelect, ok } = props;

  const onSelect = useCallback(
    async (selectedKeys) => {
      const apiParam = { deptCd: selectedKeys[0] };
      const response = await ApiService.get('sys/common/users', apiParam);
      const list = response.data || [];
      list.forEach((listInfo) => {
        listInfo.checked = false;
        listInfo.selectedType = 'U';
      });
      setUserList(list);
    },
    [isOpen, onlyUserSelect]
  );

  const onCheck = useCallback(
    (checkedKeys, treeInfo) => {
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
      const response = await ApiService.get('sys/common/users', apiParam);
      const list = response.data || [];
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
    const response = await ApiService.get('sys/depts', {
      pageNum: 1,
      pageSize: 100000,
    });
    const list = response.data.list;
    const treeData = CommonUtil.listToTreeData(list, 'deptCd', 'upperDeptCd', '0');
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

  const changeUserSearchInputValue = (event) => {
    const value = event.target.value;
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
                <div className="tree_box bg">
                  <Tree
                    className="draggable-tree"
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
                    <input
                      type="text"
                      className="form-tag"
                      name="title"
                      value={userSearchInputValue}
                      onChange={changeUserSearchInputValue}
                    />
                    <label className="f-label">사용자 검색</label>
                    <button type="button" className="icon-sch" onClick={searchUser}></button>
                  </div>
                </div>
                <div className="search-list">
                  <ul className="list">
                    {userList.map((info, index) => {
                      const { nameKor, userId, checked } = info;
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
                                <span className="ck-list">{nameKor}</span>
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
          <div className="">
            <div className="title">사용자</div>
            {userFinalSelectList.map((info) => {
              const { nameKor } = info;
              return (
                <div key={nameKor}>
                  {nameKor} <span onClick={() => deleteFinalListByInfo(info)}>삭제</span>
                </div>
              );
            })}
          </div>
          <div className="">
            <div className="title">부서</div>
            {deptFinalSelectList.map((info) => {
              const { nameKor } = info;
              return (
                <div key={nameKor}>
                  {nameKor} <span onClick={() => deleteFinalListByInfo(info)}>삭제</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pop_btns">
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
            적용
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          {/* <i className="fas fa-times"></i> */}X
        </span>
      </div>
    </Modal>
  );
}

export default MemberSelectModal;
