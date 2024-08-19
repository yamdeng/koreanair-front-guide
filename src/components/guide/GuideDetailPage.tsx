import AppNavigation from '@/components/common/AppNavigation';
import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';
import { Viewer } from '@toast-ui/react-editor';
import AppFileAttach from '../common/AppFileAttach';

function GuideDetailPage() {
  const editorValue = CommonUtil.getByLocalStorage('test-editor');
  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          상세(첨부, 에디터) :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideDetailPage.tsx`}>
            GuideDetailPage
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppFileAttach mode="view" label="파일첨부" fileGroupSeq={'27'} workScope={'A'} onlyImageUpload={true} />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <Viewer initialValue={editorValue} />
            </div>
          </div>
        </div>
      </div>
      <div className="pop_btns">
        <button className="btn_text text_color_neutral-10 btn_confirm">확인</button>
      </div>
    </>
  );
}
export default GuideDetailPage;
