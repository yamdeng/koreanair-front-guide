function PCheckResultList() {
  return (
    <div className="content_area">
      <h3>점검 결과 관리</h3>
      <div className="box_form">
        <div className="form_table">
          {/* 
    input,select,textarea 실패했을때 invalid
    label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
    f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
    wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
  */}
          <div className="form_cell form_cell_flex">
            <span className="form_group form_search form_clear form_glow c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label">
                작업지시 ID <span className="required">*</span>
              </label>
              <span className="icon icon_search">
                <i className="fas fa-search"></i>
              </span>
              {/* input에 value 값이 있으면 style display로 제어 */}
              <span className="icon icon_clear" style={{ display: 'block' }}>
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
            <span className="form_group form_glow">
              <input type="text" className="form_tag" />
              <label className="f_label">
                작업지시 명 <span className="required">*</span>
              </label>
            </span>
          </div>
          <div className="form_cell form_cell_flex">
            <span className="form_group form_glow c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label">작업 조직</label>
            </span>
            <button className="btn_icon btn_dark_gray">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="form_table">
          <div className="form_cell form_cell_flex">
            <span className="form_group form_glow">
              <select name="" id="b" className="form_tag_select ">
                <option value=""> </option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
              <label className="f_label" htmlFor="b">
                점검 유형
              </label>
            </span>
          </div>
          <div className="form_cell form_cell_flex">
            <span className="form_group wid20 c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label">점검 자</label>
              {/* input에 value 값이 있으면 style display로 제어 */}
            </span>
            <span className="form_group form_glow c_mr5">
              <input type="text" className="form_tag" />
            </span>
            <button className="btn_icon btn_dark_gray c_mr5">
              <i className="fas fa-search"></i>
            </button>
            <button className="btn_text btn_dark_gray">본인</button>
          </div>
        </div>

        <p className="c_pt15 right">
          <button className="btn_text btn_green">조회</button>
        </p>
      </div>
      <div className="list_form c_mt10">
        <p className="relative c_mb10">
          <span className="form_group c_mr5" style={{ width: '100px' }}>
            <select name="" id="b" className="form_tag_select ">
              <option value="">목록 10개</option>
              <option value="">전체1</option>
              <option value="">전체2</option>
            </select>
          </span>
          <span className="fs_12">총 nnn 건</span>
        </p>
        <div className="tb_wrap_scroll">
          <div className="horizon_tb">
            <table className="tb_list" style={{ minWidth: '1000px' }}>
              <caption></caption>
              <thead>
                <tr>
                  <th rowSpan={2}>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1"></label>
                    </div>
                  </th>
                  <th rowSpan={2}>작업지시ID</th>
                  <th rowSpan={2}>작업 명</th>
                  <th rowSpan={2}>작업 조직</th>
                  <th colSpan={3}>점검자</th>
                  <th rowSpan={2}>점검 유형</th>
                  <th rowSpan={2}>점검일</th>
                  <th rowSpan={2}>점검결과</th>
                  <th rowSpan={2}>편집</th>
                  <th rowSpan={2}>상세</th>
                </tr>
                <tr>
                  <th>사번</th>
                  <th>이름</th>
                  <th>소속</th>
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
                  <td>
                    <input type="text" className="form_tag center edit" disabled value="Yyyy-MM-DD HH:MI" />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form_tag center edit"
                      disabled
                      value="ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form_tag center edit"
                      disabled
                      value="ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ"
                    />
                  </td>
                  <td>11010101</td>
                  <td>홍길동</td>
                  <td>
                    <select name="" id="b" disabled className="form_tag_select center edit">
                      <option value="">ㅇㅇ부문 ㅁㅁ팀</option>
                      <option value="">전체</option>
                      <option value="">전체2</option>
                    </select>
                  </td>
                  <td>
                    <select name="" id="b" disabled className="form_tag_select center edit">
                      <option value="">ㅇㅇㅇㅇ</option>
                      <option value="">전체</option>
                      <option value="">전체2</option>
                    </select>
                  </td>
                  <td>YYYY-MM-DD HH:MI</td>
                  <td>
                    <select name="" id="b" disabled className="form_tag_select center edit">
                      <option value="">첨부</option>
                      <option value="">전체</option>
                      <option value="">전체2</option>
                    </select>
                  </td>

                  <td>
                    <i className="fas fa-edit"></i>
                  </td>
                  <td>
                    <i className="fas fa-eye"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="list_form_btns">
          <button className="btn_text btn_blue c_mr5">엑셀다운</button>
          <button className="btn_text btn_blue c_mr5">점검결과 등록</button>
          <button className="btn_text btn_green">삭제</button>
        </div>
      </div>
      <div className="paging_wrap">
        <span className="p_web">
          <i className="fas fa-angle-double-left"></i>
        </span>
        <span className="p_arr_l">
          <i className="fas fa-angle-left"></i>
        </span>
        {/* web paging */}
        <span className="p_web">1</span>
        <span className="p_web">2</span>
        <span className="p_web">3</span>
        <span className="p_web">4</span>
        {/* mobile pagind */}
        <span className="p_mobile">1</span>
        <span className="p_mobile">/</span>
        <span className="p_mobile">10</span>
        <span className="p_arr_r">
          <i className="fas fa-angle-right"></i>
        </span>
        <span className="p_web">
          <i className="fas fa-angle-double-right"></i>
        </span>
      </div>
    </div>
  );
}

export default PCheckResultList;
