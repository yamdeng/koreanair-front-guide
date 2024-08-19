import ModalService from '@/services/ModalService';
import AppNavigation from '../common/AppNavigation';
import Config from '@/config/Config';

function GuideModalService() {
  const handleAlertModal = () => {
    ModalService.alert({
      title: 'alert test',
      body: '안녕하세요.\n반갑습니다.',
      okLabel: '닫아주세요.',
      ok: () => {
        alert('ok handler');
      },
    });
  };

  const handleConfirmModal = () => {
    ModalService.confirm({
      title: 'confirm test',
      body: '안녕하세요.\n반갑습니다.',
      okLabel: '저장.',
      cancelLabel: '닫아주세요',
      ok: () => {
        alert('ok handler');
      },
      cancel: () => {
        alert('cancel handler');
      },
    });
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          ModalService.alert, ModalService.confirm :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideModalService.tsx`}>
            GuideModalService
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={handleAlertModal}>
            alert modal
          </button>
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={handleConfirmModal}
          >
            confirm modal
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideModalService;
