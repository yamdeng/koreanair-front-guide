import AppSearchInput from '@/components/common/AppSearchInput';
import AppTable from '@/components/common/AppTable';
import useSysCodeGroupFormStore from '@/stores/admin/useSysCodeGroupFormStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Code from '@/config/Code';
import { FORM_TYPE_ADD } from '@/config/CommonConstant';

function CodeGroupDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = useSysCodeGroupFormStore();
  const { codeGrpId, workScope, codeGrpNameKor, codeGrpNameEng, useYn, remark } = detailInfo;

  const listState = useSysCodeGroupFormStore();
  const { search, searchParam, list, changeSearchInput, changeListApiPath } = listState;
  const { searchWord } = searchParam;

  const [columns, setColumns] = useState([
    { field: 'codeGrpId', headerName: '코드그룹ID' },
    { field: 'codeId', headerName: '코드ID' },
    { field: 'codeNameKor', headerName: '코드명(한국어)' },
    { field: 'codeNameEng', headerName: '코드명(영어)' },
    { field: 'codeField1', headerName: '예비필드 1' },
    { field: 'codeField2', headerName: '예비필드 2' },
    { field: 'codeField3', headerName: '예비필드 3' },
    { field: 'codeField4', headerName: '예비필드 4' },
    { field: 'codeField5', headerName: '예비필드 5' },
    { field: 'sortOrder', headerName: '정렬순서' },
    { field: 'useYn', headerName: '사용여부' },
    { field: 'remark', headerName: '비고' },
    { field: 'regUserId', headerName: '등록자ID' },
    { field: 'regDttm', headerName: '등록일시' },
    { field: 'updUserId', headerName: '수정자ID' },
    { field: 'updDttm', headerName: '수정일시' },
  ]);

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
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">코드그룹ID</label>
                    <span className="text-desc">{codeGrpId}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">업무구분</label>
                    <span className="text-desc">{Code.getCodeLabelByValue('adminWorkScope', workScope)}</span>
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
                    <label className="t-label">코드그룹명(한국어)</label>
                    <span className="text-desc">{codeGrpNameKor}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">코드그룹명(영어)</label>
                    <span className="text-desc">{codeGrpNameEng}</span>
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
                    <label className="t-label">사용여부</label>
                    <span className="text-desc">{useYn}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">비고</label>
                    <span className="text-desc">{remark}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSearchInput
                label="검색"
                value={searchWord}
                onChange={(value) => {
                  changeSearchInput('searchWord', value);
                }}
                search={search}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        {/*입력폼영역 */}
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTable
                rowData={list}
                columns={columns}
                setColumns={setColumns}
                store={listState}
                hiddenPagination
                hiddenTableHeader
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록으로
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={goFormPage}
          style={{ display: formType !== FORM_TYPE_ADD ? '' : 'none' }}
        >
          수정
        </button>
      </div>
    </>
  );
}
export default CodeGroupDetail;
