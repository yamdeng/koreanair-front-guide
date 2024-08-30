import { useState } from 'react';
import Config from '@/config/Config';
import AppNavigation from '../common/AppNavigation';
import AppUserSelectInput from '../common/AppUserSelectInput';
import AppDeptSelectInput from '../common/AppDeptSelectInput';

function GuideAppMemberInput() {
  const [deptSelectValue, setDeptSelectValue] = useState('BOD');
  const [userSelectValue, setUserSelectValue] = useState('23312');

  const handleDeptSelectInput = (selectedValue) => {
    console.log(selectedValue);
    setDeptSelectValue(selectedValue);
  };

  const handleUserSelectInput = (selectedValue) => {
    console.log(selectedValue);
    setUserSelectValue(selectedValue);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppDeptSelectInput, AppUserSelectInput :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppMemberInput.tsx`}>
            GuideAppMemberInput
          </a>
        </h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppDeptSelectInput
                label="부서선택"
                value={deptSelectValue}
                onChange={(value) => {
                  handleDeptSelectInput(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppUserSelectInput
                withOrgTree={false}
                label="사용자선택"
                value={userSelectValue}
                onChange={(value) => {
                  handleUserSelectInput(value);
                }}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppUserSelectInput
                withOrgTree={true}
                label="사용자선택(부서트리)"
                value={userSelectValue}
                onChange={(value) => {
                  handleUserSelectInput(value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GuideAppMemberInput;
