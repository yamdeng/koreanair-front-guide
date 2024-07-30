import { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';
import { Tree } from 'antd';
import AppSelect from '../common/AppSelect';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';

function OrgTreeSelectModal(props) {
  const [treeData, setTreeData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const { isOpen, closeModal, ok } = props;

  const onSelect = useCallback((selectedKeys, info) => {
    setSelectedInfo(info.node);
  }, []);

  const clear = useCallback(() => {
    setTreeData([]);
    setSelectedInfo(null);
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

  const handleOk = useCallback(() => {
    ok(selectedInfo);
  }, [selectedInfo, ok]);

  useEffect(() => {
    if (isOpen) {
      getOrgTree();
    } else {
      clear();
    }
  }, [isOpen]);

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
          <div className="tree_form">
            <div className="form-cell">
              <div className="form-group wid100 mt30">
                <AppSelect
                  id="select1"
                  style={{ width: '100%' }}
                  className="label-select"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                    {
                      value: 'disabled',
                      label: 'Disabled',
                      disabled: true,
                    },
                  ]}
                />
                <label className="f-label" htmlFor="select1">
                  Sbject <span className="required">*</span>
                </label>
              </div>
            </div>
          </div>
          <div className="tree_box">
            <Tree treeData={treeData} fieldNames={{ title: 'nameKor', key: 'deptCd' }} onSelect={onSelect} />
          </div>
        </div>
        <div className="pop_btns">
          <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
            취소
          </button>
          <button
            className="btn_text text_color_neutral-10 btn_confirm"
            onClick={handleOk}
            disabled={!selectedInfo ? true : false}
          >
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
