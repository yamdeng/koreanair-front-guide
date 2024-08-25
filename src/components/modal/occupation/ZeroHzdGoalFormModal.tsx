import AppTextInput from '@/components/common/AppTextInput';
//import useSysCodeFormStore from '@/stores/admin/useSysCodeFormStore';
import AppAutoComplete from '@/components/common/AppAutoComplete';
import AppDatePicker from '@/components/common/AppDatePicker';

import { useOcuZeroHzdGoalModalFormStore } from '@/stores/occupation/general/useOcuZeroHzdFormStore';

import Modal from 'react-modal';

const formName = 'ZeroHzdGoalFormModal';

function ZeroHzdGoalFormModal(props) {
  const { isOpen, closeModal, ok } = props;

  const { formValue, errors, changeInput, save } = useOcuZeroHzdGoalModalFormStore();

  const {
    /** 무재해 목표 **/

    // 부서
    zeroHzdDeptCd,
    // 달성 목표 배수
    completGoalMltp,
    // 총 목표일수
    mgntTotGoalDays,
    // 기준 목표일수
    mgntStdGoalDays,
    // 현 목표일수
    mgntCurrGoalDays,
    // 개시일
    mgntglStartDt,
    // 달성 목표일
    mgntglCompletGoalDt,

    /** 무재해 이력**/

    // 배수
    statMltp,
    // 개시일
    statStartDt,
    // 달성 목표일
    statCmpltGoalDt,
    // 현 배수 목표일
    currMltpGoalDt,
    // 총 목표일수
    statTotGoalDays,
    // 실패일
    statFailDt,
    // 비고
    statRemark,
  } = formValue;

  // 계획 개시일 변경시 (달성 목표일 조회)
  const selectCompletGoalDt = (v) => {
    /*  개시일 + 총 목표일수 */

    if (v == '') {
      formValue.mgntglCompletGoalDt = '';
    } else {
      // 총 목표일수
      const mgntTotGoalDays = formValue.mgntTotGoalDays;

      // 총 목표일수가 있는 경우
      if (mgntTotGoalDays != '') {
        // 시작 날짜 설정
        const start = new Date(v);
        // 추가하려는 일수 계산 (mgntTotGoalDays: 총 목표일수)
        const futureDate = new Date(start.getTime() + mgntTotGoalDays * 24 * 60 * 60 * 1000);
        const formattedDate = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

        formValue.mgntglCompletGoalDt = formattedDate;
      }
    }

    changeInput('mgntglStartDt', v);
  };

  // 계획 총 목표일수 변경시 (달성 목표일 조회)
  const selectTotCompletGoalDt = (v) => {
    /*  개시일 + 총 목표일수 */

    if (v == '') {
      formValue.mgntglCompletGoalDt = '';
    } else {
      // 개시일
      const mgntglStartDt = formValue.mgntglStartDt;

      // 개시일자 있는 경우
      if (mgntglStartDt != '') {
        // 시작 날짜 설정
        const start = new Date(mgntglStartDt);
        // 추가하려는 일수 계산 (mgntTotGoalDays: 총 목표일수)
        const futureDate = new Date(start.getTime() + v * 24 * 60 * 60 * 1000);
        const formattedDate = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

        formValue.mgntglCompletGoalDt = formattedDate;
      }
    }

    changeInput('mgntTotGoalDays', v);
  };

  // 이력 개시일 변경시 (달성 목표일 조회)
  const selectCompletStatusDt = (v) => {
    /*  개시일 + 총 목표일수 */

    if (v == '') {
      formValue.statCmpltGoalDt = '';
    } else {
      // 총 목표일수
      const statTotGoalDays = formValue.statTotGoalDays;

      // 총 목표일수가 있는 경우
      if (statTotGoalDays != '') {
        // 시작 날짜 설정
        const start = new Date(v);
        // 추가하려는 일수 계산 (statTotGoalDays: 총 목표일수)
        const futureDate = new Date(start.getTime() + statTotGoalDays * 24 * 60 * 60 * 1000);
        const formattedDate = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

        formValue.statCmpltGoalDt = formattedDate;
      }
    }

    changeInput('statStartDt', v);
  };

  // 이력 총 목표일수 변경시 (달성 목표일 조회)
  const selectTotCompletStatusDt = (v) => {
    /*  개시일 + 총 목표일수 */

    if (v == '') {
      formValue.statCmpltGoalDt = '';
    } else {
      // 개시일
      const statStartDt = formValue.statStartDt;

      console.log('개시일 statStartDt==>', statStartDt);

      // 개시일자 있는 경우
      if (statStartDt != '') {
        // 시작 날짜 설정
        const start = new Date(statStartDt);
        // 추가하려는 일수 계산 (statTotGoalDays: 총 목표일수)
        const futureDate = new Date(start.getTime() + v * 24 * 60 * 60 * 1000);
        const formattedDate = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

        formValue.statCmpltGoalDt = formattedDate;
      }
    }

    changeInput('statTotGoalDays', v);
  };

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={'middle-modal-overlay'}
      className={'list-common-modal-content'}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <div className="popup-container">
        <h3 className="pop_title">무재해운동 시작</h3>
        <div className="pop_lg_cont_box">
          <div className="pop_flex_group">
            <div className="pop_cont_form">
              {/*등록 */}
              <div className="editbox">
                <div className="form-table line">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id={`${formName}zeroHzdDeptCd`}
                        label={'부서'}
                        value={zeroHzdDeptCd}
                        onChange={(value) => changeInput('zeroHzdDeptCd', value)}
                        required
                        errorMessage={errors.zeroHzdDeptCd}
                      />
                    </div>
                  </div>
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id={`${formName}completGoalMltp`}
                        label="달성 목표 배수"
                        value={completGoalMltp}
                        onChange={(value) => changeInput('completGoalMltp', value)}
                        required
                        errorMessage={errors.completGoalMltp}
                      />
                    </div>
                  </div>
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id={`${formName}mgntTotGoalDays`}
                        label="총 목표일수"
                        value={mgntTotGoalDays}
                        onChange={(value) => {
                          selectTotCompletGoalDt(value);
                        }}
                        required
                        errorMessage={errors.mgntTotGoalDays}
                      />
                    </div>
                  </div>
                </div>

                <hr className="line dp-n"></hr>
                <div className="form-table line">
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id={`${formName}mgntStdGoalDays`}
                        label="기준 목표일수"
                        value={mgntStdGoalDays}
                        onChange={(value) => changeInput('mgntStdGoalDays', value)}
                        required
                        errorMessage={errors.mgntStdGoalDays}
                      />
                    </div>
                  </div>
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppTextInput
                        id={`${formName}mgntCurrGoalDays`}
                        label="현 목표일수"
                        value={mgntCurrGoalDays}
                        onChange={(value) => changeInput('mgntCurrGoalDays', value)}
                        required
                        errorMessage={errors.mgntCurrGoalDays}
                      />
                    </div>
                  </div>
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppDatePicker
                        id={`${formName}mgntglStartDt`}
                        label={'개시일'}
                        value={mgntglStartDt}
                        onChange={(value) => {
                          selectCompletGoalDt(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-cell wid50">
                    <div className="form-group wid100">
                      <AppDatePicker
                        id={`${formName}mgntglCompletGoalDt`}
                        label={'달성 목표일'}
                        value={mgntglCompletGoalDt}
                        onChange={(value) => {
                          changeInput('mgntglCompletGoalDt', value);
                        }}
                        required
                        disabled
                        errorMessage={errors.mgntglCompletGoalDt}
                      />
                    </div>
                  </div>
                </div>
                <hr className="line dp-n"></hr>
              </div>
              {/*//등록 */}
              {/* 입력폼 */}
              <div className="mt-30">
                <h3 className="table-tit">무재해운동 이력</h3>
                <div className="editbox">
                  <div className="form-table line">
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput
                          id={`${formName}statMltp`}
                          inputType="number"
                          label={'배수'}
                          value={statMltp}
                          onChange={(value) => changeInput('statMltp', value)}
                          errorMessage={errors.statMltp}
                        />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppDatePicker
                          id={`${formName}statStartDt`}
                          label={'개시일'}
                          value={statStartDt}
                          onChange={(value) => {
                            selectCompletStatusDt(value);
                          }}
                          // onChange={(value) => {
                          //   changeInput('statStartDt', value);
                          // }}
                          required
                          errorMessage={errors.statStartDt}
                        />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppDatePicker
                          id={`${formName}statCmpltGoalDt`}
                          label={'달성 목표일'}
                          value={statCmpltGoalDt}
                          onChange={(value) => changeInput('statCmpltGoalDt', value)}
                          errorMessage={errors.statCmpltGoalDt}
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput
                          id={`${formName}currMltpGoalDt`}
                          inputType="number"
                          label={'현 배수 목표일'}
                          value={currMltpGoalDt}
                          onChange={(value) => changeInput('currMltpGoalDt', value)}
                          errorMessage={errors.currMltpGoalDt}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="line dp-n"></hr>
                  <div className="form-table line">
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput
                          id={`${formName}statTotGoalDays`}
                          inputType="number"
                          label={'총 목표일수'}
                          value={statTotGoalDays}
                          onChange={(value) => {
                            selectTotCompletStatusDt(value);
                          }}
                          // onChange={(value) => changeInput('statTotGoalDays', value)}
                          errorMessage={errors.statTotGoalDays}
                        />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput
                          id={`${formName}statFailDt`}
                          label={'실패일'}
                          value={statFailDt}
                          onChange={(value) => changeInput('statFailDt', value)}
                          errorMessage={errors.statFailDt}
                        />
                      </div>
                    </div>
                    <div className="form-cell wid50">
                      <div className="form-group wid100">
                        <AppTextInput
                          id={`${formName}statRemark`}
                          label={'비고(실패사유)'}
                          value={statRemark}
                          onChange={(value) => changeInput('statRemark', value)}
                          errorMessage={errors.statRemark}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="line dp-n"></hr>
                </div>
              </div>
              {/*//입력폼 */}
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text text_color_neutral-90 btn_close" onClick={closeModal}>
            취소
          </button>
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
            저장
          </button>
        </div>
        <span className="pop_close" onClick={closeModal}>
          X
        </span>
      </div>
    </Modal>
  );
}

export default ZeroHzdGoalFormModal;
