import AppDatePicker from './common/AppDatePicker';
import AppTimePicker from './common/AppTimePicker';

function PConfinedSpaceForm3() {
  return (
    <div className="content_area">
      <h3>밀폐공간 작업허가서-산소 농도측정</h3>
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
        <li className="">안전조치 요구사항</li>
        <li className="active">산소 및 유해가스 농도 측정</li>
      </ul>
      <div className="box_form">
        <div className="tb_wrap_scroll c_mt15">
          <div className="horizon_tb">
            <table className="tb_list tb_bor">
              <caption></caption>
              <thead>
                <tr>
                  <th rowSpan={2}>측정 물질명</th>
                  <th colSpan={3}>측정 농도</th>
                  <th colSpan={3}>측정 시간</th>
                  <th colSpan={4}>측정자</th>
                </tr>
                <tr>
                  <th className="fix_bor_left">전</th>
                  <th>중</th>
                  <th>후</th>
                  <th>전</th>
                  <th>중</th>
                  <th>후</th>
                  <th>사번</th>
                  <th>이름</th>
                  <th>소속</th>
                  <th>찾기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="left">산소(18~23.5%)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>11111111</td>
                  <td>홍길동</td>
                  <td>ㅇㅇㅇㅇㅇㅇㅇㅇㅇ</td>
                  <td>
                    <i className="fas fa-search"></i>
                  </td>
                </tr>
                <tr>
                  <td className="left">CO(30ppm미만)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>11111111</td>
                  <td>홍길동</td>
                  <td>ㅇㅇㅇㅇㅇㅇㅇㅇㅇ</td>
                  <td>
                    <i className="fas fa-search"></i>
                  </td>
                </tr>
                <tr>
                  <td className="left">탄산가스(1.5% 미만)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>11111111</td>
                  <td>홍길동</td>
                  <td>ㅇㅇㅇㅇㅇㅇㅇㅇㅇ</td>
                  <td>
                    <i className="fas fa-search"></i>
                  </td>
                </tr>
                <tr>
                  <td className="left">황화수소(10ppm 미만)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>11111111</td>
                  <td>홍길동</td>
                  <td>ㅇㅇㅇㅇㅇㅇㅇㅇㅇ</td>
                  <td>
                    <i className="fas fa-search"></i>
                  </td>
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

export default PConfinedSpaceForm3;
