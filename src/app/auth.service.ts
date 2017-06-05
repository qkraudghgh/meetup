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
  }

  logout() {
    this.loggenIn = false;
    location.reload();
  }
}
