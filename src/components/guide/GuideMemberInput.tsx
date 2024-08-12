import { useState } from 'react';
import AppDeptSelectInput from '../common/AppDeptSelectInput';
import AppUserSelectInput from '../common/AppUserSelectInput';

function GuideMemberInput() {
  const [deptSelectValue, setDeptSelectValue] = useState(null);
  const [userSelectValue, setUserSelectValue] = useState(null);

  const handleDeptSelectInput = (selectedValue) => {
    setDeptSelectValue(selectedValue);
  };

  const handleUserSelectInput = (selectedValue) => {
    setUserSelectValue(selectedValue);
  };

  return (
    <>
      <div className="conts-title">
        <h2>input 가이드</h2>
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
                withOrgTree={true}
                label="사용자선택"
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

export default GuideMemberInput;
