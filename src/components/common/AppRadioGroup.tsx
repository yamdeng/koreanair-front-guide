import CommonUtil from '@/utils/CommonUtil';
import classNames from 'classnames';
import CommonInputError from './CommonInputError';

/*

   #.공통 속성
    -id(string) : 에러발생시 포커스 이동시키기 위한 id
    -name(string) : yup에 등록되는 키값과 동일시키는 것을 추천
    -label(string)  : 라벨(input 상단에 표시되는 라벨)
    -value : 각 컴포넌트 타입에 따라 value 타입이 달라질 수 있음 
    -onChange : 각 컴포넌트 타입에 따라 함수 spec이 달라질 수 있음
    -placeholder : label 속성외의 placeholder를 보여주고 싶을때 사용
    -required : 필수 여부(라벨에 '*' 표시)
    -errorMessage(string) : 에러메시지가 존재시 border가 red로 바뀌고 input 하단에 에러메시지가 표기됨. 메시지 키값을 전달시 해당 키값이 반영됨
    -disabled(boolean)
    -style({}) : react의 style object({}) 형식으로 전달

   #.<AppRadioGroup /> 전용 속성
    -value([])
    -onChange([], event)
    -options([])
    -labelKey(string)
    -valueKey(string)

*/
function AppRadioGroup(props) {
  const {
    id = CommonUtil.getUUID(),
    name = '',
    label,
    value,
    onChange,
    required = false,
    errorMessage,
    disabled = false,
    options = [],
    labelKey = 'label',
    valueKey = 'value',
    noBorder = false,
  } = props;
  const selectedValue = value;
  const applyClassName = classNames('radio-wrap', { error: errorMessage, 'border-no': noBorder });
  return (
    <>
      <span className="txt" style={{ display: !noBorder && label ? '' : 'none' }}>
        {label} {required ? <span className="required">*</span> : null}
      </span>
      <div id={id} className={applyClassName}>
        {options.map((info) => {
          const label = info[labelKey];
          const value = info[valueKey];
          return (
            <label key={label}>
              <input
                type="radio"
                name={name}
                disabled={disabled}
                value={value}
                checked={selectedValue === value}
                onChange={(event) => {
                  onChange(event.target.value, event);
                }}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      <CommonInputError errorMessage={errorMessage} label={label} />
    </>
  );
}

export default AppRadioGroup;
