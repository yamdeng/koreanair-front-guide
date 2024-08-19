import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import history from './utils/history.ts';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { setLocale } from 'yup';

// yup의 locale 설정
setLocale({
  mixed: {
    default: '이 필드는 유효하지 않습니다.',
    required: '이 필드는 필수입니다.',
    oneOf: '${values} 중 하나여야 합니다.',
    notOneOf: '${values} 중 하나여서는 안 됩니다.',
  },
});

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router history={history as any}>
    <App />
  </Router>
);
