import { Outlet } from 'react-router-dom';

export default function GuideSourceLayout() {
  return (
    <div style={{ padding: 5 }}>
      <Outlet />
    </div>
  );
}
