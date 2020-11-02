export default {
  login: (user: any) => {
    console.log("ASD")
    return fetch("/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 401) {
          return res.json().then((data) => data);
        } else {
          return { isAuthenticated: false, user: { username: "", role: "" } };
        }
      });
  },

  register: (user: any) => {
    return fetch("/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },

  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { isAuthenticated: false, user: { username: "", role: "" } };
      }
    });
  },
};
