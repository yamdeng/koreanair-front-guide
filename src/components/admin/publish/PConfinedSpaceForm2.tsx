import AppDatePicker from './common/AppDatePicker';
import AppTimePicker from './common/AppTimePicker';

function PConfinedSpaceForm2() {
  return (
    <div className="content_area">
      <h3>밀폐공간 작업허가서-안전조치 요구사항</h3>
      <div className="box_form">
        <div className="form_table">
          <div className="form_cell form_cell_flex">
            <span className="form_group form_search form_clear form_glow c_mr5">
              <input type="text" className="form_tag" />
              <label className="f_label">작업지시ID</label>
              <span className="icon icon_search">
                <i className="fas fa-search"></i>
              </span>
              {/* input에 value 값이 있으면 style display로 제어 */}
              <span className="icon icon_clear" style={{ display: 'block' }}>
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
            <button className="btn_icon btn_dark_gray ">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="form_cell form_cell_flex">
            <span className="form_group form_clear form_glow ">
              <input type="text" className="form_tag" />
              <label className="f_label">진행상태</label>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell wid100">
            <span className="form_group wid100 ">
              <input type="text" className="form_tag" />
              <label className="f_label">작성자</label>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell wid100">
            <span className="form_group wid100">
              <input type="text" className="form_tag" />
              <label className="f_label">작업 내용</label>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell form_cell_flex">
            <span className="form_group form_glow c_mr5">
              <AppDatePicker
                id="startDate"
                label="교육일자"
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
                <i className="fas fa-times-circle"></i>
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
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell wid100">
            <span className="form_group wid100">
              <input type="text" className="form_tag" />
              <label className="f_label">위 치</label>
            </span>
          </div>
        </div>

        <p className="c_pt15 right">
          <button className="btn_text btn_green c_mr5">조회</button>
          <button className="btn_text btn_blue c_mr5">승인요청</button>
          <button className="btn_text btn_blue">작업허가서 출력</button>
        </p>
      </div>
      <ul className="tabs_wrap">
        <li className="">작업정보</li>
        <li className="active">안전조치 요구사항</li>
        <li className="">산소 및 유해가스 농도 측정</li>
      </ul>
      <div className="box_form">
        <div className="tb_wrap_scroll c_mt15">
          <div className="horizon_tb">
            <table className="tb_list">
              <caption></caption>
              <thead>
                <tr>
                  <th>확인항목</th>
                  <th>해당여부</th>
                  <th>확인 결과</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="left">안전담당자지정 및 감시인 배치</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">산소농도 및 유해가스농도 (계속)측정</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">환기시설 설치</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">전화 및 무선기기 구비</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">소화기 비치</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">공기공급식 호흡용보호구 비치</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">안전장구 구비</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="left">안전교육 실시</td>
                  <td>
                    <div className="checkbox-wrapper">
                      <input type="checkbox" name="Claude Monet" id="question-1-option-1" />
                      <label className="checkbox-label" htmlFor="question-1-option-1">
                        해당여부
                      </label>
                    </div>
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="c_pt15 right">
          <button className="btn_text btn_green">저장</button>
        </p>
      </div>
    </div>
  );
}

export default PConfinedSpaceForm2;
