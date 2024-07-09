import React from 'react';

/*

    code 콤보 박스 공통
     : <CodeSelect id='' name='' value={''} label='직책코드' 
          codeType='rankType' onChange={() => {}} required={true} codeList={[]}/>

    props
     -id(option) : 라벨을 매핑시키기 위한 id(없으면 uuid로 정의)
     -name(option) : name 속성 값
     -label : input label
     -value : code value
     -onChange : code 값 변경 handler 함수
     -codeType(option) : Code.js에 정의된 타입명
     -codeList(option) : []
     -required(option) : 필수 값 여부

*/

function CodeSelect(props: any) {
  const {
    label,
    value,
    onChange,
    id,
    name,
    codeType,
    codeList,
    required,
    errorMessage,
    onBlur,
    isFrontCode,
    emptyPlaceHolderText,
  } = props;
  const labelId = id;
  const resultCodeList = [];

  console.log(codeType);
  console.log(codeList);
  if (isFrontCode) {
    //   resultCodeList = codeType ? Code[codeType] : codeList;
  } else {
    // resultCodeList = rootStore.appStore.getCodeByGrpCode(codeType) || [];
  }
  return (
    <>
      <select
        name={name}
        id={id}
        className={errorMessage ? 'form_tag_select isValue invalid' : 'form_tag_select isValue'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {emptyPlaceHolderText ? <option value="">{emptyPlaceHolderText}</option> : null}
        {resultCodeList.map((codeInfo) => {
          const { value, name } = codeInfo;
          return (
            <option key={name} value={value}>
              {name}
            </option>
          );
        })}
      </select>
      <label className="f_label" htmlFor={labelId}>
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <span style={{ display: errorMessage ? '' : 'none' }} className="invalid_txt">
        {errorMessage}
      </span>
    </>
  );
}

export default CodeSelect;
