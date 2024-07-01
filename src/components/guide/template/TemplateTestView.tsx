import withSourceView from '@/hooks/withSourceView';
import { useParams } from 'react-router-dom';

function TemplateTestView() {
  const { detailId } = useParams();
  console.log(`TemplateUserForm detailId : ${detailId}`);
  return (
    <div>
      <div className="grid-one-container">
        <div className="div-label">ID :</div>
        <div className="div-input">{'id value'}</div>

        <div className="div-label">이름 :</div>
        <div className="div-input">{'name value'}</div>

        <div className="div-label">나이 :</div>
        <div className="div-input">{'age value'}</div>

        <div className="div-label">설명 :</div>
        <div className="div-input">
          <textarea className="textarea" disabled></textarea>
        </div>

        <div className="right" style={{ width: 580 }}>
          <button className="button button-cancel">취소</button>
          <button type="submit" className="button button-info">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default withSourceView(TemplateTestView);
