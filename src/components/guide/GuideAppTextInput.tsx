import { useState } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppTextInput from '@/components/common/AppTextInput';
import Config from '@/config/Config';

/*

  <AppTextInput />
    -hiddenClearButton
    -inputType

  <AppSearchInput /> 
    -search(function)
    -clearHandler(function)

*/
function GuideAppTextInput() {
  const [textValue, setTextValue] = useState('');
  const [numberValue, setNumberValue] = useState(null);

  const save = () => {
    alert(`textValue: ${textValue}`);
    alert(`numberValue: ${numberValue}`);
  };

  const search = () => {
    alert('AppInputSearch search function call');
  };

  const clearHandler = () => {
    alert('커스텀 input clear 함수');
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppTextInput, AppSearchInput :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppTextInput.tsx`}>
            GuideAppTextInput
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                label="AppTextInput(text)"
                value={textValue}
                onChange={(value) => setTextValue(value)}
                hiddenClearButton={false}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput
                inputType="number"
                label="AppTextInput(number)"
                value={numberValue}
                onChange={(value) => setNumberValue(value)}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSearchInput
                label="AppSearchInput"
                value={textValue}
                onChange={(value) => setTextValue(value)}
                search={search}
                clearHandler2={clearHandler}
              />
            </div>
          </div>
        </div>
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
export default GuideAppTextInput;
