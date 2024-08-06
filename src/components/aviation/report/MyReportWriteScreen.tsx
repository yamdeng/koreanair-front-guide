import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { EventJSX, FlightJSX } from './components/WriteScreenComponent';

const initailState = {
  currentFragment: 'FLIGHT',
  cardFragmentClipEvent: (type) => { }
};

const writeReport = create<any>((set, get) => ({
  ...initailState,
  cardFragmentClipEvent: (type) => {
    console.log(type)
    set({ currentFragment: type })
  }
}))

export default function MyReportWriteScreen() {
  const navigate = useNavigate();

  const {
    currentFragment,
    cardFragmentClipEvent
  } = writeReport()

  let baseTabStyleOn = `tw-px-3 tw-bg-slate-200 tw-py-3 tw-mx-2 tw-rounded-t-xl`;
  let baseTabStyleOff = `${baseTabStyleOn} tw-text-white tw-bg-slate-500`;

  return (
    <div className="tw-bg-slate-400 tw-rounded-2xl tw-p-10">

      <div className="tw-flex tw-w-full tw-gap-5">

        <div className="tw-grow tw-bg-slate-200 tw-rounded-2xl tw-p-4 tw-mt-4 tw-mb-12">
          <div className="tw-flex tw-text-center">
            <div className="tw-rounded-l-md tw-grow tw-bg-sky-300 tw-p-2">작성중 10건</div>
            <div className="tw-grow tw-bg-sky-400 tw-p-2">제출완료 9건</div>
            <div className="tw-grow tw-bg-sky-500 tw-p-2">접수중 5건 / 반려 2건</div>
            <div className="tw-grow tw-bg-sky-600 tw-p-2 tw-text-white">처리중 4건</div>
            <div className="tw-rounded-r-md tw-grow tw-bg-sky-900 tw-text-white tw-p-2">종결 2건</div>
          </div>
        </div>
        
        <div className="tw-grow-0 tw-bg-slate-200 tw-rounded-2xl tw-p-4 tw-mt-4 tw-mb-12">
          <div className="tw-flex tw-text-center">
            <div className="tw-rounded-md tw-grow tw-bg-red-700 tw-p-2 tw-text-white">이관 10건</div>
          </div>
        </div>

      </div>

      <div className="tw-flex tw-ml-10">
        <div className={currentFragment === 'FLIGHT' ? baseTabStyleOn : baseTabStyleOff} onClick={() => cardFragmentClipEvent("FLIGHT")}>Flight</div>
        <div className={currentFragment === 'EVENT' ? baseTabStyleOn : baseTabStyleOff} onClick={() => cardFragmentClipEvent("EVENT")}>Event</div>
        <div className={currentFragment === 'ATTACHMENT' ? baseTabStyleOn : baseTabStyleOff} onClick={() => cardFragmentClipEvent("ATTACHMENT")}>Attachment</div>
      </div>

      {
        (() => {
          switch (currentFragment) {
            case "FLIGHT": return FlightJSX
            case "EVENT": return EventJSX
          }
        })()
      }

    </div>
  );
}
