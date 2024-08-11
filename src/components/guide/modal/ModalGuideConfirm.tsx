import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function ModalGuideConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div>
        ModalGuideConfirm
        <p>
          <button className="button" onClick={() => setIsOpen(true)}>
            confirm modal open
          </button>
        </p>
        <ConfirmModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
}

export default withSourceView(ModalGuideConfirm);
