import { useParams } from 'react-router-dom';

function TemplateUserView() {
  const { detailId } = useParams();
  console.log(`TemplateUserView detailId : ${detailId}`);
  return <div>소스 TemplateUserView</div>;
}

export default TemplateUserView;
