import { useNavigate } from 'react-router-dom';
import { create, useStore } from 'zustand';
import { EventJSX, FlightDetailJSX, FlightSearchJSX } from './components/WriteScreenComponent';
import { ReportButtonType1 } from './forms/InputForms';
import { useEffect } from 'react';

const initialState = {
  // 보고서 작성 구분
  reportType: {},
  init: (params) => { },
  currentFragment: {
    tab: null,
    sub: null
  },
  flightResult: null,
  cardFragmentClipEvent: (type) => { },
  onCancel: () => { },
  onNext: () => { },
  setPreviousFragment: () => { },
  setNextFragment: () => { }
};

export const MyReportWriteScreenViewModel = create<any>((set, get) => ({
  ...initialState,
  cardFragmentClipEvent: (params) => {

    const { reportType } = get()

    const {
      fragment
    } = params

    console.log(fragment)

    const jumpStep = reportType.step.filter((element, index) => { return (element.tab == fragment.tab) })[0]

    if (jumpStep) {
      set({
        currentFragment: {
          tab: jumpStep.tab,
          sub: jumpStep.sub[0]
        }
      })
    }
  },
  onNext: () => {

    const { flightResult, setNextFragment } = get()

    if (!flightResult) {
      set({
        flightResult: "flightResult"
      })
      setNextFragment()
      return
    }

    setNextFragment()
  },
  onCancel: () => {
    const { setPreviousFragment } = get()
    setPreviousFragment()
  },
  init: (params) => {
    const { setNextFragment } = get()
    set({
      reportType: params
    })
    setNextFragment()
  },
  setNextFragment: () => {
    const { currentFragment, reportType } = get()

    let index = 0
    for (const step of reportType.step) {

      // 처음인 경우
      if (!currentFragment.tab) {
        set({
          currentFragment: {
            tab: step.tab,
            sub: step.sub[0]
          }
        })
        return
      }

      // 다음 sub화면으로 가야 하는 경우
      if (step.tab === currentFragment.tab) {
        // 다음 sub화면이 있는지 확인
        let subIndex = 0
        for (const sub of step.sub) {
          if (currentFragment.sub === sub) {
            if (step.sub[subIndex + 1]) {
              set({
                currentFragment: {
                  tab: reportType.step[index].tab,
                  sub: reportType.step[index].sub[subIndex + 1]
                }
              })
              return
            }
          }
          subIndex++
        }

        // 다음 sub화면이 없는 경우, 다음 tab으로 이동
        if (reportType.step[index + 1]) {
          set({
            currentFragment: {
              tab: reportType.step[index + 1].tab,
              sub: reportType.step[index + 1].sub[0]
            }
          })
          return
        }

        alert("더이상 앞으로 갈수 없습니다.")
      }

      index++
    }
  },
  setPreviousFragment: () => {
    const { currentFragment, reportType } = get()

    let index = 0
    for (const step of reportType.step) {

      // 처음인 경우
      if (!currentFragment.tab) {
        return
      }

      // 이전 sub화면으로 가야 하는 경우
      if (step.tab === currentFragment.tab) {
        // 다음 sub화면이 있는지 확인
        let subIndex = 0
        for (const sub of step.sub) {
          if (currentFragment.sub === sub) {
            if (step.sub[subIndex - 1]) {
              set({
                currentFragment: {
                  tab: reportType.step[index].tab,
                  sub: reportType.step[index].sub[subIndex - 1]
                }
              })
              return
            }
          }
          subIndex++
        }

        // 이전 sub화면이 없는 경우, 이전 tab으로 이동
        if (reportType.step[index - 1]) {
          set({
            currentFragment: {
              tab: reportType.step[index - 1].tab,
              sub: reportType.step[index - 1].sub[0]
            }
          })
          return
        }
        alert("더이상 뒤로 갈수 없습니다.")
      }

      index++
    }
  }
}))

export default function MyReportWriteScreen(params) {

  const {
    init,
    currentFragment,
    cardFragmentClipEvent,
    onCancel,
    onNext,
    flightResult
  } = useStore(MyReportWriteScreenViewModel, (state) => state) as any;

  const {
    info
  } = params

  // 보고서 초기화
  useEffect(() => {
    init(info)
  }, [params])

  let baseTabStyleOn = `tw-px-3 tw-bg-slate-200 tw-py-3 tw-mx-2 tw-rounded-t-xl`;
  let baseTabStyleOff = `${baseTabStyleOn} tw-text-white tw-bg-slate-500`;

  return (
    <div className="tw-bg-slate-400 tw-rounded-2xl tw-p-10 tw-flex tw-flex-col tw-w-full">

      <div className="tw-flex tw-ml-10">
        {
          (() => {
            return info.step.map((element, index) => {
              return (
                <div className={element.tab === currentFragment.tab ? baseTabStyleOn : baseTabStyleOff} onClick={() => cardFragmentClipEvent({ fragment: element })}>{element.tab}</div>
              )
            })
          })()
        }
      </div>

      <div className="tw-flex tw-flex-col tw-h-full tw-justify-end">
        {/* height 0으로 잡아야 내부에서 스크롤 영역을 정확히 잡는데, 원인을 모르겠음 */}
        <div className="tw-grow tw-items-stretch tw-w-full tw-h-0">
          {
            (() => {

              switch (currentFragment.tab) {
                case "Flight": {
                  switch (currentFragment.sub) {
                    case "Search": return <FlightSearchJSX />
                    case "Detail": return <FlightDetailJSX />
                  }
                  break
                }
                case "Event": {
                  return <EventJSX />
                }
                case "Attachment": {
                  return <div>djfsklfjd</div>
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
      </div>

    </div>
  );
}
