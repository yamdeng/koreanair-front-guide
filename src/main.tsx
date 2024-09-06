import { setAutoFreeze } from 'immer';
import './yupLocale';
setAutoFreeze(false);

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import history from './utils/history.ts';

dayjs.locale('ko');
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);

// third lib css import
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import ErrorBoundary from './components/layout/ErrorBoundary.tsx';
import './resources/css/import.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router history={history as any}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>
);
