interface ILoginResponse {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
  };
  accessToken: string;
  status?: string;
}

export default ILoginResponse;
