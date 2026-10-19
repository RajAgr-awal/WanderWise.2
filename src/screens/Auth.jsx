import { useState } from 'react';
import * as I from '../icons.jsx';
import { Field } from '../components.jsx';
import { useApp } from '../store.jsx';

export default function Auth() {
  const { setUser } = useApp();
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const submit = () => {
    if (mode === 'signup' && name.trim().length < 2) return setErr('Please enter your full name.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('Enter a valid email address.');
    if (pw.length < 8) return setErr('Password must be at least 8 characters.');
    setErr('');
    setUser({
      name: mode === 'signup' ? name.trim().split(' ')[0] : email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase()),
      fullName: mode === 'signup' ? name.trim() : email.split('@')[0],
      email,
    });
  };

  const forgot = () => setErr('A reset link would be emailed to you (mock build).');

  return (
    <div className="screen noTabs">
      <div className="pad" style={{ paddingTop: 90 }}>
        <span className="wordmark">Wanderwise</span>
        <h1>{mode === 'signin' ? 'Welcome back' : 'Create account'}</h1>
        <p className="sub" style={{ marginBottom: 40 }}>
          {mode === 'signin' ? 'Sign in to plan your next escape.' : 'Begin curating your next journey.'}
        </p>

        {mode === 'signup' && (
          <Field label="Full name" icon={<I.IUser size={22} color="#7a7a7a" />}
            value={name} onChange={setName} placeholder="Ada Lovelace" />
        )}
        <Field label="Email" icon={<I.IMail size={22} color="#7a7a7a" />}
          value={email} onChange={setEmail} placeholder="you@email.com" type="email" />
        <Field label={mode === 'signup' ? 'Password (min. 8 chars)' : 'Password'}
          icon={<I.ILock size={22} color="#7a7a7a" />}
          value={pw} onChange={setPw} placeholder="••••••••" reveal />

        {mode === 'signin' && (
          <button onClick={forgot} className="gold"
            style={{ display: 'block', marginLeft: 'auto', marginBottom: 22, fontSize: 14, fontWeight: 600 }}>
            Forgot password?
          </button>
        )}
        {err && <p className="err">{err}</p>}

        <button className="btn" onClick={submit}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>

        {mode === 'signup' ? (
          <>
            <p className="tiny" style={{ textAlign: 'center', marginTop: 14 }}>
              By signing up you agree to our <b className="gold">Terms</b> and <b className="gold">Privacy Policy</b>.
            </p>
            <button onClick={() => { setMode('signin'); setErr(''); }}
              style={{ display: 'block', margin: '34px auto 0', fontWeight: 700 }}>
              Already have an account? <span className="gold">Sign in</span>
            </button>
          </>
        ) : (
          <>
            <div className="divider">OR</div>
            <button className="btn ghost" onClick={() => { setMode('signup'); setErr(''); }}>
              Create new account
            </button>
          </>
        )}
        <div style={{ height: 50 }} />
      </div>
    </div>
  );
}
