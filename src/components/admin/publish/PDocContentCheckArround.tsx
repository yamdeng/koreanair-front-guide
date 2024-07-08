import PWorkFormTop from './common/PWorkFormTop';
import PWorkFormBottom from './common/PWorkFormBottom';
import PWorkFormLeft from './common/PWorkFormLeft';

function PDocContentCheckArround() {
  return (
    <div className="content_area">
      <h3>순외점검_기본정보</h3>
      <PWorkFormTop />
      <div className="work_forw_wrap">
        <PWorkFormLeft />
        <div className="work_content">
          <div className="box_form">
            <div className="form_table">
              <div className="form_cell f_wid30">
                <span className="form_group wid100">
                  {/* <AppDatePicker id="aa" label="점검일" name={'aa'} value={''} onChange={() => {}} required={true} /> */}
                </span>
              </div>
              <div className="form_cell f_wid70"></div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid70">
                <span className="form_group wid80 c_mr5 _icon">
                  <input
                    id="a"
                    type="text"
                    className="form_tag"
                    placeholder="점검자를 검색해주세요"
                    disabled
                    value="개발팀 황승연"
                  />
                  <label className="f_label" htmlFor="a">
                    점검자
                  </label>
                  <button className="btn_icon btn_dark_gray">
                    <i className="fas fa-search"></i>
                  </button>
                </span>
              </div>
              <div className="form_cell f_wid30"></div>
            </div>
            <div className="form_table">
              <div className="form_cell">
                <span className="form_group wid100">
                  <input id="inspPlace" name="inspPlace" type="text" className="form_tag" value="마포" />
                  <label className="f_label" htmlFor="inspPlace">
                    점검장소
                  </label>
                </span>
              </div>
            </div>
            <p className="c_pt15 right">
              <button className="btn_text btn_green">저장</button>
            </p>
            {/* box_form end */}
          </div>
          <PWorkFormBottom />
        </div>
      </div>
    </div>
  );
}

export default PDocContentCheckArround;
