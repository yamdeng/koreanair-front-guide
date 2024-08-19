import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Code from '@/config/Code';
import AppSelect from './common/AppSelect';
import AppTextInput from './common/AppTextInput';
// import ApiService from '@/services/ApiService';

function HomePortal() {
  const [loginId, setLoginId] = useState('');
  const [scope, setScope] = useState('A');
  const navigate = useNavigate();
  const testStyle = { padding: 10, textDecoration: 'underline', fontWeight: 'bold' };

  const login = async () => {
    const apiParam: any = {};
    apiParam.loginId = loginId;
    // const apiResult = await ApiService.get('com/login', apiParam);
    if (scope === 'A') {
      navigate('/aviation');
    } else {
      navigate('/occupation');
    }
  };
  return (
    <div>
      HomePortal
      <p
        style={testStyle}
        onClick={() => {
          navigate('/aviation');
        }}
      >
        항공안전으로 이동
      </p>
      <p
        style={testStyle}
        onClick={() => {
          navigate('/occupation');
        }}
      >
        산업안전으로 이동
      </p>
      <div style={{ padding: 20 }} className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect label="구분" options={Code.loginScope} value={scope} onChange={(value) => setScope(value)} />
            </div>
          </div>
        </div>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="로그인"
                style={{ marginBottom: 10 }}
                value={loginId}
                onChange={(value) => setLoginId(value)}
              />
            </div>
          </div>
        </div>
        <div className="contents-btns">
          <button className="btn_text text_color_neutral-10 btn_confirm" onClick={login} disabled={!loginId}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePortal;
