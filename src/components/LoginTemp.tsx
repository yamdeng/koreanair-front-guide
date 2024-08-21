import Code from '@/config/Code';
import ApiService from '@/services/ApiService';
import useAppStore from '@/stores/useAppStore';
import CommonUtil from '@/utils/CommonUtil';
import { useState } from 'react';
import AppSearchInput from './common/AppSearchInput';
import AppSelect from './common/AppSelect';

function LoginTemp() {
  const { setLoginToken } = useAppStore.getState();
  const [loginId, setLoginId] = useState('ADMIN');
  const [scope, setScope] = useState('A');

  const login = async () => {
    const apiParam: any = {};
    apiParam.empNo = loginId;
    const response = await ApiService.post('auth/login', apiParam, { applyOriginalResponse: true, byPassError: true });
    const data = response.data;
    const { accessToken, refreshToken } = data;
    CommonUtil.saveInfoToLocalStorage('accessToken', accessToken);
    CommonUtil.saveInfoToLocalStorage('refreshToken', refreshToken);
    setLoginToken(accessToken, refreshToken);
    const mode = import.meta.env.MODE;
    if (mode !== 'admin') {
      if (scope === 'A') {
        location.href = '/aviation';
      } else {
        location.href = '/occupation';
      }
    } else {
      location.href = '/';
    }
  };
  return (
    <div>
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
              <AppSearchInput
                label="로그인"
                style={{ marginBottom: 10 }}
                value={loginId}
                onChange={(value) => setLoginId(value)}
                search={login}
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

export default LoginTemp;
