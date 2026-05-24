import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (res.ok) {
          setStatus('authorized');
        } else {
          setStatus('unauthorized');
        }
      } catch {
        setStatus('unauthorized');
      }
    };

    check();
  }, []);

  if (status === 'loading') {
    return (
      <div 
      // style={{
      //   minHeight: '60vh',
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   fontSize: '1.2rem',
      //   color: '#666'
      // }}
      className='section kobolttext'>
        loading
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}