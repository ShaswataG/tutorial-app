import { jwtDecode } from 'jwt-decode';

export function isLoggedIn() {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('jwt_token');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
}