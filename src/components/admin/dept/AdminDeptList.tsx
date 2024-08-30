import { useEffect } from 'react';
import { Tree } from 'antd';
import useSysDeptFormStore from '@/stores/admin/useSysDeptFormStore';

function AdminDeptList() {
  const { orgTreeData, getOrgTree, handleTreeSelect, selectedDeptInfo } = useSysDeptFormStore();
  const { deptId, deptCd, nameKor, nameEng, nameChn, nameJpn, nameEtc } = selectedDeptInfo || {};

  useEffect(() => {
    getOrgTree();
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>부서관리</h2>
      </div>
      <div className="conts-box">
        <div className="flex-group">
          <div className="tree_wrap Dept">
            <Tree
              className="draggable-tree"
              blockNode
              fieldNames={{ title: 'nameKor', key: 'deptCd' }}
              treeData={orgTreeData}
              onSelect={handleTreeSelect}
            />
          </div>
          <div className="cont_form">
            <div className="info-wrap">
              <dl className="tg-item">
                {/* <dt>
                  <button type="button" className="btn-tg">
                    부서상세
                  </button>
                </dt> */}
                <dd className="tg-conts">
                  <div className="editbox">
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">부서ID</label>
                                <span className="text-desc">{deptId}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 2행 */}
                    <hr className="line"></hr>
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">명칭(한국어)</label>
                                <span className="text-desc">{nameKor}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="line"></hr>
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">부서코드</label>
                                <span className="text-desc">{deptCd}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3 */}
                    <hr className="line"></hr>
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">명칭(영어)</label>
                                <span className="text-desc">{nameEng}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="line"></hr>
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">명칭(중국어)</label>
                                <span className="text-desc">{nameChn}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="line"></hr>
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">명칭(일본어)</label>
                                <span className="text-desc">{nameJpn}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="line"></hr>
                    <div className="form-table">
                      <div className="form-cell wid50">
                        <div className="form-group wid100">
                          <div className="box-view-list">
                            <ul className="view-list">
                              <li className="accumlate-list">
                                <label className="t-label">
                                  명칭(기타)
                                  <span className="required">*</span>
                                </label>
                                <span className="text-desc">{nameEtc}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDeptList;
