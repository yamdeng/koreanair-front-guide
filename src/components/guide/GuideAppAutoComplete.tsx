import { useState } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import AppAutoComplete from '../common/AppAutoComplete';
import Config from '@/config/Config';

/*

  <AppAutoComplete />
    -apiUrl
    -value
    -onChange
    -labelKey = 'label'
    -valueKey = 'value'

  <AppAutoComplete /> 
    -onlySelect = true / false
    -onSelect

  <AppAutoComplete /> 
    -isValueString = true / false

*/

const beforeSingleValue = { userId: '32636', nameKor: 'aaa1' };
const beforeMultiValue = [
  { userId: '32636', nameKor: 'aaa1' },
  { userId: '32637', nameKor: 'aaa2' },
];
function GuideAppAutoComplete() {
  const [selectSingleValue, setSelectSingleValue] = useState(beforeSingleValue);
  const [selectMultipleValue, setSelectMultipleValue] = useState(beforeMultiValue);
  const [selectUser, setSelectUser] = useState(null);
  const [onlyKeyValue, setOnlyKeyValue] = useState(null);

  const save = () => {};

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppAutoComplete :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppAutoComplete.tsx`}>
            GuideAppAutoComplete
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppAutoComplete
                label="AppAutoComplete(single)"
                apiUrl="com/users"
                value={selectSingleValue}
                labelKey="nameKor"
                valueKey="userId"
                onChange={(value) => setSelectSingleValue(value)}
                isMultiple={true}
              />
            </div>
          </div>
        </div>
        <p>single : {JSON.stringify(selectSingleValue)}</p>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppAutoComplete
                label="AppAutoComplete(multiple)"
                apiUrl="com/users"
                value={selectMultipleValue}
                labelKey="nameKor"
                valueKey="userId"
                onChange={(value) => setSelectMultipleValue(value)}
                isMultiple={true}
              />
            </div>
          </div>
        </div>
        <p>multiple : {JSON.stringify(selectMultipleValue)}</p>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppAutoComplete
                label="AppAutoComplete(onlySelect)"
                apiUrl="com/users"
                value={selectUser}
                labelKey="nameKor"
                valueKey="userId"
                onlySelect
                onSelect={(value) => setSelectUser(value)}
              />
            </div>
          </div>
        </div>
        <p>onlySelect : {JSON.stringify(selectUser)}</p>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppAutoComplete
                label="AppAutoComplete(value type string)"
                apiUrl="com/users"
                value={onlyKeyValue}
                labelKey="nameKor"
                valueKey="userId"
                onChange={(value) => {
                  setOnlyKeyValue(value);
                }}
                isMultiple={false}
                isValueString
              />
            </div>
          </div>
        </div>
        <p>value type string : {JSON.stringify(onlyKeyValue)}</p>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
      </div>
    </>
  );
}
export default GuideAppAutoComplete;
