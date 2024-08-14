import { useState } from 'react';
import AppFileAttach from '../common/AppFileAttach';

function GuideFileAttach() {
  const [fileGroupSeq, setFileGroupSeq] = useState(null);

  const changeInput = (selectedValue) => {
    setFileGroupSeq(selectedValue);
    console.log(`newFileGroupSeq : ${selectedValue}`);
  };

  return (
    <>
      <div className="conts-title">
        <h2>file첨부 가이드</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppFileAttach
                mode="edit"
                label="파일첨부"
                fileGroupSeq={fileGroupSeq}
                workScope={'S'}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  // changeInput('fileGroupSeq', newFileGroupSeq);
                  changeInput(newFileGroupSeq);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuideFileAttach;
