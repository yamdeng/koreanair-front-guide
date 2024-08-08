import { useNavigate } from 'react-router-dom';
import { create, useStore } from 'zustand';
import { AttachmentJSX, EventJSX, FlightDetailJSX, FlightSearchJSX } from './components/WriteScreenComponent';
import { ReportButtonType1, ReportButtonType2 } from './forms/InputForms';
import { useEffect, useRef } from 'react';
import { MyReportWriteScreenViewModel } from './viewModels/MyReportWriteScreenViewModel';
import { AttachmentViewModel } from './viewModels/AttachmentViewModel';
import { v4 as uuidv4 } from 'uuid';
import { ModalDimmedScreen } from './forms/ModalScreen';
import { BottomSheetLayout, BottomSheetLayoutWhenWrite } from './forms/BottomSheet';

export default function MyReportWriteScreen(params) {

  const {
    init,
    currentFragment,
    cardFragmentClipEvent,
    onCancel,
    onNext
  } = useStore(MyReportWriteScreenViewModel, (state) => state) as any;

  const {
    initializeDB,
    createDB,
    fetchReport,
    reports,
    attachments,
    handleFileChange,
    getFormArray,
    removeFormFile,
    saveReport
  } = useStore(AttachmentViewModel, (state) => state) as any;

  const {
    info
  } = params

  // 보고서 초기화
  useEffect(() => {
    init(info)
  }, [params])

  const fileInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      await initializeDB();
      createDB();
      fetchReport();
    })()
  }, []);


  let baseTabStyleOn = `tw-px-3 tw-bg-slate-200 tw-py-3 tw-mx-2 tw-rounded-t-xl`;
  let baseTabStyleOff = `${baseTabStyleOn} tw-text-white tw-bg-slate-500`;

  return (
    <div className="tw-bg-slate-400 tw-rounded-2xl tw-p-10 tw-flex tw-flex-col tw-w-full">

      <div className="tw-flex tw-ml-10" key={uuidv4()}>
        {
          (() => {
            return info.step.map((element, index) => {
              return (
                <div key={uuidv4()} className={element.tab === currentFragment.tab ? baseTabStyleOn : baseTabStyleOff} onClick={() => cardFragmentClipEvent({ fragment: element })}>{element.tab}</div>
              )
            })
          })()
        }
      </div>

      <div className="tw-flex tw-flex-col tw-h-full tw-justify-end tw-relative">
        {/* height 0으로 잡아야 내부에서 스크롤 영역을 정확히 잡는데, 원인을 모르겠음 */}
        <div className="tw-grow tw-items-stretch tw-w-full tw-h-0">
          {
            (() => {

              switch (currentFragment.tab) {
                case "Flight": {
                  switch (currentFragment.sub) {
                    case "Search":
                      return (
                        <FlightSearchJSX />
                      )
                    case "Detail":
                      return (
                        <FlightDetailJSX />
                      )
                  }
                  break
                }
                case "Event": {
                  return (
                    <EventJSX
                      onSelectFieldEvent={
                        () => { }
                      }
                    />
                  )
                }
                case "Attachment": {
                  return (
                    <AttachmentJSX
                      fileInputRef={fileInputRef}
                      handleFileChange={handleFileChange}
                      getFormArray={getFormArray}
                      removeFormFile={removeFormFile}
                      saveReport={saveReport}
                      reports={reports}
                      attachments={attachments}
                    />
                  )
                }
                case "Finish": {
                  return (
                    <AttachmentJSX
                      fileInputRef={fileInputRef}
                      handleFileChange={handleFileChange}
                      getFormArray={getFormArray}
                      removeFormFile={removeFormFile}
                      saveReport={saveReport}
                      reports={reports}
                      attachments={attachments}
                    />
                  )
                }
              }
            })()
          }
        </div>
        {/* 버튼 */}
        <div className="tw-grow-0">
          <div className="tw-flex tw-gap-4 tw-w-full">
            <ReportButtonType1 className="tw-w-full tw-grow" text="이전" onClick={onCancel} />
            <ReportButtonType1 className="tw-w-full tw-grow" text="다음" onClick={onNext} />
          </div>
        </div>


        {
          (() => {

            const html = (
              <div key={uuidv4()} className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
                {/* 보고서 종류 */}
                <div className="tw-w-full tw-pb-6 tw-text-3xl">
                  Event
                </div>
                <div className="tw-gap-4 tw-flex tw-flex-col xl:tw-flex-row">
                <ReportButtonType2 text="dfsf" />
                <ReportButtonType2 text="dfsf" />
                <ReportButtonType2 text="dfsf" />
                <ReportButtonType2 text="dfsf" />
                <ReportButtonType2 text="dfsf" />
                <ReportButtonType2 text="dfsf" />
                </div>
              </div>
            )

            return BottomSheetLayoutWhenWrite({ isShow: true, jsx: () => { return html }, onClose: () => { } })
          })()
        }
      </div>

    </div>
  );
}
