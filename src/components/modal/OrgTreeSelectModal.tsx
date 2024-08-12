import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import { Tree } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';

function OrgTreeSelectModal(props) {
  const [checkedDeptList, setCheckedDeptList] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const { isOpen, closeModal, ok, isMultiple = false } = props;

  const onSelect = useCallback((selectedKeys, info) => {
    setSelectedInfo(info.node);
  }, []);

  const onCheck = useCallback(
    (checkedKeys, treeInfo) => {
      const deptList = treeInfo.checkedNodes || [];
      deptList.forEach((listInfo) => {
        listInfo.selectedType = 'D';
      });
      setCheckedDeptList(deptList);
    },
    [isOpen, isMultiple]
  );

  const clear = useCallback(() => {
    setTreeData([]);
    setSelectedInfo(null);
    setCheckedDeptList([]);
  }, []);

  const getOrgTree = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL_DEPTS;
    const apiResult = await ApiService.get(apiUrl, {
      pageNum: 1,
      pageSize: 100000,
    });
    const list = apiResult.data;
    const treeData = CommonUtil.listToTreeData(list, 'deptCd', 'upperDeptCd', '0');
    setTreeData(treeData);
  }, []);

  const handleOk = useCallback(() => {
    if (isMultiple) {
      ok(checkedDeptList);
    } else {
      ok(selectedInfo);
    }
    clear();
  }, [selectedInfo, checkedDeptList, isMultiple, ok]);

  useEffect(() => {
    if (isOpen) {
      getOrgTree();
    }
  }, [isOpen]);

  let saveDisabled = false;
  if (isMultiple) {
    if (!checkedDeptList || !checkedDeptList.length) {
      saveDisabled = true;
    }
  } else {
    if (!selectedInfo) {
      saveDisabled = true;
    }
  }

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'alert-modal-overlay'}
      className={'alert-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">제목</h3>
        <div className="tree_wrap tree-right-space">
          <div className="tree_box">
            <Tree
              checkStrictly
              multiple={isMultiple}
              checkable={isMultiple}
              treeData={treeData}
              fieldNames={{ title: 'nameKor', key: 'deptCd' }}
              onSelect={onSelect}
              onCheck={onCheck}
            />
          </div>
        </div>
        <div className="pop_btns">
          <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
            취소
          </button>
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={handleOk} disabled={saveDisabled}>
            확인
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default OrgTreeSelectModal;
