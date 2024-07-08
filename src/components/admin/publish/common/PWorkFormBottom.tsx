function PWorkFormBottom() {
  return (
    <div className="work_form_top">
      <div className="box_form c_mb20">
        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group wid40 c_mr5">
              <select name="" id="b" className="form_tag_select ">
                <option value=""> </option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
              <label className="f_label" htmlFor="b">
                작성일정
              </label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PWorkFormBottom;
