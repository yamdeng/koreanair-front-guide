import { useParams } from 'react-router-dom';

function TemplateUserForm() {
  const { detailId } = useParams();
  console.log(`TemplateUserForm detailId : ${detailId}`);
  return <div>소스 TemplateUserForm</div>;
}

export default TemplateUserForm;
