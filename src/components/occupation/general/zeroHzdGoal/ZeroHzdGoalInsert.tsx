import { useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
//import AppDatePicker from '@/components/common/AppDatePicker';
//import AppSelect from '@/components/common/AppSelect';
import AppDatePicker from '@/components/common/AppDatePicker';

/* TODO : store 경로를 변경해주세요. */
import useOcuZeroHzdGoalFormStore from '@/stores/occupation/general/useOcuZeroHzdGoalFormStore';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuZeroHzdGoalInser() {
  /* formStore state input 변수 */
  // const { errors, changeInput, getDetail, formType, formValue, save, remove, cancel, clear } =
  const { errors, changeInput, formType, formValue, save, remove, cancel, clear } = useOcuZeroHzdGoalFormStore();

  const {
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
  } = formValue;

  //const { detailId } = useParams();

  useEffect(() => {
    // if (detailId && detailId !== 'add') {
    //   getDetail(detailId);
    // }
    return clear;
  }, []);

  // 개시일 변경시 (달성 목표일 조회)
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

  // 총 목표일수 변경시 (달성 목표일 조회)
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

  return (
    <>
      {/*경로 */}
      <div className="Breadcrumb">
        <ol>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">홈</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">안전관리</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">위험기계기구</a>
          </li>
        </ol>
      </div>
      {/*경로 */}
      <div className="conts-title">
        <h2>무재해운동</h2>
      </div>
      {/* 입력영역 */}
      <div className="editbox">
        <div className="form-table">
          <div className="form-table line">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label={'부서'}
                  value={zeroHzdDeptCd}
                  onChange={(value) => changeInput('zeroHzdDeptCd', value)}
                  required
                  disabled
                  errorMessage={errors.zeroHzdDeptCd}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="달성 목표 배수"
                inputType="number"
                required
                value={completGoalMltp}
                onChange={(value) => changeInput('completGoalMltp', value)}
                errorMessage={errors.completGoalMltp}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="총 목표일수"
                inputType="number"
                required
                value={mgntTotGoalDays}
                // onChange={(value) => changeInput('mgntTotGoalDays', value)}
                onChange={(value) => {
                  selectTotCompletGoalDt(value);
                }}
                errorMessage={errors.mgntTotGoalDays}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="기준 목표일수"
                inputType="number"
                required
                value={mgntStdGoalDays}
                onChange={(value) => changeInput('mgntStdGoalDays', value)}
                errorMessage={errors.mgntStdGoalDays}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="현 목표일수"
                inputType="number"
                required
                value={mgntCurrGoalDays}
                onChange={(value) => changeInput('mgntCurrGoalDays', value)}
                errorMessage={errors.mgntCurrGoalDays}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                label={'개시일'}
                value={mgntglStartDt}
                required
                // onChange={(value) => {
                //   changeInput('mgntglStartDt', value);
                // }}
                onChange={(value) => {
                  selectCompletGoalDt(value);
                }}
                errorMessage={errors.mgntglStartDt}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDatePicker
                label={'달성 목표일'}
                value={mgntglCompletGoalDt}
                required
                disabled
                onChange={(value) => {
                  changeInput('mgntglCompletGoalDt', value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          삭제
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          취소
        </button>
      </div>
    </>
  );
}
export default OcuZeroHzdGoalInser;
