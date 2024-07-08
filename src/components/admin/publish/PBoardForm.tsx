import DatePicker from 'react-datepicker';

function PBoardForm() {
  return (
    <div className="content_area">
      <h3>테이블 case 1</h3>
      <div className="write_form">
        <div className="form_table">
          {/* 
            input,select,textarea 실패했을때 invalid
            label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
            f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
            wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
          */}
          <div className="form_cell f_wid70">
            {/* 
              기본은 form_group
              앞에 돋보기 아이콘을 추가하려면 .form_search 와 icon icon_search 추가
              뒤에 클리어 아이콘을 추가하려면 .form_clear 와 icon icon_clear 추가
            */}
            <span className="form_group form_search form_clear wid70 c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label">조직 명</label>
              <span className="icon icon_search">
                <i className="fas fa-search"></i>
              </span>
              {/* input에 value 값이 있으면 style display로 제어 */}
              <span className="icon icon_clear" style={{ display: 'block' }}>
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
            <button className="btn_text btn_dark_gray">조회</button>
          </div>
          <div className="form_cell f_wid20">
            <span className="form_group wid100 c_mr5">
              <input type="text" className="form_tag " disabled />
              <label className="f_label">작성자</label>
            </span>
          </div>
          <div className="form_cell f_wid30">
            <span className="form_group wid100 c_mr5">
              <input type="text" className="form_tag " disabled />
              <label className="f_label">작성일시</label>
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group f_wid50 c_mr5">
              <select name="" id="b" className="form_tag_select ">
                <option value=""> </option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
              <label className="f_label" htmlFor="b">
                유형 *
              </label>
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid100 c_mr5">
              <input type="text" className="form_tag" placeholder="직영시 조직명+년도  공사는 공사명 + 기간" />
              <label className="f_label" htmlFor="b">
                제목 *
              </label>
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid100 c_mr5">
              <textarea name="" id="" className="form_tag textarea"></textarea>
              <label className="f_label" htmlFor="b">
                내용 *
              </label>
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid40 c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label" htmlFor="b">
                공개시작기간 *
              </label>
              <span className="icon icon_calendar">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </span>
            <span className="form_group wid40">
              <input type="text" className="form_tag" />
              <label className="f_label" htmlFor="b">
                공개종료기간 *
              </label>
              <span className="icon icon_calendar">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid40 c_mr5">
              <DatePicker onChange={(date: any) => {}} />
              <label className="f_label" htmlFor="b">
                공개시작기간2 *
              </label>
              <span className="icon icon_calendar">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </span>
            <span className="form_group wid40">
              {/* <DatePicker locale="ko" onChange={(date: any) => {}} customInput={<ExampleCustomInput />} /> */}
              <label className="f_label" htmlFor="b">
                공개종료기간2 *
              </label>
              <span className="icon icon_calendar">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid50 c_mr5">
              <input type="text" className="form_tag center" disabled placeholder="xxxxx.pdf - 10kb" />
              <label className="f_label" htmlFor="b">
                첨부
              </label>
              {/* input에 value 값이 있으면 style display로 제어 */}
              <span className="icon icon_clear" style={{ display: 'block' }}>
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
            <button className="btn_text btn_dark_gray c_mr5">첨부하기</button>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid50 c_mr5">
              <input type="text" className="form_tag center" disabled placeholder="xxxxx.pdf - 10kb" />
              <label className="f_label" htmlFor="b">
                첨부
              </label>
              {/* input에 value 값이 있으면 style display로 제어 */}
              <span className="icon icon_clear" style={{ display: 'block' }}>
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
            <button className="btn_text btn_dark_gray c_mr5">
              첨부하기
              {/* <i class="fas fa-times"></i> */}
            </button>
            <button className="btn_icon btn_gray c_mr5">
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
        </div>
      </div>
      <p className="c_pt15 right">
        <a data-tip data-for="happyFace">
          {' '}
          d(`･∀･)b{' '}
        </a>
        {/* <ReactTooltip id="happyFace" type="error">
          <span>Show happy face</span>
        </ReactTooltip> */}
        <button className="btn_text btn_green  c_mr5" data-tip="hello world">
          등록
        </button>
        <button className="btn_text btn_white " data-tip data-for="cancel">
          취소
        </button>
        {/* <ReactTooltip id="cancel" type="warning" effect="solid">
          <span>aaaaa aaaaaa a adas dad asd asd as</span>
        </ReactTooltip> */}
      </p>
    </div>
  );
}

export default PBoardForm;
