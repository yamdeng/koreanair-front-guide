import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FilterConditionItem } from './components/ListScreenComponent';
import { BottomSheetLayout } from './forms/BottomSheet';
import { ReportButtonType1 } from './forms/InputForms';
import { ModalDimmedScreen } from './forms/ModalScreen';
import { MyReportListScreenViewModel } from './viewModels/MyReportListScreenViewModel';

export default function MyReportListScreen() {
  const { sheetList, finalFilter, addSheetSettingFilter, onClose, addReport, removeFilter, modalPage, goWriteReport } =
    MyReportListScreenViewModel() as any;

  //const _ = MyReportWriteScreenViewModel() as any

  //MyReportWriteScreenViewModel()

  // {
  //   finished: (path) => {

  //     const screen = MyReportWriteScreen()

  //     // showModal({ contents: screen })
  //   }
  // }
  useEffect(() => {
    addReport();

    setTimeout(() => {
      goWriteReport();
    }, 400);
  }, []);

  return (
    <div className="tw-flex tw-relative tw-w-full tw-bg-slate-400 tw-rounded-2xl" key={uuidv4()}>
      <div className="tw-flex tw-flex-col tw-w-full tw-p-4" key={uuidv4()}>
        {/* 리스트 상단 헤더 */}
        <div className="tw-bg-[#051766] tw-rounded-t-2xl">
          <div className="tw-flex tw-justify-between tw-pt-8 tw-pb-4 tw-px-6 tw-justify-center tw-items-center">
            <h1 className="tw-text-[2.5rem] tw-font-light tw-text-white">My Report</h1>
            <input
              type="button"
              id="name"
              name="name"
              value="신규"
              onClick={addReport}
              className="tw-py-2 tw-px-5 tw-text-[#009BFA] tw-text-[1.4rem] tw-font-bold tw-rounded-full tw-bg-white tw-border-[#009BFA] tw-border-solid tw-border-[1px]"
            />
          </div>

          {/* 중간 회색 라인 */}
          <div className="tw-mx-6 tw-flex tw-bg-[#777FB0] tw-h-[1px]"></div>

          {/* 검색 키워드 */}
          <div className="tw-px-6 tw-py-4 tw-flex tw-grid-flow-col tw-flex-wrap">
            {
              // 보고서 종류, 상태, 제목 조건 표시
              (() => {
                Object.entries(finalFilter).map(([key, value]) => {
                  console.log(`key: ${key}, value: ${value}`);
                });

                const keysToRemove = ['dateFrom', 'dateTo'];

                const filteredfinalFilter = Object.fromEntries(
                  Object.entries(finalFilter).filter(([key]) => !keysToRemove.includes(key))
                );

                const elements = Object.entries(filteredfinalFilter).map(([key, value]) => {
                  if (key === 'reportCategory' && value === '') {
                    return <></>;
                  }

                  if (key === 'subject' && value === '') {
                    return <></>;
                  }

                  if (key === 'reportStatus' && value === '') {
                    return <></>;
                  }

                  return (
                    <FilterConditionItem
                      key={key}
                      onClick={() => {
                        removeFilter(key);
                      }}
                      text={finalFilter[key]}
                    />
                  );
                });
                return elements;
              })()
            }

            {
              // 날짜 조건 표시
              (() => {
                return (
                  finalFilter.dateFrom &&
                  finalFilter.dateTo && (
                    <FilterConditionItem
                      onClick={() => {
                        removeFilter('date');
                      }}
                      text={`${finalFilter.dateFrom} ~ ${finalFilter.dateTo}`}
                    />
                  )
                );
              })()
            }
          </div>
        </div>

        {/* 중간 회색 Divider */}
        <div className="tw-h-4 tw-bg-slate-200" key={uuidv4()}></div>

        {/* 제출완료 단계 표시 */}
        <div className="tw-flex tw-w-full tw-gap-5 tw-hidden" key={uuidv4()}>
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

        {/* 보고서 리스트 시작 */}
        <div className="tw-bg-white" key={uuidv4()}>
          <div className="tw-w-full tw-text-center av-report-list tw-divide-y tw-divide-[#eeeeee]">
            {/* <div className="">
              <div className="tw-row-span-2">순번</div>
              <div className="tw-col-span-2">제목</div>
              <div className="">종류 / 보고서 번호</div>
              <div className="tw-col-span-2">작성일 / 발생일</div>
              <div className="">제목</div>
              <div className="">작성자</div>
            </div> */}
            {(() => {
              const elements = Array.from({ length: 10 }, (_, index) => (
                <div className="tw-py-4" key={uuidv4()}>
                  <div className="tw-row-span-2 tw-leading-8">{index + 1}</div>
                  <div className="tw-leading-8 tw-px-2">
                    제목입니다.제목입니다.제목입니다.제목입니다.제목제목입니다.제목제목입니다.
                  </div>
                  <div className="tw-row-span-2 tw-flex tw-items-center tw-justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.67194 0.636408C10.0234 0.284936 10.5933 0.284936 10.9447 0.636407L19.2732 8.96485C20.0152 9.70684 20.0152 10.9099 19.2732 11.6519L10.9447 19.9803C10.5933 20.3318 10.0234 20.3318 9.67194 19.9803C9.32047 19.6288 9.32047 19.059 9.67194 18.7075L18.0004 10.3791C18.0394 10.34 18.0394 10.2767 18.0004 10.2376L9.67194 1.9092C9.32047 1.55773 9.32047 0.98788 9.67194 0.636408Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>
                  <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-2 tw-my-2 tw-items-bottom tw-justify-between lg:tw-justify-start lg:tw-items-center">
                    <div className="tw-flex tw-gap-2 tw-my-2">
                      <div className="tw-font-bold tw-bg-[#051766] tw-rounded-lg tw-text-white tw-text-[1.2rem] tw-px-3">
                        AOC
                      </div>
                      <div className="tw-font-bold tw-ml-4">ACO-3038</div>
                    </div>
                    <div id="report-who" className="tw-flex tw-gap-2 lg:tw-ml-10">
                      <div className="tw-text-[1.2rem] tw-text-[#009BFA] tw-font-bold">접수중</div>
                      <div className="tw-text-[1.2rem] tw-text-[#999999]">2024-05-31</div>
                      <div className="tw-text-[1.2rem] tw-text-[#999999]">2024-05-31</div>
                      <div className="tw-text-[1.2rem] tw-text-[#999999]">홍길동</div>
                    </div>
                  </div>
                </div>
              ));
              return elements;
            })()}
          </div>
          <div className="tw-flex tw-mt-4">
            <input
              type="button"
              id="name"
              value={'더보기'}
              name="name"
              className="tw-text-center tw-flex tw-w-full tw-py-4 tw-bg-slate-200"
            />
          </div>
        </div>

        {ReportButtonType1({
          text: '조회조건 설정',
          onClick: () => {
            addSheetSettingFilter();
          },
        })}
      </div>

      {(() => {
        return null;
      })()}

      {(() => {
        return sheetList.map((element) => {
          return BottomSheetLayout({ isShow: element.isShow, jsx: element.jsx, onClose: onClose });
        });
      })()}

      {(() => {
        if (modalPage.isShow) {
          return <ModalDimmedScreen contents={modalPage.jsx} />;
        }
      })()}
    </div>
  );
}
