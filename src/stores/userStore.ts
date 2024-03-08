import authService from "@/services/auth/authService";
import type {
  IFirebaseLoginInputDto,
  IFirebaseRegisterInputDto,
  UserDto,
} from "@/services/auth/dto";
import { action, makeObservable, observable } from "mobx";

class UserStore {
  @observable profile: UserDto | undefined;
  @observable message: string | undefined;
  @observable isLoggedIn: boolean = false;
  constructor() {
    makeObservable(this);
  }

  @action
  async login(input: IFirebaseLoginInputDto) {
    var response = await authService.login(input);
    console.log("response: ", JSON.stringify(response));

    if (response && response.success && response.accessToken) {
      this.profile = response.user;
      this.message = response.message;
      sessionStorage.setItem("accessToken", response.accessToken);
      this.isLoggedIn = true;
      window.location.href = "/home";
    }
    this.message = response.message;
  }

  @action
  async register(input: IFirebaseRegisterInputDto) {
    var response = await authService.register(input);
    this.message = response.message;
  }

  @action
  signOut() {
    sessionStorage.removeItem("accessToken");
    this.isLoggedIn = false;
  }
}

export default UserStore;
