import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* TODO : store 경로를 변경해주세요. */
import useOcuCommitteeFormStore from '@/stores/occupation/general/useOcuCommitteeFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuCommitteeDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = useOcuCommitteeFormStore();

  // const {  title, content, regDttm, sectNm, fileId, linkId, regUserId } = detailInfo;

  const { title, content, regDttm, sectNm, regUserId } = detailInfo;

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>산업안전보건위원회</h2>
      </div>
      {/*상세페이지*/}
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">제목</label>
                    <span className="text-desc-type1">{title}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">주요 개정 내용</label>
                    <span className="text-desc-type1">{content}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">첨부 Link</label>
                    {/* {linkId} */}
                    <span className="text-desc-type2">
                      <a href="javascript:void(0);">첨부파일링크링크</a>
                    </span>
                    <span className="text-desc-type2">
                      <a href="javascript:void(0);">첨부파일</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">부문</label>
                    <span className="text-desc-type1">{sectNm}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">등록자</label>
                    <span className="text-desc-type1">{regUserId}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">등록일자</label>
                    <span className="text-desc-type1">{regDttm}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    {/* 첨부파일 추후 착업 필요 */}
                    <label className="t-label">첨부파일</label>
                    <span className="text-desc-type1">
                      <div className="desc-file">
                        <a href="javascript:void(0);">
                          <span>첨부파일.zip</span>
                          <span className="download"></span>
                        </a>
                      </div>
                      <div className="desc-file">
                        <a href="javascript:void(0);">
                          <span>첨부파일.zip</span>
                          <span className="download"></span>
                        </a>
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line"></hr>
      </div>
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
export default OcuCommitteeDetail;
