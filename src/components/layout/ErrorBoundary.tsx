import React from 'react';
// import Constant from 'config/Constant';
// import Logger from 'utils/Logger';
import Logger from '@/utils/Logger';
import { ERROR_TYPE_REACT } from '@/config/CommonConstant';

/*

    이름 : render 에러 handle 컴포넌트
    
    store
      -appStore
      
*/
class ErrorBoundary extends React.Component<any, any> {
  state = {
    hasError: false,
  };

  constructor(props) {
    super(props);

    // 페이지 재시작
    this.refreshPage = this.refreshPage.bind(this);
  }

  static getDerivedStateFromError(error) {
    Logger.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const errorObject: any = {};
    errorObject.errorType = ERROR_TYPE_REACT;
    if (error.message) {
      errorObject.message = error.message;
    }
    if (error.stack) {
      errorObject.stack = error.stack;
    }
    if (info && info.componentStack) {
      errorObject.componentStack = info.componentStack;
    }
    this.setState({
      errorObject: errorObject,
    });
    Logger.error(JSON.stringify(errorObject));
  }

  refreshPage() {
    // this.props.appStore.reloadApp();
    alert('refresh');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>new safenet 시스템</h2>
          <p>
            오류가 발생하였습니다.
            <br />
            safenet 시스템을 재시작해주세요.
          </p>
          <div>
            <button type="button" onClick={this.refreshPage}>
              재시작
            </button>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
