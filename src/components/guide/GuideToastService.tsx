import ToastService from '@/services/ToastService';
import AppNavigation from '../common/AppNavigation';

function GuideToastService() {
  const handleToastService = () => {
    ToastService.success('call success');
    ToastService.error('call error');
    ToastService.warn('call warn');
    ToastService.info('call info.');
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>ToastService</h2>
      </div>
      <div className="editbox">
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={handleToastService}
          >
            toast
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideToastService;
