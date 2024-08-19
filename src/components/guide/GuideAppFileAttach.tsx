import { useState } from 'react';
import AppFileAttach from '../common/AppFileAttach';
import AppNavigation from '../common/AppNavigation';

/*

  mode : 'edit'(기본값), 'view'
  accept : 허용 확장자 전달
   -예시) accept="image/*,.pdf"
   -https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
  onlyImageUpload = true / false
  maxSizeMb: 5(기본값)

*/

function GuideAppFileAttach() {
  const [fileGroupSeq, setFileGroupSeq] = useState('');
  const [fileGroupSeq2, setFileGroupSeq2] = useState(null);

  return (
    <>
      <AppNavigation />
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
                workScope={'A'}
                onlyImageUpload={false}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  setFileGroupSeq(newFileGroupSeq);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppFileAttach
                mode="edit"
                label="파일첨부(이미지)"
                fileGroupSeq={fileGroupSeq2}
                workScope={'O'}
                onlyImageUpload={true}
                updateFileGroupSeq={(newFileGroupSeq) => {
                  setFileGroupSeq2(newFileGroupSeq);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuideAppFileAttach;
