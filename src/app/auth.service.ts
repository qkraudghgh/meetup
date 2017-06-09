export class AuthService {
  loggenIn = false;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggenIn);
        }, 800);
      }
    );
    return promise;
  }

  login() {
    this.loggenIn = true;
    location.href = '/';
  }
  logout() {
    this.loggenIn = false;
    localStorage.clear();
    location.reload();
  }
}
