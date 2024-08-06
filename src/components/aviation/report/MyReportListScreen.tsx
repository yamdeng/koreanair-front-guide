import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { AddReportSheetJSX, EventJSX, ReportButtonType1, SheetSettingFilter, SheetSelectReportCategory, SheetSelectReportStatus } from './forms/write';
import { produce } from 'immer';
import { useEffect, useState } from 'react';

const initailState = {
  sheetList: [],
  addSheet: (element) => { },
  onClose: () => { },
  addSheetSettingFilter: () => { },
  addSheetSelectReportCategory: () => { },
  filterStruct: {
    reportCategory: 'ALL',
    dateFrom: '2024-07-01',
    dateTo: '2024-08-01',
    reportStatus: 'ALL',
    subject: 'dfadsf'
  },
};


let reportStatus = [
  {
    name: "반려",
    path: ""
  },
  {
    name: "이관",
    path: ""
  },
  {
    name: "작성중",
    path: ""
  },
  {
    name: "제출완료",
    path: ""
  },
  {
    name: "접수중",
    path: ""
  },
  {
    name: "처리중",
    path: ""
  },
  {
    name: "종결",
    path: ""
  }
]

let reportCategory = [
  {
    name: "csr",
    list: [
      {
        name: "HZR",
        path: "/hazard"
      },
      {
        name: "수검",
        path: "/inspection"
      },
      {
        name: "승객하기",
        path: "/pax-deplane"
      },
      {
        name: "승객환자",
        path: "/pax-patient"
      },
      {
        name: "승객부상",
        path: "/pax-injury"
      },
      {
        name: "승무원환자",
        path: "/crew-patient"
      },
      {
        name: "승무원부상",
        path: "/crew-injury"
      },
      {
        name: "불법방해행위",
        path: "/act-of-unlawful-interference"
      },
      {
        name: "흡연",
        path: "/smoking"
      },
      {
        name: "설비/정비",
        path: "/maintenance"
      },
      {
        name: "Others",
        path: "/others"
      }
    ]
  }
]

const myReportListScreen = create<any>((set, get) => ({
  ...initailState,
  addSheet: (element) => {
    const { sheetList } = get()
    set({ sheetList: [...sheetList, element] })
    setTimeout(() => {
      set(
        produce((state: any) => {
          state.sheetList.forEach((item) => {
            item.isShow = true
          })
        })
      )
    }, 200);
  },
  onClose: () => {
    console.log("CLOSE")
    const { sheetList } = get()
    set(
      produce((state: any) => {
        const lastIndex = state.sheetList.length - 1
        if (lastIndex < 0) return
        state.sheetList[lastIndex].isShow = false
      })
    )
    setTimeout(() => {
      set({ sheetList: [...sheetList.slice(0, -1)] })
    }, 400)
  },
  addReport: () => {
    const { addSheet, onClose } = get()
    // 클릭 이벤트 추가
    reportCategory = reportCategory.map(category => ({
      ...category,
      list: category.list.map(item => ({
        ...item,
        onClick: () => alert(`Clicked on ${item.name}`)
      }))
    }));
    addSheet(
      {
        isShow: false,
        jsx: () => {
          return (
            <AddReportSheetJSX
              category={reportCategory.filter((element) => { return element.name == "csr" })[0].list}
            />
          )
        },
        onClose: onClose
      }
    )
  },
  addSheetSettingFilter: () => {
    const {
      addSheet,
      onClose,
      addSheetSelectReportCategory,
      addSheetSelectReportStatus
    } = get()

    addSheet(
      {
        name: "SettingFilter",
        isShow: false,
        jsx: () => {

          const {
            filterStruct
          } = get()

          return (
            <SheetSettingFilter
              confirmEvent={() => { }}
              filterStruct={filterStruct}
              onClickSelectReportCategory={() => {
                addSheetSelectReportCategory({
                  finished: (item) => {
                    set(
                      produce((state: any) => {
                        state.filterStruct.reportCategory = item
                      })
                    )
                  }
                })
              }}
              onClickSelectReportStatus={() => {
                addSheetSelectReportStatus({
                  finished: (item) => {
                    set(
                      produce((state: any) => {
                        state.filterStruct.reportStatus = item
                      })
                    )
                  }
                })
              }}
            />
          )
        },
        onClose: onClose
      }
    )
  },
  addSheetSelectReportCategory: (completion) => {
    const {
      finished
    } = completion

    const { addSheet, onClose } = get()
    // 클릭 이벤트 추가
    const list = reportCategory.map(category => ({
      ...category,
      list: category.list.map(item => ({
        ...item,
        onClick: () => {
          finished(item.name)
          onClose()
        }
      }))
    }));
    addSheet(
      {
        name: "SelectReport",
        isShow: false,
        jsx: () => {
          return (
            <SheetSelectReportCategory
              category={list.filter((element) => { return element.name == "csr" })[0].list}
            />
          )
        },
        onClose: onClose
      }
    )
  },
  addSheetSelectReportStatus: (completion) => {
    const {
      finished
    } = completion

    const { addSheet, onClose } = get()
    const list = reportStatus.map(status => ({
      ...status,
      onClick: () => {
        finished(status.name)
        onClose()
      }
    }));

    addSheet(
      {
        name: "SelectStatus",
        isShow: false,
        jsx: () => {
          return (
            <SheetSelectReportStatus
              status={list}
            />
          )
        },
        onClose: onClose
      }
    )
  }
}))

