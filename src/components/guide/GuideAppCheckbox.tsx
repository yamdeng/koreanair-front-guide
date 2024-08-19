import AppCheckbox from '@/components/common/AppCheckbox';
import AppCheckboxGroup from '@/components/common/AppCheckboxGroup';
import AppNavigation from '@/components/common/AppNavigation';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import { useState } from 'react';
import Config from '@/config/Config';

/*

  <AppCheckbox />
    -checkboxTitle

  <AppCheckboxGroup /> 
    -options
    -labelKey, valueKey

  <AppRadioGroup />
   -options
   -labelKey, valueKey

*/

const basicCheckboxOptions = [
  {
    label: '홈',
    value: 'home',
  },
  {
    label: '항공안전',
    value: 'aviation',
  },
  {
    label: '산업안전',
    value: 'occupation',
  },
];

const customCheckboxOptions = [
  {
    name: '홈1',
    id: 'home1',
  },
  {
    name: '항공안전1',
    id: 'aviation1',
  },
  {
    name: '산업안전1',
    id: 'occupation1',
  },
];

function GuideAppCheckbox() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState([]);
  const [checkboxGroupValue2, setCheckboxGroupValue2] = useState([]);

  const [radioGroupValue, setRadioGroupValue] = useState('');
  const [radioGroupValue2, setRadioGroupValue2] = useState('');

  const save = () => {
    console.log(`checkboxValue : ${checkboxValue}`);
    console.log(`checkboxGroupValue : ${checkboxGroupValue}`);
    console.log(`checkboxGroupValue2 : ${checkboxGroupValue2}`);
    console.log(`radioGroupValue : ${radioGroupValue}`);
    console.log(`radioGroupValue2 : ${radioGroupValue2}`);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppCheckbox, AppCheckboxGroup, AppRadioGroup :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppCheckbox.tsx`}>
            GuideAppCheckbox
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="AppCheckbox"
                checkboxTitle="사용여부"
                value={checkboxValue}
                onChange={(value) => setCheckboxValue(value)}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppCheckboxGroup
                label="AppCheckboxGroup"
                options={basicCheckboxOptions}
                value={checkboxGroupValue}
                onChange={(value) => setCheckboxGroupValue(value)}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppCheckboxGroup
                label="AppCheckboxGroup(custom-options)"
                options={customCheckboxOptions}
                value={checkboxGroupValue2}
                labelKey="name"
                valueKey="id"
                onChange={(value) => setCheckboxGroupValue2(value)}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppRadioGroup
                label="AppRadioGroup"
                options={basicCheckboxOptions}
                value={radioGroupValue}
                onChange={(value) => setRadioGroupValue(value)}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="group-box-wrap wid100">
              <AppRadioGroup
                label="AppRadioGroup(custom-options)"
                options={customCheckboxOptions}
                value={radioGroupValue2}
                labelKey="name"
                valueKey="id"
                onChange={(value) => setRadioGroupValue2(value)}
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
export default GuideAppCheckbox;
