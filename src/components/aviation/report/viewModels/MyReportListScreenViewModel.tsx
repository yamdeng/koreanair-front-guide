
import { produce } from "immer";
import { reportCategory, reportStatus } from "../configs/ListScreenConfig";
import { create } from "zustand";
import { SheetAddReport, SheetSelectReportCategory, SheetSelectReportStatus, SheetSettingFilter } from "../forms/BottomSheet";
import { useNavigate } from "react-router-dom";
import MyReportWriteScreen from "../MyReportWriteScreen";
import { ReportConfig } from "../configs/WriteScreenConfig";

const initailState = {
  sheetList: [],
  addSheet: (element) => { },
  onClose: () => { },
  addSheetSettingFilter: () => { },
  addSheetSelectReportCategory: () => { },
  filterStruct: {
    reportCategory: '',
    dateFrom: '2024-07-01',
    dateTo: '2024-08-01',
    reportStatus: '',
    subject: ''
  },
  finalFilter: {},
  confirmFilter: () => { },
  updateSubject: () => { },
  modalPage: {
    isShow: false,
    jsx: () => {}
  },
  showModal: () => {}
};

export const MyReportListScreenViewModel = create<any>((set, get) => ({
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
  /**
   * BottomSheet 닫기 이벤트
   * 
   * sheetList에서 마지막으로 열었던 Sheet를 찾아서 리스트에서 제거한 후 sheetList에 다시 update!
   */
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
  // 보고서 추가 BottomSheet
  addReport: () => {
    const { addSheet, onClose, goWriteReport } = get()
    // 클릭 이벤트 추가
    const list = reportCategory.map(category => ({
      ...category,
      list: category.list.map(item => ({
        ...item,
        onClick: () => {
          goWriteReport(item)
          onClose()
        }
      }))
    }));
    addSheet(
      {
        isShow: false,
        jsx: () => {
          return (
            <SheetAddReport
              category={list.filter((element) => { return element.name == "csr" })[0].list}
            />
          )
        },
        onClose: onClose
      }
    )
  },
  // 보고서 추가 버튼 클릭시 액션
  goWriteReport: (params) => {
    const { showModal } = get()

    const reportInfo = ReportConfig.filter((element) => { return element.category === 'csr' })[0]

    showModal({ 
      jsx: () => {
        return (<MyReportWriteScreen info={reportInfo} />)
      } 
    })
  },
  // 검색 필터 BottomSheet
  addSheetSettingFilter: () => {
    const {
      addSheet,
      onClose,
      addSheetSelectReportCategory,
      addSheetSelectReportStatus,
      confirmFilter
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
              confirmEvent={() => {
                confirmFilter()
                onClose()
              }}
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
  // 보고서 종류 BottomSheet
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
  // 보고서 상태 BottomSheet
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
  },
  // 조회조건 '제목' 입력 Event
  updateSubject: (text) => {
    set(
      produce((state: any) => {
        state.filterStruct.subject = text
      })
    )
  },
  // 조회조건 결정
  confirmFilter: () => {
    const {
      filterStruct
    } = get()
    set({ finalFilter: filterStruct })
  },
  // 검색조건 제거
  removeFilter: (key) => {
    set(
      produce((state: any) => {
        if (key === 'date') {
          state.filterStruct.dateFrom = ''
          state.filterStruct.dateTo = ''
        } else {
          state.filterStruct[key] = ''
        }
        state.finalFilter = state.filterStruct
      })
    )
  },
  // Modal Screen 생성
  showModal: (params) => {
    
    const {
      jsx
    } = params

    set(
      produce((state: any) => {
        state.modalPage.isShow = true
        state.modalPage.jsx = jsx
      })
    )
  }
}))