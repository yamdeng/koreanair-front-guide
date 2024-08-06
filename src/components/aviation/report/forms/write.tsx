import { useEffect } from "react"

export const ReportInputType1 = (custom) => {
  const {
    rightContents,
    placeholder,
    text
  } = custom
  return (
    <div className="tw-flex tw-gap-4 tw-grow">
      <input
        type="text"
        id="name"
        name="name"
        placeholder={placeholder}
        value={text}
        className="av-input-1 tw-rounded-lg"
      />
      {rightContents !== null ? rightContents : null}
    </div>
  )
}

export const ReportDateType1 = (custom) => {
  const {
    rightContents,
    placeholder
  } = custom
  return (
    <div className="tw-flex tw-gap-4 tw-grow">
      <input
        type="date"
        id="name"
        name="name"
        placeholder={placeholder}
        className="av-input-1 tw-rounded-lg"
      />
      {rightContents !== null ? rightContents : null}
    </div>
  )
}

export const ReportSelectType1 = (custom) => {
  const {
    placeholder,
    onClick
  } = custom
  return (
    <div className="tw-flex tw-gap-4 tw-bg-white tw-rounded-lg tw-border-solid tw-border-slate-400 tw-border-[1px] tw-items-center tw-justify-between tw-py-4" onClick={onClick}>
      <div className="tw-mx-4">{placeholder}</div>
      <div className="tw-mx-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <g clip-path="url(#clip0_1021_20173)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7164 11.967L15.7091 11.9743L12.0076 8.23151L8.24939 11.9705L8.2458 11.9669L6.84089 13.3718L6.82422 13.3884L6.82426 13.3885L4.46508 15.7476L4.41593 15.7968L4.18909 16.0236H4.92633C5.31438 16.048 5.70336 15.9936 6.06982 15.8636C6.43628 15.7337 6.77265 15.5309 7.05865 15.2675L9.30062 13.0217L9.29381 13.0149L12 10.326L14.6632 13.0164L14.6578 13.0218L16.9036 15.2675C17.19 15.5304 17.5264 15.7328 17.8927 15.8627C18.2591 15.9927 18.6479 16.0474 19.0359 16.0237H19.7731L19.5463 15.7968L19.4972 15.7477L15.7164 11.967Z" fill="#051766" />
          </g>
          <defs>
            <clipPath id="clip0_1021_20173">
              <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  )
}


export const ReportInputWithLeftLabel = (text) => {
  return (
    <div className="tw-flex">
      <div className="av-flex-vertical-center av-input-left-rounded">{text}</div>
      <input
        type="text"
        id="name"
        name="name"
        className="av-input-1 tw-rounded-r-lg"
      />
    </div>
  )
}

export const ReportInputWithRightLabel = (text) => {
  return (
    <div className="tw-flex tw-grow">
      <input
        type="text"
        id="name"
        name="name"
        className="av-input-1 tw-rounded-l-lg"
      />
      <div className="av-flex-vertical-center av-input-right-rounded">{text}</div>
    </div>
  )
}

export const ReportButtonType1 = (custom) => {
  const {
    text,
    onClick
  } = custom
  return (
    <div className="tw-gap-4 tw-flex tw-mt-4">
      <input
        type="button"
        id="name"
        value={text}
        name="name"
        className="av-button-1"
        onClick={onClick}
      />
    </div>
  )
}

export const ReportButtonType2 = (custom) => {

  const {
    text,
    onClick
  } = custom

  return (
    <input
      type="button"
      id="name"
      name="name"
      value={text}
      onClick={onClick}
      className="av-input-1 tw-rounded-xl"
    />
  )
}

export const ReportButtonType3 = (custom) => {
  const {
    text,
    onClick
  } = custom
  return (
    <input
      type="button"
      id="name"
      value={text}
      name="name"
      className="av-button-1 tw-grow"
      onClick={onClick}
    />
  )
}

export const FlightJSX = (

  <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4">
    <div className="tw-p-6 tw-bg-white tw-rounded-2xl">

      {/* 출발일자 */}
      <div className="tw-p-3">
        <label className="av-label-1">출발일자</label>
        {ReportInputType1({ rightContents: (<div className="av-flex-vertical-center">UTC</div>) })}
      </div>

      {/* 비행편명 */}
      <div className="tw-p-3">
        <label className="av-label-1">비행편명</label>
        {ReportInputWithLeftLabel("KE")}
      </div>

      {/* 등록부호 */}
      <div className="tw-p-3">
        <label className="av-label-1">등록부호</label>
        {ReportInputWithLeftLabel("HL")}
      </div>

      {/* 항공기 형식 */}
      <div className="tw-p-3">
        <label className="av-label-1">항공기 형식</label>
        {ReportInputType1({})}
      </div>

      {/* 출발공항 */}
      <div className="tw-p-3">
        <label className="av-label-1">출발 공항</label>
        {ReportInputWithRightLabel("검색")}
      </div>

      {/* 도착공항 */}
      <div className="tw-p-3">
        <label className="av-label-1">도착 공항</label>
        {ReportInputWithRightLabel("검색")}
      </div>

      {/* 회항 공항 */}
      <div className="tw-p-3">
        <label className="av-label-1">회항 공항</label>
        <div className="tw-flex tw-gap-4">
          {ReportInputWithRightLabel("검색")}
        </div>
        <div className="tw-pt-3 tw-grid tw-grid-cols-3 md:tw-grid-cols-5 tw-gap-2">
          <div>
            <label className="av-label-1 tw-text-[1.3rem]">STD</label>
            {ReportInputType1({})}
          </div>
          <div className="">
            <label className="av-label-1 tw-text-[1.3rem]">STA</label>
            {ReportInputType1({})}
          </div>
          <div className="">
            <label className="av-label-1 tw-text-[1.3rem]">ATD</label>
            {ReportInputType1({})}
          </div>
          <div className="">
            <label className="av-label-1 tw-text-[1.3rem]">ATA</label>
            {ReportInputType1({})}
          </div>
          <div className="">
            <label className="av-label-1 tw-text-[1.3rem]">DELAY</label>
            {ReportInputType1({})}
          </div>
        </div>
      </div>

      {/* 좌석수 */}
      <div className="tw-p-3">
        <label className="av-label-1">좌석수</label>
        <div className="tw-flex tw-gap-4">
          <label className="av-label-1 av-flex-vertical-center">F</label>
          {ReportInputType1({})}
          <label className="av-label-1 av-flex-vertical-center">C</label>
          {ReportInputType1({})}
          <label className="av-label-1 av-flex-vertical-center">Y</label>
          {ReportInputType1({})}
        </div>
      </div>

      {/* 탑승자 */}
      <div className="tw-p-3">
        <label className="av-label-1">탑승자</label>
        <div className="tw-flex tw-gap-4">
          <label className="av-label-1 av-flex-vertical-center">F</label>
          {ReportInputType1({})}
          <label className="av-label-1 av-flex-vertical-center">C</label>
          {ReportInputType1({})}
          <label className="av-label-1 av-flex-vertical-center">Y</label>
          {ReportInputType1({})}
        </div>
      </div>
    </div>

    {/* 버튼 */}
    {ReportButtonType1("NEXT (2/4)")}
  </div>
)

export const EventJSX = (
  <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4">

    <div className="tw-p-6 tw-bg-white tw-rounded-2xl">

      {/* 발생위치 */}
      <div className="tw-p-3">
        <label className="av-label-1">발생위치</label>
        {ReportInputType1({})}
      </div>

      {/* 발생공항 */}
      <div className="tw-p-3">
        <label className="av-label-1">발생공항</label>
        {ReportInputWithRightLabel("검색")}
      </div>

      {/* 제목 */}
      <div className="tw-p-3">
        <label className="av-label-1">제목</label>
        {ReportInputType1({})}
      </div>

      {/* 내용 */}
      <div className="tw-p-3">
        <label className="av-label-1">내용</label>
        <textarea
          id="name"
          name="name"
          className="tw-h-80 av-input-1 tw-rounded-xl"
        />
      </div>

      {/* 이벤트 */}
      <div className="tw-p-3">
        <label className="av-label-1">Event</label>
        {ReportButtonType2("Bird or Lightning Strike, FOD, Hard/Crab Landing")}
      </div>

      {/* 버튼 */}
      {ReportButtonType1("NEXT (3/4)")}
    </div>
  </div>
)

export const SheetSettingFilter = (custom) => {

  const {
    confirmEvent,
    filterStruct,
    onClickSelectReportCategory,
    onClickSelectReportStatus
  } = custom

  useEffect(() => {
    console.log(`SheetSettingFilter - Reload - ${filterStruct.reportCategory}`)
  }, [filterStruct])

  return (
    <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
      {/* 보고서 종류 */}
      <div className="tw-w-full tw-pb-6 tw-text-3xl">
        검색조건 설정
      </div>
      <div className="tw-gap-4 tw-flex tw-flex-col xl:tw-flex-row">
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">보고서 종류</label>
          <ReportSelectType1 placeholder={filterStruct.reportCategory} onClick={() => { onClickSelectReportCategory() }} />
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
          <ReportSelectType1 placeholder={filterStruct.reportStatus} onClick={() => { onClickSelectReportStatus() }} />
        </div>
      </div>
      <div className="tw-gap-4 tw-flex tw-mt-4">
        <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-w-full">
          <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">제목</label>
          <ReportInputType1 text={filterStruct.subject} />
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

export const AddReportSheetJSX = (custom) => {

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