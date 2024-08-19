import { useEffect, useContext } from 'react';
import { useLocation, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export const useRouterPrompt = (when, message = '변경된 정보가 존재합니다. 이동하시겠습니까?') => {
  const navigate: any = useContext(NavigationContext).navigator;
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const unblock = navigate.block((tx) => {
      if (window.confirm(message)) {
        unblock();
        tx.retry();
      }
    });

    return () => {
      unblock();
    };
  }, [when, message, navigate, location]);
};

export const useBeforeunload = (isDirty) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = '변경된 정보가 존재합니다. 종료하시겠습니까?';
      event.returnValue = message; // 표준에 따라 설정
      return message; // 일부 브라우저에서는 이 반환값을 사용함
    };

    // beforeunload 이벤트 리스너 추가
    if (isDirty) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
};

export const useFormDirtyCheck = (isDirty, message = '변경된 정보가 존재합니다. 이동하시겠습니까?') => {
  const navigate: any = useContext(NavigationContext).navigator;
  const location = useLocation();

  useEffect(() => {
    if (!isDirty) return;

    const unblock = navigate.block((tx) => {
      if (window.confirm(message)) {
        unblock();
        tx.retry();
      }
    });

    return () => {
      unblock();
    };
  }, [isDirty, message, navigate, location]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = '변경된 정보가 존재합니다. 종료하시겠습니까?';
      event.returnValue = message; // 표준에 따라 설정
      return message; // 일부 브라우저에서는 이 반환값을 사용함
    };

    // beforeunload 이벤트 리스너 추가
    if (isDirty) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
};
