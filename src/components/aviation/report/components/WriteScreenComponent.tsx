import { ReportButtonType1, ReportButtonType2, ReportDateType1, ReportInputType1, ReportInputWithLeftLabel, ReportInputWithRightLabel } from "../forms/InputForms"
import { v4 as uuidv4 } from 'uuid';

export const FlightSearchJSX = () => {

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll">

        {/* 출발일자 */}
        <div className="tw-p-3">
          <label className="av-label-1">출발일자</label>
          <ReportDateType1 rightContents={(<div className="av-flex-vertical-center">UTC</div>)} />
        </div>

        {/* 비행편명 */}
        <div className="tw-p-3">
          <label className="av-label-1">비행편명</label>
          <ReportInputWithLeftLabel text="KE" />
        </div>

      </div>
    </div>
  )
}

export const FlightDetailJSX = () => {

  return (
    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll">

        {/* 등록부호 */}
        <div className="tw-p-3">
          <label className="av-label-1">등록부호</label>
          <ReportInputWithLeftLabel text="HL" />
        </div>

        {/* 항공기 형식 */}
        <div className="tw-p-3">
          <label className="av-label-1">항공기 형식</label>
          <ReportInputType1 />
        </div>

        {/* 출발공항 */}
        <div className="tw-p-3">
          <label className="av-label-1">출발 공항</label>
          <ReportInputWithRightLabel text="검색" />
        </div>

        {/* 도착공항 */}
        <div className="tw-p-3">
          <label className="av-label-1">도착 공항</label>
          <ReportInputWithRightLabel text="검색" />
        </div>

        {/* 회항 공항 */}
        <div className="tw-p-3">
          <label className="av-label-1">회항 공항</label>
          <div className="tw-flex tw-gap-4">
            <ReportInputWithRightLabel text="검색" />
          </div>
          <div className="tw-pt-3 tw-grid tw-grid-cols-3 md:tw-grid-cols-5 tw-gap-2">
            <div>
              <label className="av-label-1 tw-text-[1.3rem]">STD</label>
              <ReportInputType1 />
            </div>
            <div className="">
              <label className="av-label-1 tw-text-[1.3rem]">STA</label>
              <ReportInputType1 />
            </div>
            <div className="">
              <label className="av-label-1 tw-text-[1.3rem]">ATD</label>
              <ReportInputType1 />
            </div>
            <div className="">
              <label className="av-label-1 tw-text-[1.3rem]">ATA</label>
              <ReportInputType1 />
            </div>
            <div className="">
              <label className="av-label-1 tw-text-[1.3rem]">DELAY</label>
              <ReportInputType1 />
            </div>
          </div>
        </div>

        {/* 좌석수 */}
        <div className="tw-p-3">
          <label className="av-label-1">좌석수</label>
          <div className="tw-flex tw-gap-4">
            <label className="av-label-1 av-flex-vertical-center">F</label>
            <ReportInputType1 />
            <label className="av-label-1 av-flex-vertical-center">C</label>
            <ReportInputType1 />
            <label className="av-label-1 av-flex-vertical-center">Y</label>
            <ReportInputType1 />
          </div>
        </div>

        {/* 탑승자 */}
        <div className="tw-p-3">
          <label className="av-label-1">탑승자</label>
          <div className="tw-flex tw-gap-4">
            <label className="av-label-1 av-flex-vertical-center">F</label>
            <ReportInputType1 />
            <label className="av-label-1 av-flex-vertical-center">C</label>
            <ReportInputType1 />
            <label className="av-label-1 av-flex-vertical-center">Y</label>
            <ReportInputType1 />
          </div>
        </div>
      </div>
    </div>
  )

}

export const EventJSX = () => {

  return (

    <div className="tw-bg-slate-200 tw-rounded-2xl tw-p-6 tw-mb-4 tw-h-full">
      <div className="tw-p-6 tw-bg-white tw-rounded-2xl tw-h-full tw-h-full tw-overflow-y-scroll">

        {/* 발생위치 */}
        <div className="tw-p-3">
          <label className="av-label-1">발생위치</label>
          <ReportInputType1 />
        </div>

        {/* 발생공항 */}
        <div className="tw-p-3">
          <label className="av-label-1">발생공항</label>
          <ReportInputWithRightLabel text="검색" />
        </div>

        {/* 제목 */}
        <div className="tw-p-3">
          <label className="av-label-1">제목</label>
          <ReportInputType1 />
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
          <ReportButtonType2 text="Bird or Lightning Strike, FOD, Hard/Crab Landing" />
        </div>

      </div>
    </div>
  )
}

export const AttachmentJSX = (params) => {

  const {
    fileInputRef,
    handleFileChange,
    getFormArray,
    removeFormFile,
    saveReport,
    reports,
    attachments
  } = params

  return (
    <>
      <div className="font-bold text-xl my-3">offline app</div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={() => {
          // 업로드 시작
          fileInputRef.current.click();
        }} className="test-button">파일 선택</button>
      </div>

      <div className="flex flex-col gap-4">
        {
          (() => {
            //for (let [key, value] of formData.entries()) {
            return getFormArray().map(([key, value]) => {
              return (
                <div className="flex justify-between mx-4 p-2 bg-yellow-200" key={key}>
                  <div className="">
                    {key} - <span className="font-bold">{value.name}</span>
                  </div>
                  <button
                    onClick={(() => {
                      removeFormFile(key)
                    })}
                    className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    <span className="text-lg font-bold">X</span>
                  </button>
                </div>
              )
            })
          })()
        }
      </div>

      <button onClick={saveReport} className="test-button" key={uuidv4()}>Save</button>

      <h2 className="text-lg font-bold mt-4">Reports</h2>
      <div className="my-4">
        {
          (() => {
            return reports.map((element, index) => {
              return (
                <div key={index}>
                  id: {element.id}, category: {element.category}, report_id: {element.report_id}, attachment: {element.attachment}
                </div>
              )
            })
          })()
        }
      </div>

      <h2 className="text-lg font-bold">Attachment</h2>
      <div className="my-4">
        {
          (() => {
            return attachments.map((element, index) => {
              return (
                <div key={index}>
                  id: {element.id}, report_id: {element.report_id}, filename: {element.filename}
                </div>
              )
            })
          })()
        }
      </div>
    </>
  )
}