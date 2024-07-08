import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function ModalGuideConfirm() {
  const [displayModal, setDisplayModal] = useState(false);
  const closeModal = () => {
    setDisplayModal(false);
  };
  return (
    <>
      <div>
        ModalGuideConfirm
        <p>
          <button className="button" onClick={() => setDisplayModal(true)}>
            confirm modal open
          </button>
        </p>
        <ConfirmModal displayModal={displayModal} closeModal={closeModal} />
      </div>
    </>
  );
}

export default withSourceView(ModalGuideConfirm);
