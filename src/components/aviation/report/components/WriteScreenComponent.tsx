import { ReportButtonType1, ReportButtonType2, ReportInputType1, ReportInputWithLeftLabel, ReportInputWithRightLabel } from "../forms/InputForms"

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