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
  