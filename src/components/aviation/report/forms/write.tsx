
export const ReportInputType1 = (custom) => {
  const {
    rightContents,
    placeholder
  } = custom
  return (
    <div className="tw-flex tw-gap-4 tw-grow">
      <input
        type="text"
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

  } = custom
  return (
    <div className="tw-flex tw-gap-4 tw-grow">
      <select
        name="name"
        className="tw-w-full tw-p-4 tw-rounded-lg">
        <option>SJKDSJFLJSLK</option>
        <option>SJKDSJFLJSLK</option>
        <option>SJKDSJFLJSLK</option>
        <option>SJKDSJFLJSLK</option>
        <option>SJKDSJFLJSLK</option>
        <option>SJKDSJFLJSLK</option>
      </select>
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

export const ReportButtonType1 = (text) => {
  return (
    <div className="tw-gap-4 tw-flex tw-mt-4">
      <input
        type="button"
        id="name"
        value={text}
        name="name"
        className="av-button-1"
      />
    </div>
  )
}

export const ReportButtonType2 = (text) => {
  return (
    <input
      type="button"
      id="name"
      name="name"
      value={text}
      className="av-input-1 tw-rounded-xl"
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

export const SearchSheetJSX = (

  <div className="tw-bg-slate-300 tw-rounded-t-2xl tw-p-6">
    {/* 보고서 종류 */}
    <div className="tw-w-full tw-pb-6 tw-text-3xl">
      검색조건 설정
    </div>
    <div className="tw-gap-4 tw-flex tw-flex-col xl:tw-flex-row">
      <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">보고서 종류</label>
        {ReportSelectType1({ placeholder: "ALL" })}
      </div>
      <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">기간</label>
        <div className="tw-flex tw-gap-4">
          {ReportInputType1({ placeholder: "2024-07-01" })}
          {ReportInputType1({ placeholder: "2024-08-31" })}
        </div>
      </div>
      <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-grow">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">상태</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="ALL"
          className="tw-tw-input tw-p-3 tw-border-solid tw-border tw-border-slate-400 tw-rounded-lg tw-w-full !tw-p-4"
        />
      </div>
    </div>
    <div className="tw-gap-4 tw-flex tw-mt-4">
      <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-w-full">
        <label className="tw-block tw-text-gray-700 tw-text-md tw-font-medium tw-mb-2">제목</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          className="tw-tw-input tw-my-2 tw-border-solid tw-border tw-border-slate-400 tw-rounded-lg tw-w-full !tw-p-4"
        />
      </div>
    </div>
    <div className="tw-gap-4 tw-flex tw-mt-4">
      <input
        type="button"
        id="name"
        value={"조회"}
        name="name"
        className="tw-tw-input tw-p-3 tw-border tw-rounded-lg tw-w-full tw-bg-slate-900 tw-text-white"
      />
    </div>
  </div>
)