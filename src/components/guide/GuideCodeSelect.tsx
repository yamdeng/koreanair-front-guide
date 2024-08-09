import AppCodeSelect from '../common/AppCodeSelect';
import i18n from '@/services/i18n';

function GuideCodeSelect() {
  //admin.AdminMain.CodeAdmin.cancel

  return (
    <>
      <div className="conts-title">
        <h2>다국어 및 Code</h2>
      </div>

      {/*검색영역 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect label="다국어 code 확인" codeGrpId="CODE_GRP_303" />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppCodeSelect label="다국어 code 확인(remote)" isRemote codeGrpId="CODE_GRP_303" />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <p>{i18n('항공안전')}</p>
              <p>{i18n('components.Page.noApply')}</p>
              <p>{i18n('components.Page.noApply2', '없는 메시지')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuideCodeSelect;
