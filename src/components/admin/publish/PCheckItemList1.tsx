function PCheckItemList1() {
  return (
    <div className="content_area">
      <h3>점검 항목 관리-공통(모달 포함)</h3>
      <ul className="tabs_wrap">
        <li className="active">공통</li>
        <li className="disabled">공사유형별</li>
      </ul>

      <div className="list_form">
        <p className="relative c_mb10">
          <span className="form_group c_mr5" style={{ width: '100px' }}>
            <select name="" id="b" className="form_tag_select ">
              <option value="">목록 10개</option>
              <option value="">전체1</option>
              <option value="">전체2</option>
            </select>
          </span>
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
                    <i className="fas fa-edit"></i>
                  </td>
                  <td>
                    <a href="" style={{ fontSize: '20px' }}>
                      <i className="fas fa-caret-up"></i>
                    </a>
                    <a href="" style={{ fontSize: '20px' }}>
                      <i className="fas fa-caret-down"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="list_form_btns">
          <button className="btn_text btn_blue c_mr5">추가</button>
          <button className="btn_text btn_blue c_mr5">미사용 처리</button>
          <button className="btn_text btn_blue c_mr5 mhide">사용 처리</button>
          <button className="btn_text btn_blue c_mr5 mhide">순위 저장</button>
          <button className="btn_text btn_green">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default PCheckItemList1;
