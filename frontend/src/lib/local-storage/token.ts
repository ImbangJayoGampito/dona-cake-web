export class TokenStorage {
  static getToken() {
    return localStorage.getItem("auth-token")
  }

  static setToken(token: string) {
    localStorage.setItem("auth-token", token)
  }

  static removeToken() {
    localStorage.removeItem("auth-token")
  }
}
