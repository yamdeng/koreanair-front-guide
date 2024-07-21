import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import history from './utils/history.ts';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
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

// css import
// import './resources/css/import.css';

// scss import
import './resources/css/import.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router history={history as any}>
    <App />
  </Router>
);
