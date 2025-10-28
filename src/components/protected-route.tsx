"use client"
import { useEffect, useState} from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: number; // Añade un prop para el rol requerido
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const authContext = useAuth();
  const userState = authContext?.userState;
  const setUserState = authContext?.setUserState;
  // const userRole = authContext?.userRole;
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        const user = JSON.parse(userCookie);
        setUserState(user);
        if (requiredRole && user.role_id !== requiredRole) {
          router.replace('/dashboard/register-achievements'); // Redirige si el rol no coincide
        }
      } else {
        router.replace('/denied');
      }
    };

    checkAuth();
  }, [router, setUserState]);


  if (!userState) {
    return null; // O un spinner de carga
  }

  return <>{children}</>;
};

export default ProtectedRoute;