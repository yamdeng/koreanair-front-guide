import AppAutoComplete from '@/components/common/AppAutoComplete';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppNavigation from '@/components/common/AppNavigation';
import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import AppTimePicker from '@/components/common/AppTimePicker';

function ReportASREditForm() {
  return (
    <>
      <AppNavigation appendTitleList={['ASR']} />

      <div className="info-wrap toggle">
        <dl>
          {/* 비행정보 */}
          {/* toggle 선택되면  열어지면 active붙임*/}
          <dt>
            <button type="button" className="btn-tg">
              {/* TODO : active 처리 */}
              비행정보<span className={'active'}></span>
              <div className="tag-info-wrap-end">
                <div className="tip">
                  <div>
                    <a href="javascript:void(0);" className="txt">
                      작성 예시
                    </a>
                  </div>
                </div>
                <div className="tip">
                  <div>
                    <a href="javascript:void(0);" className="txt">
                      의무보고의범위
                    </a>
                  </div>
                </div>
              </div>
            </button>
          </dt>
          {/* TODO : display none 처리 */}
          <dd className="tg-conts" style={{ display: '' }}>
            <div className="edit-area">
              <div className="detail-form">
                <div className="detail-list">
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <div className="df">
                          <div className="type3">
                            <AppDatePicker label="출발일자" />
                          </div>
                          <div className="type4">
                            <AppSelect label={'UTC'} disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group va-t ant-input wid100">
                        <span className="ant-input-group-addon1">KE</span>
                        <div className="ant-input-group-addon1-input wid50 df">
                          {/*비행편명 */}
                          <AppTextInput label="비행편명" required />
                          <div className="btn-area">
                            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <div className="form-group va-t ant-input wid100">
                        <span className="ant-input-group-addon1">HL</span>
                        <div className="ant-input-group-addon1-input wid50">
                          {/*등록번호 */}
                          <AppTextInput label="등록번호" required />
                        </div>
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*항공기유형 */}
                        <AppSelect label="항공기유형" required />
                      </div>
                    </div>
                  </div>
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*출발지 */}
                        <AppAutoComplete label="출발지" required />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*도착지 */}
                        <AppAutoComplete label="도착지" required />
                      </div>
                    </div>
                  </div>
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*Divert */}
                        <AppAutoComplete label="Divert" />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*STD */}
                        <AppTimePicker label={'STD'} showNow={true} needConfirm={true} />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*STA */}
                        <AppTimePicker label={'STA'} showNow={true} needConfirm={true} />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*ATD */}
                        <AppTimePicker label={'ATD'} showNow={true} needConfirm={true} />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*ATA */}
                        <AppTimePicker label={'ATA'} showNow={true} needConfirm={true} />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        {/*Delay */}
                        <AppTextInput inputType={'number'} label="Delay" />
                      </div>
                    </div>
                  </div>
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput label="공급(F/C/Y)" />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput label="체크인(금/토/일)" />
                      </div>
                    </div>
                  </div>
                  <div className="form-table">
                    <div className="form-cell wid50">
                      <div className="form-group wid50">
                        <div className="UserChicebox Flight error">
                          <div className="form-group wid100">
                            <AppAutoComplete label="d" />
                            <label htmlFor="file" className="file-label">
                              비행승무원 <span className="required"></span>
                            </label>
                            <div className="SelectedList memberClass mt10">
                              <ul>
                                <li>
                                  <span className="InfoBox"></span>
                                  <div className="Info">
                                    <div className="Name">홍길동 (170****)</div>
                                    <div className="Dept">상무대우수석사무장 / (주)대한항공</div>
                                  </div>
                                  {/*<span className="class leader">Leader</span>*/}
                                  <a href="javascript:void(0);">
                                    <span className="delete">X</span>
                                  </a>
                                </li>
                                <li>
                                  <span className="InfoBox"></span>
                                  <div className="Info">
                                    <div className="Name">홍길동 (170****)</div>
                                    <div className="Dept">상무대우수석사무장 / (주)대한항공</div>
                                  </div>
                                  {/*<span className="class ">Leader</span>*/}
                                  <a href="javascript:void(0);">
                                    <span className="delete">X</span>
                                  </a>
                                </li>
                                <li>
                                  <span className="InfoBox"></span>
                                  <div className="Info">
                                    <div className="Name">홍길동 (170****)</div>
                                    <div className="Dept">상무대우수석사무장 / (주)대한항공</div>
                                  </div>
                                  {/*<span className="class ">Leader</span>*/}
                                  <a href="javascript:void(0);">
                                    <span className="delete">X</span>
                                  </a>
                                </li>
                                <li>
                                  <span className="InfoBox"></span>
                                  <div className="Info">
                                    <div className="Name">홍길동 (170****)</div>
                                    <div className="Dept">상무대우수석사무장 / (주)대한항공</div>
                                  </div>
                                  {/*<span className="class ">Leader</span>*/}
                                  <a href="javascript:void(0);">
                                    <span className="delete">X</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </div>

      {/* 하단버튼영역 */}
      <div className="contents-btns">
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm">
          출력
        </button>
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm">
          저장
        </button>
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_conblue">
          제출
        </button>
      </div>
    </>
  );
}
export default ReportASREditForm;
