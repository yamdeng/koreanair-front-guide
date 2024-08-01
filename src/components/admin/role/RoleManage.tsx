import AppSelect from '@/components/common/AppSelect';
import Code from '@/config/Code';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import useSysGroupFormStore from '@/stores/admin/useSysGroupFormStore';
import { Tree, TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;
import { useEffect } from 'react';
import MemberSelectModal from '@/components/modal/MemberSelectModal';

function RoleManage() {
  const {
    groupCd,
    treeWorkScope,
    workScope,
    nameKor,
    nameEng,
    nameChn,
    nameJpn,
    nameEtc,
    remark,
    useYn,
    groupUsage,
    errors,
    changeInput,
    changeWorkScope,
    formType,
    virtualGroupList,
    handleTreeSelect,
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
    remove,
    init,
    clear,
  } = useSysGroupFormStore();

  useEffect(() => {
    init();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>가상그룹권한관리</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <button className="btn-sm btn_text btn-lightblue" onClick={addGroup}>
              추가
            </button>
            <div className="tree_wrap">
              <AppSelect
                style={{ width: '100%', marginBottom: 10 }}
                options={Code.adminWorkScope}
                value={treeWorkScope}
                onChange={(appSelectValue) => {
                  changeTreeWorkScope(appSelectValue);
                }}
                placeholder=""
              />
              {virtualGroupList && virtualGroupList.length ? (
                <Tree
                  className="draggable-tree"
                  fieldNames={{ title: 'nameKor', key: 'menuId' }}
                  treeData={virtualGroupList}
                  onSelect={handleTreeSelect}
                />
              ) : (
                <div>가상그룹을 추가해주세요.</div>
              )}
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="detail-form">
              <ul className="detail-list">
                <li className="list">
                  <label className="f-label">
                    그룹코드 <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.groupCd ? 'form-tag error' : 'form-tag'}
                            placeholder="그룹코드"
                            name="groupCd"
                            id="useSysGroupFormStoregroupCd"
                            value={groupCd}
                            onChange={(event) => changeInput('groupCd', event.target.value)}
                            disabled={formType === FORM_TYPE_UPDATE}
                          />
                          {errors.groupCd ? <span className="errorText">{errors.groupCd}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">업무구분</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <AppSelect
                            style={{ width: '100%', marginBottom: 10 }}
                            id="useSysGroupFormStoreworkScope"
                            name="workScope"
                            options={Code.adminWorkScope}
                            value={workScope}
                            onChange={(appSelectValue) => {
                              changeWorkScope(appSelectValue);
                            }}
                            placeholder=""
                            disabled={formType === FORM_TYPE_UPDATE}
                          />
                          {errors.workScope ? <span className="errorText">{errors.workScope}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">명칭(한국어)</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameKor ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(한국어)"
                            name="nameKor"
                            id="useSysGroupFormStorenameKor"
                            value={nameKor}
                            onChange={(event) => changeInput('nameKor', event.target.value)}
                          />
                          {errors.nameKor ? <span className="errorText">{errors.nameKor}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">명칭(영어)</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameEng ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(영어)"
                            name="nameEng"
                            id="useSysGroupFormStorenameEng"
                            value={nameEng}
                            onChange={(event) => changeInput('nameEng', event.target.value)}
                          />
                          {errors.nameEng ? <span className="errorText">{errors.nameEng}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">명칭(중국어)</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameChn ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(중국어)"
                            name="nameChn"
                            id="useSysGroupFormStorenameChn"
                            value={nameChn}
                            onChange={(event) => changeInput('nameChn', event.target.value)}
                          />
                          {errors.nameChn ? <span className="errorText">{errors.nameChn}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">명칭(일본어)</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameJpn ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(일본어)"
                            name="nameJpn"
                            id="useSysGroupFormStorenameJpn"
                            value={nameJpn}
                            onChange={(event) => changeInput('nameJpn', event.target.value)}
                          />
                          {errors.nameJpn ? <span className="errorText">{errors.nameJpn}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">명칭(기타)</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameEtc ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(기타)"
                            name="nameEtc"
                            id="useSysGroupFormStorenameEtc"
                            value={nameEtc}
                            onChange={(event) => changeInput('nameEtc', event.target.value)}
                          />
                          {errors.nameEtc ? <span className="errorText">{errors.nameEtc}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">비고</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.remark ? 'form-tag error' : 'form-tag'}
                            placeholder="비고"
                            name="remark"
                            id="useSysGroupFormStoreremark"
                            value={remark}
                            onChange={(event) => changeInput('remark', event.target.value)}
                          />
                          {errors.remark ? <span className="errorText">{errors.remark}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">사용여부</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <AppSelect
                            style={{ width: '100%', marginBottom: 10 }}
                            id="useSysGroupFormStoreuseYn"
                            name="useYn"
                            options={Code.useYn}
                            value={useYn}
                            onChange={(appSelectValue) => {
                              changeInput('useYn', appSelectValue);
                            }}
                            placeholder=""
                          />
                          {errors.useYn ? <span className="errorText">{errors.useYn}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">그룹 용도</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <AppSelect
                            style={{ width: '100%', marginBottom: 10 }}
                            id="useSysGroupFormStoregroupUsage"
                            name="groupUsage"
                            options={Code.groupUsage}
                            value={groupUsage}
                            onChange={(appSelectValue) => {
                              changeInput('groupUsage', appSelectValue);
                            }}
                            placeholder=""
                          />
                          {errors.groupUsage ? <span className="errorText">{errors.groupUsage}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* 하단 버튼 영역 */}
            <div className="contents-btns">
              <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
                저장
              </button>
            </div>

            <div style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }} className="detail-form">
              <ul className="detail-list">
                <li className="list">
                  <TreeSelect
                    style={{
                      width: '100%',
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: 'auto',
                    }}
                    treeCheckable
                    showCheckedStrategy={SHOW_PARENT}
                    treeData={menuTreeData}
                    fieldNames={{ label: 'nameKor', value: 'menuId' }}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    value={selectMenuKeyList}
                    onChange={handleMenuTreeSelect}
                  />
                </li>
              </ul>

              <div style={{ padding: 5, fontWeight: 'bold' }}>
                관리자 선택 영역 <span onClick={() => openMemberSelectModal('A')}>추가</span>
              </div>
              <ul className="detail-list">
                {selectManagerList.map((info, index) => {
                  const { nameKor } = info;
                  return (
                    <li key={nameKor} className="list">
                      {nameKor}{' '}
                      <div style={{ marginLeft: 5 }} onClick={() => removeManager(index)}>
                        삭제
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div style={{ padding: 5, fontWeight: 'bold' }}>
                멤버 선택 영역 <span onClick={() => openMemberSelectModal('M')}>추가</span>
              </div>
              <ul className="detail-list">
                {selectMemberList.map((info, index) => {
                  const { nameKor } = info;
                  return (
                    <li key={nameKor} className="list">
                      {nameKor}{' '}
                      <div style={{ marginLeft: 5 }} onClick={() => removeMember(index)}>
                        삭제
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <MemberSelectModal
              isOpen={isMemberSelectModalOpen}
              onlyUserSelect={onlyUserSelect}
              ok={okMemberSelect}
              closeModal={closeMemberSelectModal}
            />

            <div className="contents-btns" style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}>
              <button className="btn_text text_color_neutral-10 btn_confirm" onClick={saveDetail}>
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoleManage;
