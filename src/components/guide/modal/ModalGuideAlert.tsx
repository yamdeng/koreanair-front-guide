import withSourceView from '@/hooks/withSourceView';
import { useState } from 'react';
import AlertModal from './AlertModal';

function ModalGuideAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div>
        ModalGuideAlert
        <p>
          <button className="button" onClick={() => setIsOpen(true)}>
            alert modal open
          </button>
        </p>
        <AlertModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
}

export default withSourceView(ModalGuideAlert);
