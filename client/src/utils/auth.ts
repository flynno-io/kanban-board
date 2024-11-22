import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    const decoded: JwtPayload = jwtDecode(token);
    return decoded;
  }

  loggedIn() {
    // return a bool indicating if the user is logged in or not
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // return a bool that indicates if the token is expired
    const decoded: JwtPayload = jwtDecode(token);
    if (decoded.exp) {
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    }
    return true;
  }

  getToken(): string {
    // return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem('id_token', idToken);

    // redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem('id_token');

    // redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
