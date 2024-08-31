import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const [token, setToken] = useState("")
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        router.push('/');
      } else{
        setToken(token)
      }
    }, []);

    return token ? <WrappedComponent {...props} /> : ""
  };

  return AuthenticatedComponent;
};

export default withAuth;
