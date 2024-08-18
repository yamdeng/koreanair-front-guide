import { useState } from 'react';
import AppNavigation from '../common/AppNavigation';

import OrgTreeSelectModal from '../modal/OrgTreeSelectModal';
import UserSelectModal from '../modal/UserSelectModal';
import UserSelectWithOrgTreeModal from '../modal/UserSelectWithOrgTreeModal';

function GuideOrgModal() {
  const [isOrgSelectModalopen, setIsOrgSelectModalopen] = useState(false);
  const [isUserSelectModalopen, setIsUserSelectModalopen] = useState(false);
  const [isUserWithOrgSelectModalopen, setIsUserWithOrgSelectModalopen] = useState(false);

  const handleOrgSelectModal = (selectedValue) => {
    console.log(selectedValue);
    setIsOrgSelectModalopen(false);
  };

  const handleUserSelectModal = (selectedValue) => {
    console.log(selectedValue);
    setIsUserSelectModalopen(false);
  };

  const handleUserWithOrgSelectModal = (selectedValue) => {
    console.log(selectedValue);
    setIsUserWithOrgSelectModalopen(false);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>OrgTreeSelectModal, UserSelectModal, UserSelectWithOrgTreeModal</h2>
      </div>
      {/*검색영역 */}
      <div className="editbox">
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => setIsOrgSelectModalopen(true)}
          >
            OrgTreeSelectModal open
          </button>
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => setIsUserSelectModalopen(true)}
          >
            UserSelectModal open
          </button>
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => setIsUserWithOrgSelectModalopen(true)}
          >
            UserWithOrgSelectModal open
          </button>
        </div>
      </div>
      <OrgTreeSelectModal
        isOpen={isOrgSelectModalopen}
        closeModal={() => setIsOrgSelectModalopen(false)}
        isMultiple={false}
        ok={handleOrgSelectModal}
      />
      <UserSelectModal
        isOpen={isUserSelectModalopen}
        closeModal={() => setIsUserSelectModalopen(false)}
        isMultiple={true}
        ok={handleUserSelectModal}
      />
      <UserSelectWithOrgTreeModal
        isOpen={isUserWithOrgSelectModalopen}
        closeModal={() => setIsUserWithOrgSelectModalopen(false)}
        isMultiple={true}
        ok={handleUserWithOrgSelectModal}
      />
    </>
  );
}
export default GuideOrgModal;
