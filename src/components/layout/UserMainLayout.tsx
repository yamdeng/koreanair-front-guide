import HomePortal from '@/components/HomePortal';
import useAviationRoute from '@/routes/useAviationRoute';
import useOccupationRoute from '@/routes/useOccupationRoute';
import useAppStore from '@/stores/useAppStore';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'zustand';
import NotFound from './NotFound';

function UserMainLayout() {
  const { isInitComplete } = useStore(useAppStore, (state) => state) as any;
  const aviationRoute = useAviationRoute();
  const occupationRoute = useOccupationRoute();
  let routeAllComponent = null;

  if (isInitComplete) {
    routeAllComponent = (
      <Routes>
        <Route path="/" element={<HomePortal />} />
        {aviationRoute}
        {occupationRoute}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return <>{routeAllComponent}</>;
}

export default UserMainLayout;
