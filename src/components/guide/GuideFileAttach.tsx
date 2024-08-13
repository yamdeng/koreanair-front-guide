import { useState } from 'react';
import AppFileAttach from '../common/AppFileAttach';

function GuideFileAttach() {
  const [fileGroupSeq, setFileGroupSeq] = useState(null);
  const [fileList, setFileList] = useState(null);

  const changeInput = (selectedValue) => {
    debugger;
    setFileGroupSeq(selectedValue);
  };

  return (
    <>
      <div className="conts-title">
        <h2>input 가이드</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppFileAttach
                fileGroupSeq={null}
                workScope={'업무구문(A,O,S)'}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  // TODO : newFileGroupSeq를 handle
                  // changeInput('fileGroupSeq', newFileGroupSeq);
                  changeInput(newFileGroupSeq);
                }}
                updateFileList={(fileList) => {
                  // TODO : fileList handle
                  debugger;
                  setFileList(fileList);
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
