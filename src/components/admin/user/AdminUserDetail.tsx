import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysUserFormStore from '@/stores/admin/useSysUserFormStore';

function AdminUserDetail() {
  /* formStore state input 변수 */
  const { detailInfo, getDetail, cancel, clear } = useSysUserFormStore();
  const {
    userId,
    empNo,
    nameKor,
    nameEng,
    nameChn,
    nameJpn,
    nameEtc,
    email,
    officeTelNo,
    mobileTelNo,
    subEmpNo,
    subCompCd,
    subEmail,
    empType,
    dsptYn,
    eaiYn,
    className,
  } = detailInfo;

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>사용자 정보</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">사용자ID</label>
                    <span className="text-desc">{userId}</span>
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
                    <label className="t-label">사번</label>
                    <span className="text-desc">{empNo}</span>
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
                    <label className="t-label">사용자명(한국어)</label>
                    <span className="text-desc">{nameKor}</span>
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
                    <label className="t-label">사용자명(영어)</label>
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
                    <label className="t-label">
                      사진 <span className="required">*</span>
                    </label>
                    {/*사진이미지 */}
                    <div className="imgBoxWrap">
                      <div className="imgBox">
                        <img src="/src/resources/images/img01.png" alt="" />
                      </div>
                    </div>
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
                    <label className="t-label">사용자명(중국어)</label>
                    <span className="text-desc">{nameChn}</span>
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
                    <label className="t-label">사용자명(일본어)</label>
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
                    <label className="t-label">사용자명(기타)</label>
                    <span className="text-desc">{nameEtc}</span>
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
                    <label className="t-label">메일</label>
                    <span className="text-desc">{email}</span>
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
                    <label className="t-label">사무실전화번호</label>
                    <span className="text-desc">{officeTelNo}</span>
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
                    <label className="t-label">핸드폰 번호</label>
                    <span className="text-desc">{mobileTelNo}</span>
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
                    <label className="t-label">부 사번</label>
                    <span className="text-desc">{subEmpNo}</span>
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
                    <label className="t-label">파견 법인코드</label>
                    <span className="text-desc">{subCompCd}</span>
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
                    <label className="t-label">부 메일주소</label>
                    <span className="text-desc">{subEmail}</span>
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
                    <label className="t-label">직원구분</label>
                    <span className="text-desc">{empType}</span>
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
                    <label className="t-label">주재원여부</label>
                    <span className="text-desc">{dsptYn}</span>
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
                    <label className="t-label">EAI연동여부</label>
                    <span className="text-desc">{eaiYn}</span>
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
                    <label className="t-label">KE CLASS NAME</label>
                    <span className="text-desc">{className}</span>
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
      </div>
    </>
  );
}
export default AdminUserDetail;
