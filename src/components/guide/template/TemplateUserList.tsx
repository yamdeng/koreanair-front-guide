import { useNavigate } from 'react-router-dom';

function TemplateUserList() {
  const navigate = useNavigate();

  const moveDetailPage = () => {
    navigate('/template/users/3');
  };
  const moveFormPage = () => {
    navigate('/template/users/add/form');
  };

  return (
    <div>
      소스 TemplateUserList
      <br />
      <button onClick={moveDetailPage}>detail go</button>
      <button onClick={moveFormPage}>form go</button>
    </div>
  );
}

export default TemplateUserList;
