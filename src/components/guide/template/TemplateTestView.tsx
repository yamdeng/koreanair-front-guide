import withSourceView from '@/hooks/withSourceView';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTemplateTestFormStore from '@/stores/guide/useTemplateTestFormStore';

/*

  데이터 상세 예시

*/
function TemplateTestView() {
  const { id, sabun, name, nameEn, position, phone, deptName, description, cancel, getDetail, gorFormPage, clear } =
    useTemplateTestFormStore();

  const { detailId } = useParams();

  const valueStyle = { padding: 10 };

  useEffect(() => {
    getDetail(detailId);
    return clear();
  }, []);

  return (
    <>
      <div className="grid-one-container">
        <div className="div-label">ID :</div>
        <div className="div-input" style={valueStyle}>
          <span>{id}</span>
        </div>

        <div className="div-label">사번 :</div>
        <div className="div-input">
          <span style={valueStyle}>{sabun}</span>
        </div>

        <div className="div-label">이름 :</div>
        <div className="div-input">
          <span style={valueStyle}>{name}</span>
        </div>

        <div className="div-label">이름(영어) :</div>
        <div className="div-input">
          <span style={valueStyle}>{nameEn}</span>
        </div>

        <div className="div-label">직책 :</div>
        <div className="div-input radio">
          <span style={valueStyle}>{position}</span>
        </div>

        <div className="div-label">핸드폰 번호 :</div>
        <div className="div-input">
          <span style={valueStyle}>{phone}</span>
        </div>

        <div className="div-label">부서 :</div>
        <div className="div-input radio">
          <span style={valueStyle}>{deptName}</span>
        </div>

        <div className="div-label">설명 :</div>
        <div className="div-input">
          <span style={valueStyle}>{description}</span>
        </div>

        <div className="right" style={{ width: 580 }}>
          <button className="button button-cancel" onClick={cancel}>
            취소
          </button>
          <button className="button button-info" onClick={gorFormPage}>
            수정
          </button>
        </div>
      </div>
    </>
  );
}

export default withSourceView(TemplateTestView);
