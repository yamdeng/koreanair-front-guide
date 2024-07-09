import AppDatePicker from './common/AppDatePicker';
import AppTimePicker from './common/AppTimePicker';

function PCheckResultForm() {
  return (
    <div className="content_area">
      <h3>점검 결과 등록(모달 2개 포함)</h3>
      <div className="box_form">
        <div className="form_table f_wid50">
          {/* 
input,select,textarea 실패했을때 invalid
label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
*/}
          <div className="form_cell form_cell_flex">
            <span className="form_group form_search form_clear form_glow c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label">작업지시ID</label>
              <span className="icon icon_search">
                <i className="fas fa-search"></i>
              </span>
            </span>
            <button className="btn_icon btn_dark_gray">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell ">
            <span className="form_group  wid100 ">
              <input type="text" className="form_tag" />
              <label className="f_label">작업 내용</label>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell ">
            <span className="form_group  wid100 ">
              <input type="text" className="form_tag" />
              <label className="f_label">작업자</label>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell ">
            <span className="form_group  wid100 ">
              <input type="text" className="form_tag" />
              <label className="f_label">작업장소</label>
            </span>
          </div>
        </div>
        <div className="form_table f_wid50">
          <div className="form_cell form_cell_flex ">
            <span className="form_group form_glow c_mr5">
              <AppDatePicker
                id="startDate"
                label="점검일시"
                value={null}
                valueFormat="YYYY-MM-DD"
                onChange={(date) => {}}
                required={true}
              />
              <span className="icon icon_calendar">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </span>
            <span className="form_group form_glow c_mr5">
              <AppTimePicker
                id="startTime"
                label="HH:MM"
                value="14:59"
                valueFormat="HH:mm"
                changeTime={(date) => {}}
                required={true}
              />
              <span className="icon icon_calendar">
                <i className="fas fa-clock"></i>
              </span>
            </span>
            <span className="form_group center c_mr5 c_mt8">-</span>
            <span className="form_group form_glow">
              <AppTimePicker
                id="startTime"
                label="HH:MM"
                value="14:59"
                valueFormat="HH:mm"
                changeTime={(date) => {}}
                required={true}
              />
              <span className="icon icon_calendar">
                <i className="fas fa-clock"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="group_box_wrap">
          <span className="txt">점검방법</span>
          <div className="form_table">
            <div className="form_table">
              <div className="radio-wrapper c_mr30">
                <input type="radio" name="question-2" value="43200000" id="question-2-option-1" />
                <label className="radio-label" htmlFor="question-2-option-1">
                  비대면
                </label>
              </div>
              <div className="radio-wrapper">
                <input type="radio" name="question-2" value="43200000" id="question-2-option-1" />
                <label className="radio-label" htmlFor="question-2-option-1">
                  대면
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell form_cell_flex">
            <span className="form_group form_glow c_mr5">
              <select name="" id="b" className="form_tag_select ">
                <option value=""> </option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
              <label className="f_label" htmlFor="b">
                작업 유형
              </label>
            </span>
            <span className="form_group form_glow ">
              <input type="text" className="form_tag" disabled value="자동출력" />
              <label className="f_label">최종 점검결과</label>
            </span>
          </div>
        </div>

        <p className="c_pt15 right">
          <button className="btn_text btn_green">조회</button>
        </p>
      </div>
      <div className="group_box_wrap">
        <span className="txt">체크리스트</span>
        <p className="c_mt20 c_mb10">공통</p>
        <table className="tb_list">
          <caption></caption>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>항목</th>
              <th style={{ width: '10%' }}>결과</th>
              <th style={{ width: '10%' }}>미흡내역</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="left">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</td>
              <td>양호/미흡</td>
              <td>
                <a href="">등록</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="c_mt20 c_mb10">고공 작업</p>
        <table className="tb_list">
          <caption></caption>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>항목</th>
              <th style={{ width: '10%' }}>결과</th>
              <th style={{ width: '10%' }}>미흡내역</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="left">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</td>
              <td>양호/미흡</td>
              <td>
                <a href="">사인</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="form_table">
        <div className="form_cell ">
          <span className="form_group wid30 c_mr5">
            <input type="text" className="form_tag" />
            <label className="f_label">
              점검자 <span className="required">*</span>
            </label>
          </span>
          <span className="form_group wid50">
            <input type="text" className="form_tag" />
          </span>
        </div>
      </div>
      <div className="form_table">
        <div className="form_cell ">
          <span className="form_group wid30 c_mr5">
            <input type="text" className="form_tag" />
            <label className="f_label">
              확인자 <span className="required">*</span>
            </label>
          </span>
          <span className="form_group wid50 c_mr5">
            <input type="text" className="form_tag" />
          </span>
          <button className="btn_icon btn_dark_gray">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <p className="c_pt15 right">
        <button className="btn_text btn_green">저장</button>
      </p>
    </div>
  );
}

export default PCheckResultForm;
