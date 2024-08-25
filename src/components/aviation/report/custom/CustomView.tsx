export const CloseIconView = (params) => {
  const { onClose } = params;

  return (
    <div className="tw-text-3xl" onClick={onClose}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.50484 4.50465C4.89537 4.11413 5.52853 4.11413 5.91906 4.50465L19.4955 18.0811C19.886 18.4716 19.886 19.1048 19.4955 19.4953C19.105 19.8858 18.4718 19.8858 18.0813 19.4953L4.50484 5.91887C4.11432 5.52834 4.11432 4.89518 4.50484 4.50465Z"
          fill="#1B1E21"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.4952 4.50465C19.8858 4.89518 19.8858 5.52834 19.4952 5.91887L5.91878 19.4953C5.52825 19.8858 4.89509 19.8858 4.50456 19.4953C4.11404 19.1048 4.11404 18.4716 4.50456 18.0811L18.081 4.50465C18.4715 4.11413 19.1047 4.11413 19.4952 4.50465Z"
          fill="#1B1E21"
        />
      </svg>
    </div>
  );
};

export const FilterConditionItemView = (custom) => {
  const { text, onClick } = custom;

  return (
    <div className="tw-border-solid tw-border-[#ffffff] tw-border-[1px] tw-rounded-full tw-m-1" onClick={onClick}>
      <div className="tw-flex tw-items-center tw-gap-2 tw-text-white tw-font-light tw-px-4">
        <div className="tw-text-white tw-text-[1.3rem]">{text}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
          <path d="M1 0.5L12 11.5" stroke="#EEEEEE" strokeLinecap="round" />
          <path d="M1 11.5L12 0.5" stroke="#EEEEEE" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export const LabelType1 = (custom) => {
  const { text } = custom;
  return <label className="av-label-1">{text}</label>;
};

export const LabelType2 = (custom) => {
  const { text, addStyle } = custom;
  const defaultStyle = `av-label-1 tw-text-[1.3rem]`;
  const style = addStyle ? `${defaultStyle} ${addStyle}` : defaultStyle;
  return <label className={style}>{text}</label>;
};
