import AppDatePicker from '@/components/common/AppDatePicker';
import { useSpiInfoOpStatusStore } from '@/stores/aviation/spi-spt/useSpiInfoStore';
import CommonUtil from '@/utils/CommonUtil';

// SPI OP Status component
function OpStatus() {
  const state = useSpiInfoOpStatusStore();

  const { searchParam, search, list1, list2, list3, changeSearchInput, clear } = state;

  // input value에 넣기 위한 분리 선언
  const { year } = searchParam;

  return (
    <>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid30">
              <div className="row1">
                <div className="date1">
                  <AppDatePicker
                    label="연도"
                    value={year}
                    onChange={(value) => {
                      changeSearchInput('year', value);
                    }}
                    pickerType="year"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={search}>
              조회
            </button>
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={clear}>
              초기화
            </button>
          </div>
        </div>
      </div>
      {/* //검색영역 */}
      {/*테이블영역*/}
      <div className="info-box">
        <p className="h4">PAX/CGO 별 비행편 수</p>
        <table className="info-board">
          <colgroup>
            <col width="8%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th>PAX/CGO</th>
              <th>01</th>
              <th>02</th>
              <th>03</th>
              <th>04</th>
              <th>05</th>
              <th>06</th>
              <th>07</th>
              <th>08</th>
              <th>09</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            {list1.map((info, index) => {
              const {
                gubun,
                col01,
                col02,
                col03,
                col04,
                col05,
                col06,
                col07,
                col08,
                col09,
                col10,
                col11,
                col12,
                colTotal,
              } = info;
              let applyClassName = '';
              if (list1.length - 1 === index) {
                applyClassName = 'cons-bottom';
              }
              return (
                <tr key={index} className={applyClassName}>
                  <td>{gubun}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col01)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col02)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col03)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col04)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col05)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col06)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col07)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col08)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col09)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col10)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col11)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col12)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(colTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="info-box">
        <p className="h4">국내/국제선 비행편 수</p>
        <table className="info-board">
          <colgroup>
            <col width="8%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th>PAX/CGO</th>
              <th>01</th>
              <th>02</th>
              <th>03</th>
              <th>04</th>
              <th>05</th>
              <th>06</th>
              <th>07</th>
              <th>08</th>
              <th>09</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            {list2.map((info, index) => {
              const {
                gubun,
                col01,
                col02,
                col03,
                col04,
                col05,
                col06,
                col07,
                col08,
                col09,
                col10,
                col11,
                col12,
                colTotal,
              } = info;
              let applyClassName = '';
              if (list2.length - 1 === index) {
                applyClassName = 'cons-bottom';
              }
              return (
                <tr key={index} className={applyClassName}>
                  <td>{gubun}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col01)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col02)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col03)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col04)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col05)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col06)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col07)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col08)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col09)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col10)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col11)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col12)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(colTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="info-box">
        <p className="h4">Fleet 별 비행편 수</p>
        <table className="info-board">
          <colgroup>
            <col width="8%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
            <col width="7%" />
          </colgroup>
          <thead>
            <tr>
              <th>Fleet</th>
              <th>01</th>
              <th>02</th>
              <th>03</th>
              <th>04</th>
              <th>05</th>
              <th>06</th>
              <th>07</th>
              <th>08</th>
              <th>09</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            {list3.map((info, index) => {
              const {
                gubun,
                col01,
                col02,
                col03,
                col04,
                col05,
                col06,
                col07,
                col08,
                col09,
                col10,
                col11,
                col12,
                colTotal,
              } = info;
              let applyClassName = '';
              if (list3.length - 1 === index) {
                applyClassName = 'cons-bottom';
              }
              return (
                <tr key={index} className={applyClassName}>
                  <td>{gubun}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col01)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col02)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col03)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col04)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col05)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col06)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col07)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col08)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col09)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col10)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col11)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(col12)}</td>
                  <td className="right">{CommonUtil.convertNumberFormat(colTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/*//테이블영역 */}
    </>
  );
}

export default OpStatus;
