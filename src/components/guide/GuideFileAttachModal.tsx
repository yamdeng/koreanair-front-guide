import { useState } from 'react';
import AppNavigation from '../common/AppNavigation';

import Config from '@/config/Config';
import CommonFileAttachModal from '../modal/CommonFileAttachModal';

function GuideFileAttachModal() {
  const [isFileAttachModalOpen, setIsFileAttachModalOpen] = useState(false);
  const [fileGroupSeq, setFileGroupSeq] = useState(236);

  const handleFormValueChange = (fileGroupSeq) => {
    console.log(fileGroupSeq);
    setFileGroupSeq(fileGroupSeq);
  };

  const handleOk = () => {};

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          CommonFileAttachModal :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideFileAttachModal.tsx`}>
            GuideFileAttachModal
          </a>
        </h2>
      </div>
      {/*검색영역 */}
      <div className="editbox">
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => setIsFileAttachModalOpen(true)}
          >
            CommonFileAttachModal open
          </button>
        </div>
      </div>
      <CommonFileAttachModal
        isOpen={isFileAttachModalOpen}
        closeModal={() => setIsFileAttachModalOpen(false)}
        fileGroupSeq={fileGroupSeq}
        changeFileGroupSeq={(fileGroupSeq) => handleFormValueChange(fileGroupSeq)}
        ok={handleOk}
      />
    </>
  );
}
export default GuideFileAttachModal;
