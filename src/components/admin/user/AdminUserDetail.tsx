import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSysUserFormStore from '@/stores/admin/useSysUserFormStore';

function AdminUserDetail() {
  /* formStore state input 변수 */
  const {
    userId,
    empNo,
    nameKor,
    nameEng,
    nameChn,
    nameJpn,
    nameEtc,
    email,
    statusCd,
    deptId,
    pstnId,
    dutyId,
    rankId,
    photo,
    sortOrder,
    officeTelNo,
    mobileTelNo,
    compCd,
    subEmpNo,
    subCompCd,
    subEmail,
    empType,
    dsptYn,
    jobCd,
    bareaCd,
    eaiYn,
    classCd,
    className,
    regUserId,
    regDttm,
    updUserId,
    updDttm,
    getDetail,
    cancel,
    clear,
  } = useSysUserFormStore();

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>사용자 상세</h2>
      </div>
      <div className="detail-form">
        <ul className="detail-list">
          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">
                사용자ID <span className="required">*</span>
              </label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{userId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사번</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{empNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사용자명(한국어)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{nameKor}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사용자명(영어)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{nameEng}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사용자명(중국어)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{nameChn}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사용자명(일본어)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{nameJpn}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사용자명(기타)</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{nameEtc}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">메일</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{email}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">상태</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{statusCd}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">부서ID</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{deptId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">직위ID</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{pstnId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">직책ID</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{dutyId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">RANK ID</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{rankId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사진파일 이름</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{photo}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">정렬순서</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{sortOrder}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사무실전화번호</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{officeTelNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">핸드폰 번호</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{mobileTelNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">법인코드</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{compCd}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">부 사번</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{subEmpNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">파견 법인코드</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{subCompCd}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">부 메일주소</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{subEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">직원구분</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{empType}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">주재원여부</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{dsptYn}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">직무코드</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{jobCd}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">사업장코드</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{bareaCd}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">EAI연동여부</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{eaiYn}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">KE CLASS CODE</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{classCd}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">KE CLASS NAME</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{className}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">등록자ID</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{regUserId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">등록일시</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{regDttm}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">수정자ID</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{updUserId}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="list">
            <div className="list-row wid50">
              <label className="f-label">수정일시</label>
              <div className="cont">
                <div className="form-table">
                  <div className="form-cell wid100">
                    <span className="form-group wid100">{updDttm}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
