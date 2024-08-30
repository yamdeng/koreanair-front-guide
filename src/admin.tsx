import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import AdminApp from './AdminApp.tsx';
import history from './utils/history.ts';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import ErrorBoundary from './components/layout/ErrorBoundary.tsx';

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
import './resources/css/importadmin.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router history={history as any}>
    <ErrorBoundary>
      <AdminApp />
    </ErrorBoundary>
  </Router>
);
