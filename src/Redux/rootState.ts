import { AuthState, NewUser, User } from "./Authentication/authInitialStates";


export interface RootState {
    auth: AuthState & {
      newUser: NewUser[];
      user: User[];
      isLoggedIn: boolean;
    };
  }

export const rootInitialState: RootState = {
    auth: {
        newUser: [{
            "first_name": "Augustine",
            "last_name": "Opoku-Kesse",
            "email": "aokesse@gmail.com",
            "password": "firsttest",
            "confirm_password": "firsttest"
        }, {
            "first_name": "Kojo",
            "last_name": "Agyei",
            "email": "kojo@yahoo.com",
            "password": "kojo2",
            "confirm_password": "kojo2"
        }],
        user: [{
          "email": "aokesse@gmail.com",
            "password": "firsttest",

        }, {
          "email": "kojo@yahoo.com",
            "password": "kojo2",

        }],
        isLoggedIn: false,
      },
};
