interface ILoginResponse {
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
  };
}

export default ILoginResponse;
