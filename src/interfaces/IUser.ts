interface IUser {
  _id: string;
  username: string;
  password: string; 
  role: "user" | "admin";
}

export default IUser;