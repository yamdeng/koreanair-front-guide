function PWorkFormLeft() {
  return (
    <div className="work_left_menu">
      <div className="">
        <ul className="task_menu">
          <li className="item active">
            서류 업로드
            <span className="abrc">
              <i className="fas fa-chevron-right"></i>
            </span>
          </li>
          <li className="item">
            첨부파일 업로드
            <span className="abrc">
              <i className="fas fa-chevron-right"></i>
            </span>
          </li>
          <li className="item">
            전자서명 요청
            <span className="abrc">
              <i className="fas fa-chevron-right"></i>
            </span>
          </li>
          <li className="item">
            결재선 지정
            <span className="abrc">
              <i className="fas fa-chevron-right"></i>
            </span>
          </li>
          <li className="item">
            직상사 확인 요청
            <span className="abrc">
              <i className="fas fa-chevron-right"></i>
            </span>
          </li>
        </ul>
        <div className="btns_wrap">
          <button className="btn_text btn_dark_gray  c_mb10">양식 다운로드</button>
        </div>
      </div>
    </div>
  );
}

export default PWorkFormLeft;
