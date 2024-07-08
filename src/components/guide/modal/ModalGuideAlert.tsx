import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import AlertModal from './AlertModal';

function ModalGuideAlert() {
  const [displayModal, setDisplayModal] = useState(false);
  const closeModal = () => {
    setDisplayModal(false);
  };
  return (
    <>
      <div>
        ModalGuideAlert
        <p>
          <button className="button" onClick={() => setDisplayModal(true)}>
            alert modal open
          </button>
        </p>
        <AlertModal displayModal={displayModal} closeModal={closeModal} />
      </div>
    </>
  );
}

export default withSourceView(ModalGuideAlert);
