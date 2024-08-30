import AppNavigation from '@/components/common/AppNavigation';
import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';
import { Viewer } from '@toast-ui/react-editor';
import AppFileAttach from '@/components/common/AppFileAttach';
import ReactUtil from '@/utils/ReactUtil';

const textAreaValue = 'aaaa\nbbbb\n';

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
              <ul className="view-list">
                <li className="accumlate-list">
                  <label className="t-label">제목</label>
                  <span className="text-desc-type1">
                    <AppFileAttach
                      mode="view"
                      fileGroupSeq={'27'}
                      workScope={'A'}
                      onlyImageUpload={true}
                      useDetail
                      disabled
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <ul className="view-list">
                <li className="accumlate-list">
                  <label className="t-label">제목</label>
                  <span className="text-desc-type1">
                    <Viewer initialValue={editorValue} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="box-view-list">
                <ul className="view-list">
                  <li className="accumlate-list">
                    <label className="t-label">내용(textarea)</label>
                    <span
                      className="text-desc-type1"
                      dangerouslySetInnerHTML={{ __html: ReactUtil.convertEnterStringToBrTag(textAreaValue) }}
                    ></span>
                  </li>
                </ul>
              </div>
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
