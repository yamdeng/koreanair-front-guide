import { useState } from 'react';
import AppNavigation from '../common/AppNavigation';
import AlertModal from '../modal/AlertModal';
import ConfirmModal from '../modal/ConfirmModal';
import Config from '@/config/Config';

function GuideAlertModal() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const alertModalOk = () => {
    setIsAlertModalOpen(false);
  };

  const confirmModalOk = () => {
    setIsConfirmModalOpen(false);
  };

  const confirmModalCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AlertModal, ConfirmModal :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAlertModal.tsx`}>
            GuideAlertModal
          </a>
        </h2>
      </div>
      <div className="editbox">
        <button
          type="button"
          name="button"
          className="btn-sm btn_text btn-darkblue-line"
          onClick={() => setIsAlertModalOpen(true)}
        >
          AlertModal open
        </button>
        <button
          type="button"
          name="button"
          className="btn-sm btn_text btn-darkblue-line"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          ConfirmModal open
        </button>
      </div>
      <AlertModal
        title="alert 모달 테스트"
        body="안녕하세요\n반갑습니다."
        okLabel="닫기"
        isOpen={isAlertModalOpen}
        closeModal={() => setIsAlertModalOpen(false)}
        ok={alertModalOk}
      />
      <ConfirmModal
        title="confirm 모달 테스트"
        body="안녕하세요\n반갑습니다."
        okLabel="저장"
        cancelLabel="닫기"
        isOpen={isConfirmModalOpen}
        closeModal={() => setIsConfirmModalOpen(false)}
        cancel={confirmModalCancel}
        ok={confirmModalOk}
      />
    </>
  );
}
export default GuideAlertModal;
