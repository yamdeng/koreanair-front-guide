import CodeSelect from './common/CodeSelect';

function PCheckItemList2() {
  return (
    <div className="content_area">
      <h3>점검 항목 관리-공사유형별</h3>
      <ul className="tabs_wrap">
        <li className="disabled">공통</li>
        <li className="active">공사유형별</li>
      </ul>
      <div className="box_form">
        <div className="form_table">
          {/* 
        input,select,textarea 실패했을때 invalid
        label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
        f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
        wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
      */}
          <div className="form_cell form_cell_flex">
            <span className="form_group form_glow c_mr5">
              <input type="text" className="form_tag invalid" />
              <label className="f_label">작업 부문</label>
              <span className="invalid_txt">유효하지 않습니다.</span>
            </span>
            <span className="form_group form_glow">
              <CodeSelect value={''} label="게시유형" codeType="boardType" onChange={() => {}} required={true} />
            </span>
          </div>
          <div className="form_cell f_wid20 ">
            <p className="c_pt15 right">
              <button className="btn_text btn_green mobile_full m_mt15">조회</button>
            </p>
          </div>
        </div>
      </div>
      <div className="list_form">
        <p className="relative c_mb10">
          <span className="form_group c_mr5" style={{ width: '100px' }}>
            <select name="" id="b" className="form_tag_select ">
              <option value="">목록 10개</option>
              <option value="">전체1</option>
              <option value="">전체2</option>
            </select>
          </span>
          <span className="fs_12 c_mr10">점검항목그룹</span>
          <span className="fs_12 c_mr10">총 nnn 건</span>
          <button className="btn_text btn_blue c_mr5">엑셀다운</button>
        </p>

        <div className="tb_wrap_scroll">
          <div className="horizon_tb">
            <table className="tb_list" style={{ minWidth: '500px' }}>
              <caption></caption>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1"></label>
                    </div>
                  </th>
                  <th style={{ width: '20%' }}>
                    <span className="c_mr5">분류ID</span>
                    {/* default, 클릭할떄마다 up,down 바뀜. */}
                    <i className="fas fa-sort"></i>
                    {/* <i className="fas fa-sort-down"></i> /> */}
                    {/* <i className="fas fa-sort-up"></i> /> */}
                  </th>
                  <th>분류 명</th>
                  <th style={{ width: '7%' }}>사용</th>
                  <th style={{ width: '7%' }}>편집</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1"></label>
                    </div>
                  </td>
                  <td>123456789</td>
                  <td>고공작업</td>
                  <td>Yes</td>
                  <td>
                    <i className="fas fa-edit"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="list_form_btns">
          <button className="btn_text btn_blue c_mr5">그룹 추가</button>
          <button className="btn_text btn_blue c_mr5">순위 저장</button>
          <button className="btn_text btn_green c_mr5">삭제</button>
          <button className="btn_text btn_green">등록 모달</button>
        </div>
      </div>

      <div className="list_form">
        <p className="relative c_mb10">
          <span className="form_group c_mr5" style={{ width: '100px' }}>
            <select name="" id="b" className="form_tag_select ">
              <option value="">목록 10개</option>
              <option value="">전체1</option>
              <option value="">전체2</option>
            </select>
          </span>
          <span className="fs_12 c_mr10">점검항목</span>
          <span className="fs_12">총 nnn 건</span>
        </p>
        <div className="tb_wrap_scroll">
          <div className="horizon_tb">
            <table className="tb_list" style={{ minWidth: '500px' }}>
              <caption></caption>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1"></label>
                    </div>
                  </th>
                  <th style={{ width: '20%' }}>
                    <span className="c_mr5">항목ID</span>
                    <i className="fas fa-sort"></i>
                  </th>
                  <th>점검 항목명</th>
                  <th>점검 내용</th>
                  <th style={{ width: '7%' }}>사용</th>
                  <th style={{ width: '7%' }}>편집</th>
                  {/* <th style={{ width: '7%' }}>정렬</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1"></label>
                    </div>
                  </td>
                  <td>123456789</td>
                  <td className="left">도로 인접한 통신주 작업 시 신호수 배치 여부</td>
                  <td className="left">작업 시&작업 종료 시까지 신호수를 배치하고 있는가?</td>
                  <td>Yes</td>
                  <td>
                    <a>
                      <i className="fas fa-edit"></i>
                    </a>
                  </td>
                  {/* <td>
                <Link style={{ fontSize: '20px' }}>
                  <i className="fas fa-caret-up"></i>
                </Link>
                <Link style={{ fontSize: '20px' }}>
                  <i className="fas fa-caret-down"></i>
                </Link>
              </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="list_form_btns">
          <button className="btn_text btn_blue c_mr5">항목 추가</button>
          <button className="btn_text btn_blue c_mr5">순위 저장</button>
          <button className="btn_text btn_green">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default PCheckItemList2;
