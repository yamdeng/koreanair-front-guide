function PBoardForm() {
  return (
    <div className="content_area">
      <h3>7 : 게시판 상세</h3>
      <div className="detail_form">
        <ul className="detail_list">
          <li className="lists">
            <span className="label">게시번호</span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">작성일시</span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">작성자 </span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">유형 </span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">제목 </span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">내용 </span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">공개기간 </span>
            <div className="cont">111111111</div>
          </li>
          <li className="lists">
            <span className="label">첨부 </span>
            <div className="cont">
              <div className="form_table">
                <span className="form_group wid50 c_mr5">
                  <input type="text" className="form_tag center" disabled placeholder="xxxxx.pdf - 10kb" />
                </span>
                <button className="btn_icon btn_green ">
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h4 className="">댓글/답글 </h4>
      <div className="tb_wrap_scroll">
        <div className="horizon_tb">
          {/* 말줄임이 들어가는 테이블은 tb_fix가 추가되야함. */}
          <table className="tb_list tb_fix" style={{ minWidth: '500px' }}>
            <caption></caption>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>등록일시</th>
                <th style={{ width: '25%' }}>등록자</th>
                <th style={{ width: '60%' }}>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Yyyy-MM-DD HH:MI</td>
                <td>ㅇㅇㅇ 부문&gt;ㅇㅇㅇㅇ팀 홍길동</td>
                <td className="left">
                  <div className="ellipsis">
                    ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PBoardForm;
