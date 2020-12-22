interface ILoginResponse {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
  };
  accessToken: string;
}

export default ILoginResponse;
