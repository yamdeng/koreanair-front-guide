import AppSelect from '@/components/common/AppSelect';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import AppAutoComplete from '@/components/common/AppAutoComplete';
//import AppCodeSelect from '@/components/common/AppCodeSelect';

//import Select from 'react-select';

/* TODO : store 경로를 변경해주세요. */
import useOcuRegulationsFormStore from '@/stores/occupation/general/useOcuRegulationsFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuRulesFormDetail() {
  /* formStore state input 변수 */
  const {
    detailInfo,
    searchRevisionNo,
    changeStateProps,
    // getCustomDetail,
    formType,
    cancel,
    goFormPage,
    clear,
    getDetail,
  } = useOcuRegulationsFormStore();
  const {
    // 부문명
    sectNm,
    // 등록자
    regUserId,
    // 구분
    formClsNm,
    // 개정번호
    revisionNo,
    // 제정일자
    enactedDt,
    // 개정일자
    revisionDt,
    // 첨부 link
    // linkId,
    // 제목
    revisionTitle,
    // 내용
    majorRevisionCn,
    // 규정
    formCls,
    // 부문
    sectCd,

    // selectUser,
    // 첨부 파일
    // fileId,
  } = detailInfo;

  const { detailId } = useParams();

  // 상세 조회
  const handleSelectChange = (option) => {
    getDetail(option);
    changeStateProps('searchRevisionNo', option.value);
  };
  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <div className="Breadcrumb">
        <ol>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">홈</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">안전관리</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">위험기계기구</a>
          </li>
        </ol>
      </div>
      {/*경로 */}
      <div className="conts-title">
        <h2>규정/지침/매뉴얼/양식</h2>
      </div>
      {/*상세페이지*/}
      <div className="number">
        <div className="title">개정번호</div>
        <div className="form-cell wd-300">
          <div className="form-group wid100">
            {/* 추후 변경 및 개정번호 대입 해야함 */}
            {/* <AppSelect label={'개정번호'} /> */}

            <AppSelect
              label="개정번호"
              apiUrl={`ocu/general/selectRevisionNoList?sectCd=${sectCd}&formCls=${formCls}`}
              value={searchRevisionNo}
              labelKey="revisionNo"
              valueKey="revisionNo"
              // onChange={(value) => {
              //   changeStateProps('searchRevisionNo', value);
              // }}
              onChange={(value) => {
                handleSelectChange(value);
              }}
            />

            {/* <AppAutoComplete
              label="개정번호"
              apiUrl="com/users"
              value={selectUser}
              labelKey="nameKor"
              valueKey="userId"
              onlySelect
              onSelect={(value) => setSelectUser(value)}
            /> */}

            {/* <Select
              // label={'개정번호'}
              // codeGrpId="CODE_GRP_OC001"
              value={revisionNo2}
              onChange={handleSelectChange} // onChange 이벤트 핸들러
              // onChange={(value) => {
              //   selectRevisionNoDetail(value);
              // }}
              options={options}
              // onChange={(value) => {
              //   changeSearchInput('revisionNo', value);
              // }}
            /> */}
          </div>
        </div>
      </div>
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
                    <label className="t-label">구분</label>
                    <span className="text-desc-type1">{formClsNm}</span>
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
                    <label className="t-label">개정번호</label>
                    <span className="text-desc-type1">{revisionNo}</span>
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
                    <label className="t-label">제정일자</label>
                    <span className="text-desc-type1">{enactedDt}</span>
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
                    <label className="t-label">개정일자</label>
                    <span className="text-desc-type1">{revisionDt}</span>
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
                    <label className="t-label">첨부 Link</label>
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
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">제목</label>
                    <span className="text-desc-type1">{revisionTitle}</span>
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
                    <span className="text-desc-type1">{majorRevisionCn}</span>
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
export default OcuRulesFormDetail;
