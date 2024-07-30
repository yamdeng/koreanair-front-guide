import { useEffect } from 'react';
import { Tree } from 'antd';
import useSysDeptFormStore from '@/stores/admin/useSysDeptFormStore';

function AdminDeptList() {
  const { orgTreeData, getOrgTree, handleTreeSelect, selectedDeptInfo } = useSysDeptFormStore();
  const { deptCd, nameKor, nameEng, nameChn, nameJpn, nameEtc, fullPath } = selectedDeptInfo || {};

  useEffect(() => {
    getOrgTree();
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>부서관리</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="tree_wrap">
              <Tree
                className="draggable-tree"
                blockNode
                fieldNames={{ title: 'nameKor', key: 'deptCd' }}
                treeData={orgTreeData}
                onSelect={handleTreeSelect}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="detail-form">
              <ul className="detail-list">
                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">부서코드</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{deptCd}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">명칭(한국어)</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{nameKor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">명칭(영어)</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{nameEng}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">명칭(중국어)</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{nameChn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">명칭(일본어)</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{nameJpn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">명칭(기타)</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{nameEtc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list">
                  <div className="list-row wid50">
                    <label className="f-label">전체경로</label>
                    <div className="cont">
                      <div className="form-table">
                        <div className="form-cell wid100">
                          <span className="form-group wid100">{fullPath}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDeptList;
