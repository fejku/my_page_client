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
    const data: ILoginResponse = response.data;
    if (data.status && data.status.localeCompare("error") === 0) {
      return { isAuthenticated: false };
    } else {
      localStorage.setItem("user", JSON.stringify(data));

      return data;
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
    const data = response.data;
    if (data.status && data.status.localeCompare("error") === 0) {
      return {
        isAuthenticated: false,
        user: {
          username: "",
          role: "",
        },
      };
    } else {
      return response.data;
    }
  };
}

export default AuthService;
