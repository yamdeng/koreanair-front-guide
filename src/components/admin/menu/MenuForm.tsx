import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import AppTreeSelect from '@/components/common/AppTreeSelect';
import Code from '@/config/Code';
import { FORM_TYPE_UPDATE } from '@/config/CommonConstant';
import useSysMenuFormStore from '@/stores/admin/useSysMenuFormStore';
import { Tree } from 'antd';
import { useEffect } from 'react';

function MenuForm() {
  /* formStore state input 변수 */
  const {
    treeWorkScope,
    formValue,
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

  const {
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
  } = formValue;

  useEffect(() => {
    init();
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>메뉴 관리</h2>
      </div>

      <div className="conts-box">
        <div className="flex-group">
          <div className="tree_wrap Dept">
            <div className="tree_form">
              <div className="btns-area">
                <button name="button" className="btn_text btn_confirm text_color_neutral-10" onClick={addMenu}>
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
            <Tree
              className="draggable-tree bg"
              fieldNames={{ title: 'nameKor', key: 'menuId' }}
              treeData={menuTreeData}
              onSelect={handleTreeSelect}
            />
          </div>
          <div className="cont_form">
            <div className="info-wrap">
              <dl className="tg-item">
                <dd className="tg-conts">
                  <div className="edit-area">
                    <div className="editbox tog">
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysMenuFormStoremenuId"
                              name="menuId"
                              label="메뉴ID"
                              value={menuId}
                              onChange={(value) => changeInput('menuId', value)}
                              required
                              disabled={formType === FORM_TYPE_UPDATE}
                              errorMessage={errors.menuId}
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
                            <AppTreeSelect
                              id="useSysMenuFormStoreupperMenuId"
                              name="upperMenuId"
                              label="상위메뉴"
                              onChange={handleParentTreeSelect}
                              treeDefaultExpandAll
                              value={upperMenuId}
                              treeData={parentMenuTreeData}
                              fieldNames={{ label: 'nameKor', value: 'menuId' }}
                              errorMessage={errors.upperMenuId}
                              treeCheckable={false}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysMenuFormStorenameKor"
                              name="nameKor"
                              label="명칭(한국어)"
                              value={nameKor}
                              onChange={(value) => changeInput('nameKor', value)}
                              required
                              errorMessage={errors.nameKor}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysMenuFormStorenameEng"
                              name="nameEng"
                              label="명칭(영어)"
                              value={nameEng}
                              onChange={(value) => changeInput('nameEng', value)}
                              required
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
                              id="useSysMenuFormStorenameChn"
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
                              id="useSysMenuFormStorenameJpn"
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
                              id="useSysMenuFormStorenameEtc"
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
                        <div className="form-cell wid100">
                          <span className="form-group wid100">
                            <AppSelect
                              id="useSysMenuFormStoretreeType"
                              name="treeType"
                              label="구분"
                              options={Code.menuTreeType}
                              value={treeType}
                              onChange={(appSelectValue) => {
                                changeInput('treeType', appSelectValue);
                              }}
                              required
                              errorMessage={errors.treeType}
                            />
                          </span>
                        </div>
                      </div>
                      <hr className="line"></hr>
                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              inputType="number"
                              id="useSysMenuFormStoresortOrder"
                              name="sortOrder"
                              label="정렬순서"
                              value={sortOrder}
                              onChange={(value) => changeInput('sortOrder', value)}
                              required
                              errorMessage={errors.sortOrder}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppTextInput
                              id="useSysMenuFormStoremenuUrl"
                              name="menuUrl"
                              label="메뉴URL"
                              value={menuUrl}
                              onChange={(value) => changeInput('menuUrl', value)}
                              errorMessage={errors.menuUrl}
                            />
                          </div>
                        </div>
                      </div>
                      <hr className="line"></hr>

                      <div className="form-table">
                        <div className="form-cell wid50">
                          <div className="form-group wid100">
                            <AppSelect
                              id="useSysMenuFormStoreuseYn"
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
                            <AppTextInput
                              id="useSysMenuFormStoreremark"
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
                    </div>
                  </div>
                </dd>
              </dl>
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
