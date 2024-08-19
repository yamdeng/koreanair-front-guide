import { useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import AppNavigation from '../common/AppNavigation';
import AppTextArea from '../common/AppTextArea';
import AppEditor from '../common/AppEditor';
import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';

/*

  <AppTextArea />

  <AppEditor />

*/
function GuideAppTextEditor() {
  const [textValue, setTextValue] = useState('');
  const [editorValue, setEditorValue] = useState('');

  const beforeEditorValue = CommonUtil.getByLocalStorage('test-editor') || '';

  const save = () => {
    alert(`textValue: ${textValue}`);
    alert(`editorValue: ${editorValue}`);
    CommonUtil.saveInfoToLocalStorage('test-editor', editorValue);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppTextArea, AppEditor :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppTextEditor.tsx`}>
            GuideAppTextEditor
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextArea label="AppTextArea" value={textValue} onChange={(value) => setTextValue(value)} />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppEditor label="AppEditor" value={editorValue} onChange={(value) => setEditorValue(value)} />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <Viewer initialValue={beforeEditorValue} />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
      </div>
    </>
  );
}
export default GuideAppTextEditor;
