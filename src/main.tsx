import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// third lib css import
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'tui-color-picker/dist/tui-color-picker.css';

// css import
import AdminApp from './AdminApp.tsx';
import './resources/css/import.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AdminApp />
  </BrowserRouter>
);
