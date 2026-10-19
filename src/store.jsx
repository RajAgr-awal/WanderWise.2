import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const KEY = 'wanderwise.v1';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export function AppProvider({ children }) {
  const saved = load();
  const [user, setUser] = useState(saved.user || null);
  const [trips, setTrips] = useState(saved.trips || []);
  const [templates, setTemplates] = useState(saved.templates || []);
  const [chats, setChats] = useState(saved.chats || {});
  const [nav, setNav] = useState({ tab: 'discover', stack: [] });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ user, trips, templates, chats }));
  }, [user, trips, templates, chats]);

  const notify = useCallback((m) => { setToast(m); setTimeout(() => setToast(null), 2200); }, []);

  const push = useCallback((view) => setNav((n) => ({ ...n, stack: [...n.stack, view] })), []);
  const pop = useCallback(() => setNav((n) => ({ ...n, stack: n.stack.slice(0, -1) })), []);
  const reset = useCallback((tab) => setNav({ tab, stack: [] }), []);
  const replace = useCallback((view) => setNav((n) => ({ ...n, stack: [...n.stack.slice(0, -1), view] })), []);

  const saveTrip = useCallback((trip) => {
    setTrips((t) => {
      const i = t.findIndex((x) => x.id === trip.id);
      if (i >= 0) { const n = [...t]; n[i] = trip; return n; }
      return [trip, ...t];
    });
  }, []);
  const deleteTrip = useCallback((id) => setTrips((t) => t.filter((x) => x.id !== id)), []);

  const value = useMemo(() => ({
    user, setUser, trips, saveTrip, deleteTrip, setTrips,
    templates, setTemplates, chats, setChats,
    nav, push, pop, reset, replace, toast, notify,
  }), [user, trips, templates, chats, nav, push, pop, reset, replace, toast, notify, saveTrip, deleteTrip]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
