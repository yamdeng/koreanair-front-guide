import HomePortal from '@/components/HomePortal';
import useAppStore from '@/stores/useAppStore';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'zustand';
import useAviationRoute from '@/routes/useAviationRoute';
import useOccupationRoute from '@/routes/useOccupationRoute';
import useOfflineRoute from '@/routes/useOfflineRoute';

function UserMainLayout() {
  const { isInitComplete } = useStore(useAppStore, (state) => state) as any;
  const aviationRoute = useAviationRoute();
  const occupationRoute = useOccupationRoute();
  const offlineRoute = useOfflineRoute();
  let routeAllComponent = null;

  if (isInitComplete) {
    routeAllComponent = (
      <Routes>
        <Route path="/" element={<HomePortal />} />
        {aviationRoute}
        {occupationRoute}
        {offlineRoute}
      </Routes>
    );
  }

  return <>{routeAllComponent}</>;
}

export default UserMainLayout;
