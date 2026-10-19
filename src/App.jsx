import * as I from './icons.jsx';
import { useApp } from './store.jsx';
import Auth from './screens/Auth.jsx';
import Discover from './screens/Discover.jsx';
import Trips from './screens/Trips.jsx';
import Profile from './screens/Profile.jsx';
import TripSetup from './screens/TripSetup.jsx';
import TripDetail from './screens/TripDetail.jsx';
import Builder from './screens/Builder.jsx';
import Chat from './screens/Chat.jsx';

const TABS = [
  { id: 'discover', label: 'Discover', icon: I.ICompass },
  { id: 'trips', label: 'My Trips', icon: I.IMap },
  { id: 'profile', label: 'Profile', icon: I.IUser },
];

export default function App() {
  const { user, nav, reset, toast } = useApp();

  if (!user) return <div className="shell"><Auth /></div>;

  const top = nav.stack[nav.stack.length - 1];
  let view;
  if (top?.type === 'setup') view = <TripSetup cityId={top.cityId} />;
  else if (top?.type === 'tour') view = <TripSetup tourId={top.tourId} />;
  else if (top?.type === 'trip') view = <TripDetail tripId={top.tripId} />;
  else if (top?.type === 'builder') view = <Builder preset={top.preset} />;
  else if (top?.type === 'chat') view = <Chat cityId={top.cityId} tripId={top.tripId} />;
  else if (nav.tab === 'trips') view = <Trips />;
  else if (nav.tab === 'profile') view = <Profile />;
  else view = <Discover />;

  const showTabs = !top;

  return (
    <div className="shell">
      {view}
      {showTabs && (
        <nav className="tabbar">
          {TABS.map((t) => (
            <button key={t.id} className={nav.tab === t.id ? 'on' : ''} onClick={() => reset(t.id)}>
              <t.icon size={22} />{t.label}
            </button>
          ))}
        </nav>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
