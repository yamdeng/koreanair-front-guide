import { useState, useEffect } from 'react';
//import AppNavigation from '@/components/common/AppNavigation';
import CommonUtil from '@/utils/CommonUtil';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import AppDatePicker from '@/components/common/AppDatePicker';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';
import AppTable from '@/components/common/AppTable';
import ZeroHzdGoalFormModal from '@/components/modal/occupation/ZeroHzdGoalFormModal';

/* TODO : store 경로를 변경해주세요. */
import useOcuZeroHzdFormStore from '@/stores/occupation/general/useOcuZeroHzdFormStore';

const DeleteActionButton = (props) => {
  const { node, onClick } = props;
  const { rowIndex } = node;
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopPropagation();
    onClick(rowIndex);
  };
  return <div onClick={handleClick}>삭제</div>;
};
/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuZeroHzdGoalForm() {
  /* formStore state input 변수 */
  const {
    search,
    errors,
    changeInput,
    getDetail,
    formType,
    formValue,
    isDirty,
    saveCodeDetail,
    remove,
    cancel,
    clear,
    list,
    removeByIndex,
    openFormModal,
    isCodeFormModalOpen,
    closeFormModal,
    okModal,
  } = useOcuZeroHzdFormStore();

  const customButtons = [
    {
      title: '행추가',
      onClick: () => {
        alert('행추가');
      },
    },
    {
      title: '전체삭제',
      onClick: () => {
        alert('전체삭제');
      },
    },
  ];

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

  const { detailId } = useParams();

  const [columns, setColumns] = useState(
    CommonUtil.mergeColumnInfosByLocal([
      { field: 'statMltp', headerName: '배수' },
      { field: 'statStartDt', headerName: '개시일' },
      { field: 'statCmpltGoalDt', headerName: '달성 목표일' },
      { field: 'currMltpGoalDt', headerName: '현 배수 목표일' },
      { field: 'statTotGoalDays', headerName: '총 목표일수' },
      { field: 'statFailDt', headerName: '실패일' },
      { field: 'statRemark', headerName: '비고(실패사유)' },
      {
        pinned: 'right',
        field: 'action',
        headerName: '',
        cellRenderer: 'deleteActionButton',
        cellRendererParams: {
          onClick: removeByIndex,
        },
      },
    ])
  );

  //useFormDirtyCheck(isDirty);

  const init = async () => {
    await getDetail(detailId);
    search();
  };

  useEffect(() => {
    init();
    return clear;

    // if (detailId && detailId !== 'add') {
    //   getDetail(detailId);
    // }
    // return clear;
  }, []);

  // 무재해 운동 시작
  const zeroHzdStart = () => {
    //
    openFormModal(null);
  };

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
      {/*//상세-수정*/}
      {/* 버튼영역 */}
      <div className="btn-area mb-10">
        <button
          type="button"
          name="button"
          className="btn_text text_color_neutral-10 btn_confirm"
          onClick={zeroHzdStart}
        >
          무재해운동 시작
        </button>
      </div>
      {/*//버튼영역*/}
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="부서"
                value={zeroHzdDeptCd}
                onChange={(value) => changeInput('zeroHzdDeptCd', value)}
                required
                disabled
                errorMessage={errors.zeroHzdDeptCd}
              />
            </div>
          </div>

          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="달성 목표 배수"
                value={completGoalMltp}
                onChange={(value) => changeInput('completGoalMltp', value)}
                inputType="number"
                required
                errorMessage={errors.completGoalMltp}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="총 목표일수"
                inputType="number"
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
                label="기준 목표일수"
                inputType="number"
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
              <AppTextInput
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
      {/*그리드영역 상단상위표출체크시 번호-아이콘으로 표시 아이콘명:pin.svg */}
      <div className="mt-30">
        <h3 className="table-tit">무재해운동 이력</h3>
        <AppTable
          rowData={list}
          columns={columns}
          setColumns={setColumns}
          // customButtons={customButtons}
          components={{
            deleteActionButton: DeleteActionButton,
          }}
        />
      </div>

      <ZeroHzdGoalFormModal isOpen={isCodeFormModalOpen} closeModal={closeFormModal} ok={okModal} />

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={saveCodeDetail}>
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
export default OcuZeroHzdGoalForm;
