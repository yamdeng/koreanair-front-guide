import { useStore } from "zustand"
import { ReportButtonType2, ReportButtonType3, ReportDateType1, ReportInputType1, ReportSelectType1 } from "./InputForms"
import { MyReportListScreenViewModel } from "../viewModels/MyReportListScreenViewModel"

export const BottomSheetLayout = (custom) => {
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
  

export const SheetSettingFilter = (custom) => {

  const {
    confirmEvent,
    onClickSelectReportCategory,
    onClickSelectReportStatus
  } = custom

  const {
    filterStruct,
    updateSubject
  } = useStore(MyReportListScreenViewModel, (state) => state) as any;

  // useEffect(() => {
  //   console.log(`SheetSettingFilter - Reload - ${filterStruct.reportCategory}`)
  // }, [filterStruct])

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">
        검색조건 설정
      </div>
      <div className="tw-gap-4 tw-flex tw-flex-col xl:tw-flex-row">
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">보고서 종류</label>
          <ReportSelectType1 placeholder={filterStruct.reportCategory === '' ? "ALL" : filterStruct.reportCategory} onClick={() => { onClickSelectReportCategory() }} />
        </div>
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">기간</label>
          <div className="tw-flex tw-gap-4">
            <ReportDateType1 placeholder={"2024-07-01"} />
            <ReportDateType1 placeholder={"2024-08-31"} />
          </div>
        </div>
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">상태</label>
          <ReportSelectType1 placeholder={filterStruct.reportStatus === '' ? "ALL" : filterStruct.reportStatus} onClick={() => { onClickSelectReportStatus() }} />
        </div>
      </div>
      <div className="tw-gap-4 tw-flex tw-mt-4">
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-w-full">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">제목</label>
          <ReportInputType1
            text={filterStruct.subject}
            onChange={
              (event) => {
                updateSubject(event.target.value)
              }}
          />
        </div>
      </div>
      <div className="tw-gap-4 tw-flex tw-mt-4">
        <input
          type="button"
          id="name"
          value={"조회"}
          name="name"
          className="tw-tw-input tw-p-4 tw-border tw-rounded-lg tw-w-full tw-bg-slate-900 tw-text-white"
          onClick={confirmEvent}
        />
      </div>
    </div>
  )
}

export const SheetAddReport = (custom) => {

  const {
    category
  } = custom

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">
        보고서 종류
      </div>
      <div className="tw-flex tw-gap-4 tw-flex-col">
        {
          (() => {
            return category.map((element) => {
              return ReportButtonType3({ text: element.name, onClick: element.onClick })
            })
          })()
        }
      </div>
    </div>
  )
}

export const SheetSelectReportCategory = (custom) => {

  const {
    category,
  } = custom

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">
        보고서 종류
      </div>
      <div className="tw-flex tw-gap-4 tw-flex-col">
        {
          (() => {
            return category.map((element) => {
              return ReportButtonType2({ text: element.name, onClick: element.onClick })
            })
          })()
        }
      </div>
    </div>
  )
}


export const SheetSelectReportStatus = (custom) => {

  const {
    status,
  } = custom

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">
        보고서 상태
      </div>
      <div className="tw-flex tw-gap-4 tw-flex-col">
        {
          (() => {
            return status.map((element) => {
              return ReportButtonType2({ text: element.name, onClick: element.onClick })
            })
          })()
        }
      </div>
    </div>
  )
}