import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { EventJSX, FlightJSX } from '../aviation/report/forms/write';

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

const fdjslfjd = (
  <div className="tw-container tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4">

    <div className="tw-p-6 tw-bg-white tw-rounded-2xl">

      {/* 발생위치 */}
      <div className="tw-p-3">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">발생위치</label>
        <div className="tw-flex tw-gap-4">
          <input
            type="text"
            id="name"
            name="name"
            className="tw-tw-input tw-p-3 tw-border-solid tw-border tw-border-slate-400 tw-rounded-lg tw-w-full !tw-p-4"
          />
        </div>
      </div>

      {/* 발생공항 */}
      <div className="tw-p-3">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">발생공항</label>
        <div className="tw-flex tw-gap-4">
          <div className="tw-flex tw-grow">
            <input
              type="text"
              id="name"
              name="name"
              className="tw-tw-input tw-p-3 tw-border-solid tw-border tw-border-slate-400 tw-rounded-l-lg tw-w-full !tw-p-4"
            />
            <div className="tw-font-bold tw-flex tw-items-center tw-justify-center tw-border-solid tw-border-r tw-border-y tw-px-4 tw-rounded-r-lg tw-border-slate-400">검색</div>
          </div>
        </div>
      </div>

      {/* 제목 */}
      <div className="tw-p-3">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">제목</label>
        <input
          type="text"
          id="name"
          name="name"
          className="tw-tw-input tw-p-3 tw-border-solid tw-border tw-border-slate-400 tw-rounded-lg tw-w-full !tw-p-4"
        />
      </div>

      {/* 내용 */}
      <div className="tw-p-3">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">내용</label>
        <textarea
          id="name"
          name="name"
          className="tw-tw-input tw-h-80 tw-p-3 tw-border-solid tw-border tw-border-slate-400 tw-rounded-lg tw-w-full !tw-p-4"
        />
      </div>

      {/* 이벤트 */}
      <div className="tw-p-3">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">Event</label>
        <input
          type="button"
          id="name"
          name="name"
          value={"Bird or Lightning Strike, FOD, Hard/Crab Landing"}
          className="tw-tw-input tw-p-3 tw-border-solid tw-border tw-border-slate-400 tw-rounded-lg tw-w-full !tw-p-4"
        />
      </div>

      {/* 버튼 */}
      <div className="tw-gap-4 tw-flex tw-mt-4">
        <input
          type="button"
          id="name"
          value={"NEXT (2/4)"}
          name="name"
          className="tw-tw-input tw-p-5 tw-border tw-rounded-lg tw-w-full tw-bg-slate-900 tw-text-white"
        />
      </div>
    </div>
  </div>
)

export default function OfflineMain() {
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

      <div className="tw-bg-slate-300">
        <div className="tw-w-full tw-text-center av-report-list">
          <div className="">
            <div className="tw-row-span-3 xl:tw-row-span-1 md:tw-row-span-2">순번</div>
            <div className="">상태</div>
            <div className="">보고서 번호</div>
            <div className="">종류</div>
            <div className="">작성일</div>
            <div className="">발생일</div>
            <div className="tw-col-span-4 xl:tw-col-span-1 md:tw-col-span-4">제목</div>
            <div className="">작성자</div>
          </div>
          {
            (() => {
              const elements = Array.from({ length: 30 }, (_, index) => (
                <div className="">
                  <div className="tw-row-span-3 xl:tw-row-span-1 md:tw-row-span-2">{index + 1}</div>
                  <div className="">이관</div>
                  <div className="tw-col-span-3 sm:tw-col-span-1">ACO-3038</div>
                  <div className="">AOC</div>
                  <div className="tw-hidden sm:tw-block">2024-05-24</div>
                  <div className="tw-hidden sm:tw-block">2024-05-31</div>
                  <div className="tw-col-span-4 xl:tw-col-span-1 md:tw-col-span-4">제목입니다.제목입니다.제목입니다.제목입니다.제목제목입니다.제목제목입니다.제목제목입니다.제목제목입니다.제목제목입니다.제목</div>
                  <div className="">홍길동</div>
                </div>
              ));
              return elements
            })()
          }
        </div>
      </div>

    </div>
  );
}
