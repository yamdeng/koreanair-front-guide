import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { ReportButtonType1, SearchSheetJSX } from './forms/write';

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

export default function MyReportListScreen() {
  const navigate = useNavigate();

  return (
    <div className="tw-flex tw-relative tw-w-fulltw-bg-white tw-rounded-lg">

      <div className="tw-flex tw-flex-col tw-bg-slate-400 tw-rounded-2xl tw-p-10">

        <div className="tw-flex tw-w-full tw-gap-5 tw-hidden">

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

        <div className="">
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
          <div className="tw-gap-4 tw-flex tw-mt-4">
            <input
              type="button"
              id="name"
              value={"더보기"}
              name="name"
              className="av-button-2"
            />
          </div>

        </div>

        {ReportButtonType1("조회조건 설정")}

      </div>

      {/* <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-70 tw-rounded-lg"></div>
      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-text-white tw-rounded-t-lg tw-shadow-lg">
        {SearchSheetJSX}
      </div> */}

    </div>
  );
}
