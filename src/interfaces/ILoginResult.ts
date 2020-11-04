interface ILoginResult {
  isAuthenticated: boolean;
  user?: {
    username: string;
    role: string;
  };
}

export default ILoginResult;
