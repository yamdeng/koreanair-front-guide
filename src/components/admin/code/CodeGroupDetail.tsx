import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysCodeGroupFormStore from '@/stores/admin/useSysCodeGroupFormStore';
import Code from '@/config/Code';
import AppTable from '@/components/common/AppTable';

function CodeGroupDetail() {
  /* formStore state input 변수 */
  const {
    codeGrpId,
    workScope,
    codeGrpNameKor,
    codeGrpNameEng,
    useYn,
    remark,
    getDetail,
    formType,
    cancel,
    goFormPage,
    clear,
  } = useSysCodeGroupFormStore();

  const listState = useSysCodeGroupFormStore();
  const { search, searchWord, list, getColumns, changeSearchInput, changeListApiPath } = listState;
  const columns = getColumns();

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    changeListApiPath(`sys/code-groups/${detailId}/codes`);
    search();
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
            <div className="list-row wid50">
              <label className="f-label">
                코드그룹ID <span className="required">*</span>
              </label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{codeGrpId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">업무구분</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{Code.getCodeLabelByValue('adminWorkScope', workScope)}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">코드그룹명(한국어)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{codeGrpNameKor}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">코드그룹명(영어)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{codeGrpNameEng}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사용여부</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{useYn}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">비고</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{remark}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <span className="form-group wid100 mr5">
              <input
                type="text"
                className="form-tag"
                name="title"
                value={searchWord}
                onChange={(event) => {
                  changeSearchInput('searchWord', event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event && event.key === 'Enter') {
                    search();
                  }
                }}
              />
              <label className="f-label">이름</label>
            </span>
          </div>
        </div>
      </div>
      <AppTable rowData={list} columns={columns} store={listState} hiddenPagination />

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록으로
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={goFormPage}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          수정
        </button>
      </div>
    </>
  );
}
export default CodeGroupDetail;
