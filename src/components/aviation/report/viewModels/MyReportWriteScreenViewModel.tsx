import { create } from 'zustand';

const initialState = {
  sheetList: [],
  // 보고서 작성 구분
  reportType: {},
  init: () => {},
  currentFragment: {
    tab: null,
    sub: null,
  },
  flightResult: null,
  cardFragmentClipEvent: () => {},
  onCancel: () => {},
  onNext: () => {},
  setPreviousFragment: () => {},
  setNextFragment: () => {},
  modalPage: {
    isShow: false,
    jsx: () => {},
  },
  showModal: () => {},
  addSheet: () => {},
  onClose: () => {},
};

export const MyReportWriteScreenViewModel = create<any>((set, get) => ({
  ...initialState,
  cardFragmentClipEvent: (params) => {
    const { reportType } = get();

    const { fragment } = params;

    console.log(fragment);

    const jumpStep = reportType.step.filter((element) => {
      return element.tab == fragment.tab;
    })[0];

    if (jumpStep) {
      set({
        currentFragment: {
          tab: jumpStep.tab,
          sub: jumpStep.sub[0],
        },
      });
    }
  },
  onNext: () => {
    const { flightResult, setNextFragment } = get();

    if (!flightResult) {
      set({
        flightResult: 'flightResult',
      });
      setNextFragment();
      return;
    }

    setNextFragment();
  },
  onCancel: () => {
    const { setPreviousFragment } = get();
    setPreviousFragment();
  },
  init: (params) => {
    const { currentFragment, setNextFragment } = get();
    set({
      reportType: params,
    });
    if (!currentFragment.tab) {
      setNextFragment();
    }
  },
  setNextFragment: () => {
    const { currentFragment, reportType } = get();

    let index = 0;
    for (const step of reportType.step) {
      // 처음인 경우
      if (!currentFragment.tab) {
        set({
          currentFragment: {
            tab: step.tab,
            sub: step.sub[0],
          },
        });
        return;
      }

      // 다음 sub화면으로 가야 하는 경우
      if (step.tab === currentFragment.tab) {
        // 다음 sub화면이 있는지 확인
        let subIndex = 0;
        for (const sub of step.sub) {
          if (currentFragment.sub === sub) {
            if (step.sub[subIndex + 1]) {
              set({
                currentFragment: {
                  tab: reportType.step[index].tab,
                  sub: reportType.step[index].sub[subIndex + 1],
                },
              });
              return;
            }
          }
          subIndex++;
        }

        // 다음 sub화면이 없는 경우, 다음 tab으로 이동
        if (reportType.step[index + 1]) {
          set({
            currentFragment: {
              tab: reportType.step[index + 1].tab,
              sub: reportType.step[index + 1].sub[0],
            },
          });
          return;
        }

        console.log('더이상 앞으로 갈수 없습니다.');
      }

      index++;
    }
  },
  setPreviousFragment: () => {
    const { currentFragment, reportType } = get();

    let index = 0;
    for (const step of reportType.step) {
      // 처음인 경우
      if (!currentFragment.tab) {
        return;
      }

      // 이전 sub화면으로 가야 하는 경우
      if (step.tab === currentFragment.tab) {
        // 다음 sub화면이 있는지 확인
        let subIndex = 0;
        for (const sub of step.sub) {
          if (currentFragment.sub === sub) {
            if (step.sub[subIndex - 1]) {
              set({
                currentFragment: {
                  tab: reportType.step[index].tab,
                  sub: reportType.step[index].sub[subIndex - 1],
                },
              });
              return;
            }
          }
          subIndex++;
        }

        // 이전 sub화면이 없는 경우, 이전 tab으로 이동
        if (reportType.step[index - 1]) {
          set({
            currentFragment: {
              tab: reportType.step[index - 1].tab,
              sub: reportType.step[index - 1].sub[0],
            },
          });
          return;
        }

        console.log('더이상 뒤로 갈수 없습니다.');
      }

      index++;
    }
  },

  // ------------------------------------------------------------------------------
  // BOTTOM SHEET
  // ------------------------------------------------------------------------------
  // Select 선택용 BottomSheet
  pushSheetOnSelect: () => {
    // const { showModal } = get();
    // showModal({
    //   jsx: () => {
    //     return (<MyReportWriteScreen info={reportInfo} />)
    //   }
    // })
  },
}));
