import ApiService from '@/services/ApiService';
import AppNavigation from '../common/AppNavigation';
import Config from '@/config/Config';

function GuideToastService() {
  const handleApiServiceBasic = async () => {
    const apiResult = await ApiService.get('com/code-groups/CODE_GRP_001/codes');
    // 서버의 응답값만 가져옴
    console.log(`apiResult : ${JSON.stringify(apiResult)}`);
  };

  const disableLoadingBar = async () => {
    ApiService.get('com/code-groups/CODE_GRP_001/codes', null, {
      disableLoadingBar: true,
    });
  };

  const applyOriginalResponse = async () => {
    const apiResult = await ApiService.get(`com/code-groups/CODE_GRP_001/codes`, null, {
      applyOriginalResponse: true,
    });
    // 서버의 응답값외의 http 전반적인 모든 값을 가져온다
    console.log(`apiResult : ${JSON.stringify(apiResult)}`);
  };

  const byPassError = async () => {
    ApiService.get('com/tests/nullpointer', null, {
      byPassError: true,
    });
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          ApiService :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideApiService.tsx`}>
            GuideApiService
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={handleApiServiceBasic}
          >
            기본
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={disableLoadingBar}>
            disableLoadingBar
          </button>
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={applyOriginalResponse}
          >
            applyOriginalResponse
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={byPassError}>
            byPassError
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideToastService;
