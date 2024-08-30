import './yupLocale';
import localforage from 'localforage';

import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import history from './utils/history.ts';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import useAppStore from '@/stores/useAppStore';
import PwaChecker from './PwaChecker';

dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);

// third lib css import
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import './resources/css/import.scss';
import ErrorBoundary from './components/layout/ErrorBoundary.tsx';

// pwa mobile & offliine setting

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'offline-storage',
});

const isOnline = navigator.onLine;
useAppStore.getState().setIsOffline(!isOnline);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router history={history as any}>
    <ErrorBoundary>
      <PwaChecker>
        <App />
      </PwaChecker>
    </ErrorBoundary>
  </Router>
);
