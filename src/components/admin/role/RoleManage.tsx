import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import MemberSelectModal from '@/components/modal/MemberSelectModal';
import Code from '@/config/Code';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import useSysGroupFormStore from '@/stores/admin/useSysGroupFormStore';
import { Tree, TreeSelect } from 'antd';
import AppTreeSelect from '@/components/common/AppTreeSelect';
import { useEffect } from 'react';
const { SHOW_ALL } = TreeSelect;

function RoleManage() {
  const {
    treeWorkScope,
    formValue,
    errors,
    changeInput,
    changeWorkScope,
    formType,
    virtualGroupList,
    handleTreeSelect,
    selectedGroupCd,
    selectMenuKeyList,
    selectMemberList,
    selectManagerList,
    changeTreeWorkScope,
    save,
    addGroup,
    removeMember,
    removeManager,
    okMemberSelect,
    openMemberSelectModal,
    isMemberSelectModalOpen,
    closeMemberSelectModal,
    onlyUserSelect,
    saveDetail,
    menuTreeData,
    handleMenuTreeSelect,
    removeManagerAll,
    removeMemberAll,
    remove,
    init,
    clear,
  } = useSysGroupFormStore();

  const {
    groupCd,
    workScope,
    nameKor,
    nameEng,
    nameChn,
    nameJpn,
    nameEtc,
    remark,
    useYn,
    groupUsage,
    auditAdminYn,
    reportType,
    groupAdminYn,
  } = formValue;

  useEffect(() => {
    init();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>가상그룹권한관리</h2>
      </div>

      <div className="conts-box">
        <div className="flex-group">
          <div className="tree_wrap Dept">
            <div className="tree_form">
              <div className="btns-area">
                <button name="button" className="btn_text btn_confirm text_color_neutral-10" onClick={addGroup}>
                  추가
                </button>
              </div>
              <div className="form-group wid100">
                <AppSelect
                  options={Code.adminWorkScope}
                  value={treeWorkScope}
                  onChange={(appSelectValue) => {
                    changeTreeWorkScope(appSelectValue);
                  }}
                />
              </div>
            </div>
            {virtualGroupList && virtualGroupList.length ? (
              <Tree
                className="draggable-tree bg"
                fieldNames={{ title: 'nameKor', key: 'groupCd' }}
                treeData={virtualGroupList}
                onSelect={handleTreeSelect}
                selectedKeys={selectedGroupCd ? [selectedGroupCd] : []}
              />
            ) : (
              <div>가상그룹을 추가해주세요.</div>
            )}
          </div>

          <div className="cont_form">
            {/* 그룹상세 폼 */}
            <div className="info-wrap">
              <dl className="tg-item">
                <dt>
                  <button type="button" className="btn-tg">
                    그룹상세 <span className="required"></span>
                  </button>
                </dt>
                <dd className="tg-conts">
                  <div className="edit-area">
                    <div className="editbox tog">
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStoregroupCd"
                              name="groupCd"
                              label="그룹코드"
                              value={groupCd}
                              onChange={(value) => changeInput('groupCd', value)}
                              required
                              disabled={formType === FORM_TYPE_UPDATE}
                              errorMessage={errors.groupCd}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppSelect
                              id="useSysMenuFormStoreworkScope"
                              name="workScope"
                              label="업무구분"
                              options={Code.adminWorkScope}
                              value={workScope}
                              onChange={(appSelectValue) => {
                                changeWorkScope(appSelectValue);
                              }}
                              required
                              disabled={formType === FORM_TYPE_UPDATE}
                              errorMessage={errors.workScope}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStorenameKor"
                              name="nameKor"
                              label="명칭(한국어)"
                              value={nameKor}
                              onChange={(value) => changeInput('nameKor', value)}
                              errorMessage={errors.nameKor}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStorenameEng"
                              name="nameEng"
                              label="명칭(영어)"
                              value={nameEng}
                              onChange={(value) => changeInput('nameEng', value)}
                              errorMessage={errors.nameEng}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStorenameChn"
                              name="nameChn"
                              label="명칭(중국어)"
                              value={nameChn}
                              onChange={(value) => changeInput('nameChn', value)}
                              errorMessage={errors.nameChn}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStorenameJpn"
                              name="nameJpn"
                              label="명칭(일본어)"
                              value={nameJpn}
                              onChange={(value) => changeInput('nameJpn', value)}
                              errorMessage={errors.nameJpn}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStorenameEtc"
                              name="nameEtc"
                              label="명칭(기타)"
                              value={nameEtc}
                              onChange={(value) => changeInput('nameEtc', value)}
                              errorMessage={errors.nameEtc}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStoreremark"
                              name="remark"
                              label="비고"
                              value={remark}
                              onChange={(value) => changeInput('remark', value)}
                              errorMessage={errors.remark}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppSelect
                              id="useSysGroupFormStoreuseYn"
                              name="useYn"
                              options={Code.useYn}
                              label="사용여부(Y/N)"
                              value={useYn}
                              onChange={(value) => changeInput('useYn', value)}
                              required
                              errorMessage={errors.useYn}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppSelect
                              id="useSysGroupFormStoregroupUsage"
                              label="그룹 용도"
                              name="groupUsage"
                              options={Code.groupUsage}
                              value={groupUsage}
                              onChange={(appSelectValue) => {
                                changeInput('groupUsage', appSelectValue);
                              }}
                              required
                              errorMessage={errors.groupUsage}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppSelect
                              id="useSysGroupFormStoreauditAdminYn"
                              name="auditAdminYn"
                              options={Code.useYn}
                              label="Audit(Y/N)"
                              value={auditAdminYn}
                              onChange={(value) => changeInput('auditAdminYn', value)}
                              required
                              errorMessage={errors.auditAdminYn}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppSelect
                              id="useSysGroupFormStoregroupAdminYn"
                              name="groupAdminYn"
                              options={Code.useYn}
                              label="ADMIN(Y/N)"
                              value={groupAdminYn}
                              onChange={(value) => changeInput('groupAdminYn', value)}
                              required
                              errorMessage={errors.groupAdminYn}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysGroupFormStorereportType"
                              name="reportType"
                              label="리포트유형"
                              value={reportType}
                              onChange={(value) => changeInput('reportType', value)}
                              errorMessage={errors.reportType}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dd>
              </dl>
              {/*버튼*/}
              <div className="btns-area">
                <button name="button" className="btn_text btn_confirm text_color_neutral-10" onClick={save}>
                  저장
                </button>
                <button
                  className="btn_text text_color_darkblue-100 btn_close"
                  style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}
                  onClick={remove}
                >
                  삭제
                </button>
              </div>
            </div>

            {/* 권한 적용할 메뉴 */}
            <div className="info-wrap" style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}>
              <dl className="tg-item">
                <dt>
                  <button type="button" className="btn-tg">
                    메뉴 <span className="required"></span>
                  </button>
                </dt>
                <dd className="tg-conts">
                  <div className="edit-area">
                    <div className="boxForm tog">
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTreeSelect
                              showSearch
                              treeNodeFilterProp="nameKor"
                              treeCheckStrictly
                              showCheckedStrategy={SHOW_ALL}
                              treeCheckable
                              treeData={menuTreeData}
                              fieldNames={{ label: 'nameKor', value: 'menuId' }}
                              maxTagCount={10}
                              treeDefaultExpandAll
                              value={selectMenuKeyList}
                              onChange={handleMenuTreeSelect}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>

            {/* 그룹관리자*/}
            <div className="info-wrap" style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}>
              <dl className="tg-item">
                <dt>
                  <button type="button" className="btn-tg">
                    그룹관리자 <span className="required">*</span>
                  </button>
                </dt>
                <dd className="tg-conts">
                  <div className="edit-area">
                    <div className="boxForm tog">
                      {selectManagerList.map((info, index) => {
                        const { nameKor, rankNmKor, deptNmKor } = info;
                        return (
                          <>
                            <div className="form-table">
                              <div className="form-cell wid50">
                                <div className="form-group wid100">
                                  <ul className="list">
                                    <li key={nameKor}>
                                      {nameKor}
                                      {' / '} {rankNmKor} {' / '} {deptNmKor}
                                      <a
                                        href=""
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeManager(index);
                                        }}
                                      >
                                        <span className="delete">X</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <hr className="line"></hr>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </dd>
              </dl>
              <div className="btns-area">
                <button
                  name="button"
                  className="btn_text btn_confirm text_color_neutral-10"
                  onClick={() => openMemberSelectModal('A')}
                >
                  신규
                </button>
                <button
                  name="button"
                  className="btn_text text_color_neutral-90 btn_close"
                  onClick={() => removeManagerAll()}
                >
                  전체삭제
                </button>
              </div>
            </div>
            {/* 그룹멤버 */}
            <div className="info-wrap" style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}>
              <dl className="tg-item">
                <dt>
                  <button type="button" className="btn-tg">
                    그룹멤버 <span className="required">*</span>
                  </button>
                </dt>
                <dd className="tg-conts">
                  <div className="edit-area">
                    <div className="boxForm tog">
                      {selectMemberList.map((info, index) => {
                        const { nameKor, rankNmKor, deptNmKor, selectedType } = info;
                        let displayName = nameKor;
                        if (selectedType === 'U') {
                          displayName = `${nameKor} / ${rankNmKor || ''} / ${deptNmKor || ''}`;
                        }
                        return (
                          <>
                            <div className="form-table">
                              <div className="form-cell wid50">
                                <div className="form-group wid100">
                                  <ul className="list">
                                    <li key={displayName}>
                                      {displayName}{' '}
                                      <a
                                        href=""
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeMember(index);
                                        }}
                                      >
                                        <span className="delete">X</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <hr className="line"></hr>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </dd>
              </dl>
              <div className="btns-area">
                <button
                  name="button"
                  className="btn_text btn_confirm text_color_neutral-10"
                  onClick={() => openMemberSelectModal('M')}
                >
                  신규
                </button>
                <button
                  name="button"
                  className="btn_text text_color_neutral-90 btn_close"
                  onClick={() => removeMemberAll()}
                >
                  전체삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 멤버 선택 모달 */}
      <MemberSelectModal
        isOpen={isMemberSelectModalOpen}
        onlyUserSelect={onlyUserSelect}
        ok={okMemberSelect}
        closeModal={closeMemberSelectModal}
      />

      <div className="contents-btns" style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}>
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={saveDetail}>
          상세 저장
        </button>
      </div>
    </>
  );
}

export default RoleManage;
