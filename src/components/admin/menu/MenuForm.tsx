import { useEffect } from 'react';
import AppSelect from '@/components/common/AppSelect';
import Code from '@/config/Code';
import { Tree, TreeSelect } from 'antd';
import useSysMenuFormStore from '@/stores/admin/useSysMenuFormStore';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';

function MenuForm() {
  /* formStore state input 변수 */
  const {
    treeWorkScope,
    menuId,
    workScope,
    nameKor,
    nameEng,
    nameChn,
    nameJpn,
    nameEtc,
    treeType,
    upperMenuId,
    sortOrder,
    menuUrl,
    useYn,
    remark,
    errors,
    changeInput,
    formType,
    menuTreeData,
    parentMenuTreeData,
    handleTreeSelect,
    init,
    changeTreeWorkScope,
    changeWorkScope,
    handleParentTreeSelect,
    save,
    remove,
    addMenu,
    clear,
  } = useSysMenuFormStore();

  useEffect(() => {
    init();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메뉴 관리</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <button className="btn-sm btn_text btn-lightblue" onClick={addMenu}>
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
              <Tree
                className="draggable-tree"
                fieldNames={{ title: 'nameKor', key: 'menuId' }}
                treeData={menuTreeData}
                onSelect={handleTreeSelect}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="detail-form">
              <ul className="detail-list">
                <li className="list">
                  <label className="f-label">
                    메뉴ID <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.menuId ? 'form-tag error' : 'form-tag'}
                            placeholder="메뉴ID"
                            name="menuId"
                            id="useSysMenuFormStoremenuId"
                            value={menuId}
                            onChange={(event) => changeInput('menuId', event.target.value)}
                            disabled={formType === FORM_TYPE_UPDATE}
                          />
                          {errors.menuId ? <span className="errorText">{errors.menuId}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">
                    상위메뉴 <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <TreeSelect
                            style={{
                              width: '100%',
                            }}
                            dropdownStyle={{
                              maxHeight: 400,
                              overflow: 'auto',
                            }}
                            treeData={parentMenuTreeData}
                            fieldNames={{ label: 'nameKor', value: 'menuId' }}
                            placeholder="Please select"
                            treeDefaultExpandAll
                            value={upperMenuId}
                            onChange={handleParentTreeSelect}
                          />
                          {errors.menuId ? <span className="errorText">{errors.menuId}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">
                    업무구분 <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <AppSelect
                            style={{ width: '100%', marginBottom: 10 }}
                            id="useSysMenuFormStoreworkScope"
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
                  <label className="f-label">
                    명칭(한국어) <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameKor ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(한국어)"
                            name="nameKor"
                            id="useSysMenuFormStorenameKor"
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
                  <label className="f-label">
                    명칭(영어) <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.nameEng ? 'form-tag error' : 'form-tag'}
                            placeholder="명칭(영어)"
                            name="nameEng"
                            id="useSysMenuFormStorenameEng"
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
                            id="useSysMenuFormStorenameChn"
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
                            id="useSysMenuFormStorenameJpn"
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
                            id="useSysMenuFormStorenameEtc"
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
                  <label className="f-label">
                    구분 <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <AppSelect
                            style={{ width: '100%', marginBottom: 10 }}
                            id="useSysMenuFormStoretreeType"
                            name="treeType"
                            options={Code.menuTreeType}
                            value={treeType}
                            onChange={(appSelectValue) => {
                              changeInput('treeType', appSelectValue);
                            }}
                            placeholder=""
                          />
                          {errors.treeType ? <span className="errorText">{errors.treeType}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">
                    정렬순서 <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.sortOrder ? 'form-tag error' : 'form-tag'}
                            placeholder="정렬순서"
                            name="sortOrder"
                            id="useSysMenuFormStoresortOrder"
                            value={sortOrder}
                            onChange={(event) => changeInput('sortOrder', event.target.value)}
                          />
                          {errors.sortOrder ? <span className="errorText">{errors.sortOrder}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">메뉴URL</label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <input
                            type="text"
                            className={errors.menuUrl ? 'form-tag error' : 'form-tag'}
                            placeholder="메뉴URL"
                            name="menuUrl"
                            id="useSysMenuFormStoremenuUrl"
                            value={menuUrl}
                            onChange={(event) => changeInput('menuUrl', event.target.value)}
                          />
                          {errors.menuUrl ? <span className="errorText">{errors.menuUrl}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list">
                  <label className="f-label">
                    사용여부(Y/N) <span className="required">*</span>
                  </label>
                  <div className="cont">
                    <div className="form-table">
                      <div className="form-cell wid100">
                        <span className="form-group wid100 mr5">
                          <AppSelect
                            style={{ width: '100%', marginBottom: 10 }}
                            id="useSysMenuFormStoreuseYn"
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
                            id="useSysMenuFormStoreremark"
                            value={remark}
                            onChange={(event) => changeInput('remark', event.target.value)}
                          />
                          {errors.remark ? <span className="errorText">{errors.remark}</span> : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          {formType === FORM_TYPE_UPDATE ? '수정' : '등록'}
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType === FORM_TYPE_UPDATE ? '' : 'none' }}
        >
          삭제
        </button>
      </div>
    </>
  );
}
export default MenuForm;
