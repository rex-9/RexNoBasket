interface IAuth {
  user: {
    username: string;
  };
}

interface IAuthState {
  auth: IAuth;
}

export default IAuthState;
