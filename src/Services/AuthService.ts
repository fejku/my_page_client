import IUser from "../interfaces/IUser";

class AuthService {
  public static login = async (user: IUser) => {
    const response = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 401) {
      const data = await response.json();
      return data;
    } else {
      return { 
        isAuthenticated: false, 
        user: { 
          username: "", 
          role: "" 
        } 
      };
    }
  };

  public static register = async (user: any) => {
    const response = await fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  } 
  
  public static logout = async () => {
    const response = await fetch("/auth/logout");
    const data = await response.json();
    return data;
  }

  public static isAuthenticated = async () => {
    const response = await fetch("/auth/authenticated");
    if (response.status !== 401) {
      const data = await response.json();
      return data;
    } else {
      return { 
        isAuthenticated: false, 
        user: { 
          username: "", 
          role: "" 
        } 
      };
    }
  }
}

export default AuthService;