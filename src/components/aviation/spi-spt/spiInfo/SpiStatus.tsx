import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppSelect from '@/components/common/AppSelect';
import { useSpiInfoSpiStatusStore } from '@/stores/aviation/spi-spt/useSpiInfoStore';

// SPI OP Status component
function SpiStatus() {
  const state = useSpiInfoSpiStatusStore();

  const { searchParam, createChart, spiCodeSearch, spiCodeList, changeSearchInput, clear } = state;

  // input value에 넣기 위한 분리 선언
  const { year, spiType, multipleSelectValue } = searchParam;

  return (
    <>
      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid20">
            <div className="form-group wid100">
              <div className="date1">
                <AppDatePicker
                  label="연도"
                  value={year}
                  onChange={(value) => {
                    changeSearchInput('year', value);
                    spiCodeSearch();
                  }}
                  pickerType="year"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-cell wid20">
            <div className="form-group wid100">
              <AppCodeSelect
                label={'지표구분'}
                codeGrpId="CODE_GRP_113"
                value={spiType}
                onChange={(value) => {
                  changeSearchInput('spiType', value);
                  spiCodeSearch();
                }}
              />
            </div>
          </div>
          <div className="form-cell wid20">
            <div className="form-group wid100">
              <AppSelect
                label="지표명"
                isMultiple
                value={multipleSelectValue}
                options={spiCodeList}
                onChange={(value) => {
                  changeSearchInput('multipleSelectValue', value);
                }}
              />
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={createChart}>
              조회
            </button>
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={clear}>
              초기화
            </button>
          </div>
        </div>
      </div>
      {/* //검색영역 */}

      {/*지표정보*/}
      <div id="test">
        {/* <div className="Status-area" id="chartMain">
          <div className="Status-chart">
            <div className="Status-col">
              <p className="h4">
                Navigation Errors - In flight (SPT : <span>0.160</span>)
              </p>
              <div className="Chart-box">
                <canvas></canvas>
              </div>
            </div>
            <div className="Status-col">
              <p className="h4">
                Low speed RTO (SPT : <span>0.53</span>)
              </p>
              <div className="Chart-box">
                <canvas></canvas>
              </div>
            </div>
          </div>
          <div className="Status-chart">
            <div className="Status-col">
              <p className="h4">
                Diversion due to SCF (SPT : <span>0.114</span>)
              </p>
              <div className="Chart-box">
                <canvas></canvas>
              </div>
            </div>
            <div className="Status-col">
              <p className="h4">
                Navigation Error - Taxiway (SPT : <span>0.034</span>)
              </p>
              <div className="Chart-box">
                <canvas></canvas>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/*//지표정보 */}
    </>
  );
}

export default SpiStatus;
