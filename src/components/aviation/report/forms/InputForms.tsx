import { useEffect, useState } from "react"
import { useStore } from "zustand"
import { MyReportListScreenViewModel } from "../viewModels/MyReportListScreenViewModel"

export const ReportInputType1 = (custom) => {
  const {
    rightContents,
    placeholder,
    text,
    onChange
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
        onChange={onChange}
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