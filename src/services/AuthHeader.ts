class AuthHeader {
  public static getAuthHeader = () => {
    let result = {};

    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const user = JSON.parse(userStorage);

      if (user && user.accessToken) {
        // for Node.js Express back-end
        result = { "x-access-token": user.accessToken };
      }
    }

    return result;
  };
}

export default AuthHeader;
