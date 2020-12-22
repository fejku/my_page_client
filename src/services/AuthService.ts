import { BASE_URL } from "../config/config";
import ILoginResponse from "../interfaces/ILoginResponse";
import ILoginResult from "../interfaces/ILoginResult";
import ILoginUser from "../interfaces/ILoginUser";
import IRegisterResponse from "../interfaces/IRegisterResponse";
import IRegisterResult from "../interfaces/IRegisterResult";
import IRegisterUser from "../interfaces/IRegisterUser";

class AuthService {
  public static login = async (user: ILoginUser): Promise<ILoginResult> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status !== 401) {
      const data: ILoginResponse = await response.json();

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } else {
      return { isAuthenticated: false };
    }
  };

  public static register = async (user: IRegisterUser): Promise<IRegisterResult> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: IRegisterResponse = await response.json();

    if (response.status === 201) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  };

  public static logout = () => {
    localStorage.removeItem("user");
  };

  public static isAuthenticated = async () => {
    console.log(process.env);
    console.log(`${BASE_URL}/auth/authenticated`);

    const response = await fetch(`${BASE_URL}/auth/authenticated`);
    if (response.status !== 401) {
      const data = await response.json();
      return data;
    } else {
      return {
        isAuthenticated: false,
        user: {
          username: "",
          role: "",
        },
      };
    }
  };
}

export default AuthService;
