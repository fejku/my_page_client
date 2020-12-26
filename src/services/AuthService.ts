import myAxios from "../components/Common/AxiosHelper";
import ILoginResponse from "../interfaces/ILoginResponse";
import ILoginResult from "../interfaces/ILoginResult";
import ILoginUser from "../interfaces/ILoginUser";
import IRegisterResponse from "../interfaces/IRegisterResponse";
import IRegisterResult from "../interfaces/IRegisterResult";
import IRegisterUser from "../interfaces/IRegisterUser";

class AuthService {
  public static login = async (user: ILoginUser): Promise<ILoginResult> => {
    const response = await myAxios.post(`/auth/login`, user);
    if (response.status !== 401) {
      const data: ILoginResponse = response.data;

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } else {
      return { isAuthenticated: false };
    }
  };

  public static register = async (user: IRegisterUser): Promise<IRegisterResult> => {
    const response = await myAxios.post(`/auth/register`, user);
    const data: IRegisterResponse = response.data;

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
    const response = await myAxios.get(`/auth/authenticated`);
    if (response.status !== 401) {
      return response.data;
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
