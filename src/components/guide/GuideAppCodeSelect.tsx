import { useState } from 'react';
import AppNavigation from '@/components/common/AppNavigation';
import AppSelect from '@/components/common/AppSelect';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import Code from '@/config/Code';
import Config from '@/config/Config';

/*

  <AppSelect />
    -Code.ts 사용법
    -value
    -onChange
    -options
    -isMultiple
    -labelKey, valueKey
    -applyAllSelect, allValue, allLabel
     : single에서만 사용하세요
    -apiUrl
    -placeholder : 체크 기준은 ''이 아닌 null 입니다.

  <AppCodeSelect /> 
    -codeGrpId

*/

const customOptions = [
  { userId: 'user1', userName: '안용성1' },
  { userId: 'user2', userName: '안용성2' },
  { userId: 'user3', userName: '안용성3' },
  { userId: 'user4', userName: '안용성4' },
  { userId: 'user5', userName: '안용성5' },
  { userId: 'user6', userName: '안용성6' },
  { userId: 'user7', userName: '안용성7' },
  { userId: 'user8', userName: '안용성8' },
  { userId: 'user9', userName: '안용성9' },
  { userId: 'user10', userName: '안용성10' },
];
function GuideAppTextInput() {
  const [singleSelectValue, setSingleSelectValue] = useState('');
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);
  const [labelTestSingleSelectValue, setLabelTestSingleSelectValue] = useState('');
  const [labelTestMultipleSelectValue, setLabelTestMultipleSelectValue] = useState([]);
  const [apiTestSingleSelectValue, setApiTestSingleSelectValue] = useState('');

  const [singleCodeSelectValue, setSingleCodeSelectValue] = useState('');
  const [multipleCodeSelectValue, setMultipleCodeSelectValue] = useState([]);

  const save = () => {
    console.log(`singleSelectValue : ${singleSelectValue}`);
    console.log(`multipleSelectValue : ${multipleSelectValue}`);
    console.log(`labelTestSingleSelectValue : ${labelTestSingleSelectValue}`);
    console.log(`labelTestMultipleSelectValue : ${labelTestMultipleSelectValue}`);
    console.log(`labelTestSingleSelectValue : ${labelTestSingleSelectValue}`);
    console.log(`singleCodeSelectValue : ${singleCodeSelectValue}`);
    console.log(`multipleCodeSelectValue : ${multipleCodeSelectValue}`);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppSelect, AppCodeSelect :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppCodeSelect.tsx`}>
            GuideAppCodeSelect
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                label="AppSelect(single), Code.ts"
                value={singleSelectValue}
                options={Code.adminWorkScope}
                onChange={(value) => {
                  setSingleSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                label="AppSelect(multiple), Code.ts"
                isMultiple
                value={multipleSelectValue}
                options={Code.adminWorkScope}
                onChange={(value) => {
                  setMultipleSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                label="AppSelect labelKey, valueKey"
                isMultiple
                value={labelTestMultipleSelectValue}
                options={customOptions}
                labelKey="userName"
                valueKey="userId"
                onChange={(value) => {
                  setLabelTestMultipleSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                label="AppSelect applyAllSelect, allValue, allLabel"
                applyAllSelect
                allValue=""
                allLabel="전체"
                value={labelTestSingleSelectValue}
                options={customOptions}
                labelKey="userName"
                valueKey="userId"
                onChange={(value) => {
                  setLabelTestSingleSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppSelect
                label="AppSelect apiUrl"
                applyAllSelect
                apiUrl={`com/code-groups/CODE_GRP_303/codes`}
                allValue=""
                allLabel="전체"
                value={apiTestSingleSelectValue}
                labelKey="codeNameKor"
                valueKey="codeId"
                onChange={(value) => {
                  setApiTestSingleSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_302"
                label="CODE_GRP_302"
                value={singleCodeSelectValue}
                onChange={(value) => {
                  setSingleCodeSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                codeGrpId="CODE_GRP_303"
                label="CODE_GRP_303"
                value={multipleCodeSelectValue}
                isMultiple
                onChange={(value) => {
                  setMultipleCodeSelectValue(value);
                }}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect
                label="그룹멀티코드"
                codeGrpIdList={['CODE_GRP_302', 'CODE_GRP_303']}
                value={multipleCodeSelectValue}
                isMultiple
                isMultiGroupCode
                onChange={(value) => {
                  setMultipleCodeSelectValue(value);
                }}
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
