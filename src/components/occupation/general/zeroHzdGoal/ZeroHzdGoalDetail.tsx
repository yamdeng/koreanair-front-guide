import { useState, useEffect } from 'react';
// import AppNavigation from '@/components/common/AppNavigation';
//import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import { useParams } from 'react-router-dom';
//import AppTextInput from '@/components/common/AppTextInput';
import CommonUtil from '@/utils/CommonUtil';
import ModalService from '@/services/ModalService';
// import Config from '@/config/Config';
// import i18n from '@/services/i18n';

/* TODO : store 경로를 변경해주세요. */
import useOcuZeroHzdFormStore from '@/stores/occupation/general/useOcuZeroHzdFormStore';
import AppTable from '@/components/common/AppTable';

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

/* TODO : 컴포넌트 이름을 확인해주세요 */
function OcuZeroHzdGoalDetail() {
  /* formStore state input 변수 */
  const { search, detailInfo, getDetail, formType, cancel, goFormPage, clear, list } = useOcuZeroHzdFormStore();
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
    openFormModal,
  } = detailInfo;

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
    ])
  );

  const init = async () => {
    await getDetail(detailId);
    search();
  };

  useEffect(() => {
    init();
    return clear;
  }, []);

  // // 무재해 운동 시작
  // const zeroHzdStart = () => {
  //   openFormModal(null);
  // };

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
      {/*상세페이지*/}
      {/* 버튼영역 */}
      {/* <div className="btn-area mb-10">
        <button
          type="button"
          name="button"
          className="btn_text text_color_neutral-10 btn_confirm"
          onClick={zeroHzdStart}
        >
          무재해운동 시작
        </button>
      </div> */}
      {/*//버튼영역*/}
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">부서</label>
                    <span className="text-desc-type1">{zeroHzdDeptCd}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">달성 목표 배수</label>
                    <span className="text-desc-type1">{completGoalMltp}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">총 목표일수</label>
                    <span className="text-desc-type1">{mgntTotGoalDays}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">기준 목표일수</label>
                    <span className="text-desc-type1">{mgntStdGoalDays}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">현 목표일수</label>
                    <span className="text-desc-type1">{mgntCurrGoalDays}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">개시일</label>
                    <span className="text-desc-type1">{mgntglStartDt}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">달성 목표일</label>
                    <span className="text-desc-type1">{mgntglCompletGoalDt}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
      </div>
      {/*그리드영역 상단상위표출체크시 번호-아이콘으로 표시 아이콘명:pin.svg */}
      <div className="mt-30">
        <h3 className="table-tit">무재해운동 이력</h3>
        <AppTable rowData={list} columns={columns} setColumns={setColumns} />
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          목록으로
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={goFormPage}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          수정
        </button>
      </div>
    </>
  );
}
export default OcuZeroHzdGoalDetail;
