
export const FilterConditionItem = (custom) => {
  
    const {
      text,
      onClick,
    } = custom
  
    return (
      <div className="tw-border-solid tw-border-[#ffffff] tw-border-[1px] tw-rounded-full tw-m-1" onClick={onClick}>
        <div className="tw-flex tw-items-center tw-gap-2 tw-text-white tw-font-light tw-px-4">
          <div className="tw-text-white tw-text-[1.3rem]">{text}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
            <path d="M1 0.5L12 11.5" stroke="#EEEEEE" stroke-linecap="round" />
            <path d="M1 11.5L12 0.5" stroke="#EEEEEE" stroke-linecap="round" />
          </svg>
        </div>
      </div>
    )
  }