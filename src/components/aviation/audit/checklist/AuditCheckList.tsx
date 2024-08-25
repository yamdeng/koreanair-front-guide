import { useEffect } from 'react';
import useCheckListStore from '@/stores/aviation/audit/checklist/useCheckListStore';
import AuditCheckListModal from './AuditCheckListModal';

function AuditCheckList() {
  const {
    getDivisionList, // 부문 조회
    dsDivisionList, // 부문 데이터
    currentTabIndex,
    changeTabIndex,
    getAuditCheckList, // 체크리스트 조회
    dsAuditChecklist, // 체크리스트 데이터
    isCheckListFormModal,
    openCheckListFormModal,
    closeCheckListFormModal,
    okModal,
    clear,
  } = useCheckListStore();

  const init = async () => {
    getDivisionList();
    getAuditCheckList();
  };

  useEffect(() => {
    init();
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <div className="Breadcrumb">
        <ol>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">홈222</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">AUDIT</a>
          </li>
          <li className="breadcrumb-item">
            <a href="javascript:void(0);">Checklist</a>
          </li>
        </ol>
      </div>
      {/*경로 */}
      {/*탭 */}
      <div className="menu-tab-nav">
        <div className="swiper-container">
          <div className="menu-tab">
            {dsDivisionList.map((tabInfo, index) => {
              const { codeNameKor } = tabInfo;
              return (
                <a
                  key={codeNameKor}
                  href="javascript:void(0);"
                  className={currentTabIndex === index ? 'active' : ''}
                  data-label={codeNameKor}
                  onClick={() => changeTabIndex(index)}
                >
                  {codeNameKor}
                  {/* <button type="button" className="tabs-tab-remove">
                    <span className="delete">X</span>
                  </button> */}
                </a>
              );
            })}
          </div>
          <div className="menu-tab-nav-operations">
            <button type="button" name="button" className="menu-tab-nav-more">
              <span className="hide">더보기</span>
            </button>
          </div>
        </div>
      </div>

      {/*검색영역 */}
      <div className="btn-area">
        <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line">
          Checklist Upload
        </button>
        <button
          type="button"
          name="button"
          className="btn-sm btn_text btn-darkblue-line"
          onClick={openCheckListFormModal}
        >
          Add Checklist
        </button>
      </div>
      {/* //검색영역 */}

      <div className="checklist-contents">
        {dsAuditChecklist.map((checklistInfo) => {
          const { checklistId, checklistName, chapters } = checklistInfo;
          return (
            <div key={checklistId} className="checklist-row list">
              <div className="checklist-col">
                <h4>
                  <label>
                    <button type="button" name="button" className="btn-list">
                      <span className="hide">등록</span>
                    </button>
                    <a href="javascript:void(0);">
                      <span>{checklistName}</span>
                    </a>
                  </label>
                </h4>
                <ul>
                  {chapters.map((chapterInfo) => {
                    const { chapterId, chapterOriginId, questionCount, chapterName } = chapterInfo;
                    return (
                      <li key={chapterId} className="list-space">
                        <button type="button" className="btn-list editChapter">
                          <span className="hide">등록</span>
                        </button>
                        <a href="javascript:void(0);">
                          {chapterName} <i>({questionCount})</i>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <AuditCheckListModal
        isOpen={isCheckListFormModal}
        closeModal={closeCheckListFormModal}
        ok={(formValue) => okModal(formValue)}
      />
    </>
  );
}

export default AuditCheckList;