const BottomSheetLayout = (custom) => {
  const {
    isShow,
    onClose,
    jsx
  } = custom

  const open = isShow ? "tw-open" : ""
  const css = `tw-absolute tw-bottom-0 tw-bottom-sheet ${open} tw-transition tw-transition-transform tw-duration-300 tw-ease-in-out tw-left-0 tw-w-full tw-text-white tw-rounded-t-lg tw-shadow-lg`

  return (
    <>
      <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-70 tw-rounded-lg" onClick={() => { onClose() }}></div>
      <div className={css}>
        {jsx()}
      </div>
    </>
  )
}


export const TestJSX = (
  <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4">

    <div className="tw-p-6 tw-bg-white tw-rounded-2xl">
      dfajskljklfjasljfdlskafj safjaslkfjasklfj alkf ja jfkls
    </div>
  </div>
)


export default function MyReportListScreen() {
  const navigate = useNavigate();

  const {
    sheetList,
    addSheet,
    filterStruct,
    addSheetSettingFilter,
    onClose,
    addReport,
    addSheetSelectReportCategory,
  } = myReportListScreen()

  useEffect(() => {
    addSheetSettingFilter()
  }, [])

  return (

    <div className="tw-flex tw-relative tw-w-full tw-bg-slate-400 tw-rounded-2xl">
      {/*tw-overflow-hidden */}
      <div className="tw-flex tw-flex-col tw-w-full tw-p-4">

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
          <div className="tw-mx-6 tw-flex tw-bg-[#777FB0] tw-h-[1px]">
          </div>

          {/* 검색 키워드 */}
          <div className="tw-px-6 tw-py-4 tw-flex tw-grid-flow-col tw-flex-wrap">
            {
              (() => {
                const elements = Array.from({ length: 8 }, (_, index) => (
                  <div className="tw-border-solid tw-border-[#ffffff] tw-border-[1px] tw-rounded-full tw-m-1">
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-white tw-font-light tw-px-4">
                      <div className="tw-text-white tw-text-[1.3rem]">AMO-{index}</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M1 0.5L12 11.5" stroke="#EEEEEE" stroke-linecap="round" />
                        <path d="M1 11.5L12 0.5" stroke="#EEEEEE" stroke-linecap="round" />
                      </svg>
                    </div>
                  </div>
                ));
                return elements
              })()
            }
          </div>
        </div>

        {/* 중간 회색 Divider */}
        <div className="tw-h-4 tw-bg-slate-200"></div>

        {/* 제출완료 단계 표시 */}
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

        {/* 보고서 리스트 시작 */}
        <div className="tw-bg-white">
          <div className="tw-w-full tw-text-center av-report-list tw-divide-y tw-divide-[#eeeeee]">
            {/* <div className="">
              <div className="tw-row-span-2">순번</div>
              <div className="tw-col-span-2">제목</div>
              <div className="">종류 / 보고서 번호</div>
              <div className="tw-col-span-2">작성일 / 발생일</div>
              <div className="">제목</div>
              <div className="">작성자</div>
            </div> */}
            {
              (() => {
                const elements = Array.from({ length: 10 }, (_, index) => (
                  <div className="tw-py-4">
                    <div className="tw-row-span-2 tw-leading-8">{index + 1}</div>
                    <div className="tw-leading-8 tw-px-2">제목입니다.제목입니다.제목입니다.제목입니다.제목제목입니다.제목제목입니다.</div>
                    <div className="tw-row-span-2 tw-flex tw-items-center tw-justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67194 0.636408C10.0234 0.284936 10.5933 0.284936 10.9447 0.636407L19.2732 8.96485C20.0152 9.70684 20.0152 10.9099 19.2732 11.6519L10.9447 19.9803C10.5933 20.3318 10.0234 20.3318 9.67194 19.9803C9.32047 19.6288 9.32047 19.059 9.67194 18.7075L18.0004 10.3791C18.0394 10.34 18.0394 10.2767 18.0004 10.2376L9.67194 1.9092C9.32047 1.55773 9.32047 0.98788 9.67194 0.636408Z" fill="#333333" />
                      </svg>
                    </div>
                    <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-2 tw-my-2 tw-items-bottom tw-justify-between lg:tw-justify-start lg:tw-items-center">
                      <div className="tw-flex tw-gap-2 tw-my-2">
                        <div className="tw-font-bold tw-bg-[#051766] tw-rounded-lg tw-text-white tw-text-[1.2rem] tw-px-3">AOC</div>
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
                return elements
              })()
            }
          </div>
          <div className="tw-flex tw-mt-4">
            <input
              type="button"
              id="name"
              value={"더보기"}
              name="name"
              className="tw-text-center tw-flex tw-w-full tw-py-4 tw-bg-slate-200"
            />
          </div>

        </div>

        {ReportButtonType1({
          text: "조회조건 설정", onClick: () => {
            addSheetSettingFilter()
          }
        })}

      </div>

      {
        (() => {
          return null
        })()
      }

      {
        (() => {

          // useEffect(() => {
          //   console.log(`filterStruct.reportCategory: ${filterStruct.reportCategory}`)
          // }, [filterStruct])

          return sheetList.map((element, index) => {
            return BottomSheetLayout({ isShow: element.isShow, jsx: element.jsx, onClose: onClose })
          })
        })()

      }

    </div>
  );
}
