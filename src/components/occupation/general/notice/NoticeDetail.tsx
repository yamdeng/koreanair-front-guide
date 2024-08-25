import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* TODO : store 경로를 변경해주세요. */
import useOcuNoticeFormStore from '@/stores/occupation/general/useOcuNoticeFormStore';
import shareImage from '@/resources/images/share.svg';

import { useLocation } from 'react-router-dom';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function NoticeDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, formType, cancel, goFormPage, clear } = useOcuNoticeFormStore();
  const {
    // 부문
    sectNm,
    // 등록자
    regUserId,
    // 등록일자
    regDttm,
    // 공지사항 구분
    noticeCls,
    // 상위 표출 여부
    upViewYnNm,
    // 제목
    noticeTitle,
    // 내용
    noticeContent,
    // 첨부파일
  } = detailInfo;

  const handleCopy = (location: string) => {
    console.log('test==>', location);
    navigator.clipboard.writeText(location);
    alert('클립보드에 링크가 복사되었어요.');
  };

  const { detailId } = useParams();

  const location = useLocation();

  console.log('location====>', location);

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>공지사항</h2>
      </div>
      {/*상세페이지*/}
      <div className="editbox">
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
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">공지사항 구분</label>
                    <span className="text-desc-type1">{noticeCls}</span>
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
                    <label className="t-label">상위 표출 여부</label>
                    <span className="text-desc-type1">{upViewYnNm}</span>
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
                    <label className="t-label">제목</label>
                    <span className="text-desc-type1">{noticeTitle}</span>
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
                    <label className="t-label">내용</label>
                    <span className="text-desc-type1">{noticeContent}</span>
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
                    <label className="t-label">첨부파일</label>
                    <span className="text-desc-type1">
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
        <button type="button" name="button" className="btn_text btn-share">
          <img src={shareImage} />
          {/* onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)} */}
          {/* baseurl 추가해야함 */}
          <span onClick={() => handleCopy(`${location.pathname}`)}>공유</span>
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={goFormPage}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          수정
        </button>
        {/* <button type="button" name="button" className="btn_text btn-del">
          삭제
        </button> */}
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록으로
        </button>
      </div>
    </>
  );
}
export default NoticeDetail;
