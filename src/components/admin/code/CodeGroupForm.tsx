import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysCodeGroupFormStore from '@/stores/admin/useSysCodeGroupFormStore';
import AppTable from '@/components/common/AppTable';
import AppSelect from '@/components/common/AppSelect';
import Code from '@/config/Code';

function CodeGroupForm() {
  /* formStore state input 변수 */
  const {
    codeGrpId,
    workScope,
    codeGrpNameKor,
    codeGrpNameEng,
    useYn,
    remark,
    errors,
    changeInput,
    getDetail,
    formType,
    save,
    remove,
    clear,
  } = useSysCodeGroupFormStore();

  const listState = useSysCodeGroupFormStore();
  const { search, list, getColumns, changeListApiPath } = listState;
  const columns = getColumns();

  const { detailId } = useParams();

  // 추가, 전체 삭제
  // addRow, deleteAll

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
      changeListApiPath(`sys/code-groups/${detailId}/codes`);
      search();
    }
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>코드관리</h2>
      </div>
      <div className="detail-form">
        <ul className="detail-list">
          <li className="list">
            <label className="f-label">
              코드그룹ID <span className="required">*</span>
            </label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className={errors.codeGrpId ? 'form-tag error' : 'form-tag'}
                      placeholder="코드그룹ID"
                      name="codeGrpId"
                      id="useSysCodeGroupFormStorecodeGrpId"
                      value={codeGrpId}
                      onChange={(event) => changeInput('codeGrpId', event.target.value)}
                    />
                    {errors.codeGrpId ? <span className="errorText">{errors.codeGrpId}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <label className="f-label">업무구분(A:항공안전, O:산업안전, S:시스템)</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className={errors.workScope ? 'form-tag error' : 'form-tag'}
                      placeholder="업무구분(A:항공안전, O:산업안전, S:시스템)"
                      name="workScope"
                      id="useSysCodeGroupFormStoreworkScope"
                      value={workScope}
                      onChange={(event) => changeInput('workScope', event.target.value)}
                    />
                    {errors.workScope ? <span className="errorText">{errors.workScope}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <label className="f-label">코드그룹명(한국어)</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className={errors.codeGrpNameKor ? 'form-tag error' : 'form-tag'}
                      placeholder="코드그룹명(한국어)"
                      name="codeGrpNameKor"
                      id="useSysCodeGroupFormStorecodeGrpNameKor"
                      value={codeGrpNameKor}
                      onChange={(event) => changeInput('codeGrpNameKor', event.target.value)}
                    />
                    {errors.codeGrpNameKor ? <span className="errorText">{errors.codeGrpNameKor}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <label className="f-label">코드그룹명(영어)</label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className={errors.codeGrpNameEng ? 'form-tag error' : 'form-tag'}
                      placeholder="코드그룹명(영어)"
                      name="codeGrpNameEng"
                      id="useSysCodeGroupFormStorecodeGrpNameEng"
                      value={codeGrpNameEng}
                      onChange={(event) => changeInput('codeGrpNameEng', event.target.value)}
                    />
                    {errors.codeGrpNameEng ? <span className="errorText">{errors.codeGrpNameEng}</span> : null}
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
                      style={{ width: 150, marginBottom: 10 }}
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
                      id="useSysCodeGroupFormStoreremark"
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

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
      </div>

      {formType !== 'add' ? (
        <AppTable rowData={list} columns={columns} store={listState} hiddenPagination editable={true} />
      ) : null}

      {/* 하단 버튼 영역 */}
      <div className="contents-btns" style={{ display: formType !== 'add' ? '' : 'none' }}>
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          삭제
        </button>
      </div>
    </>
  );
}
export default CodeGroupForm;
