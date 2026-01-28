import type { AxiosResponse } from "axios";
import { APIClient } from "./APIClient";

function setSession(
  _: unknown,
  __: string | symbol,
  propertyDescriptor: PropertyDescriptor,
) {
  const original = propertyDescriptor.value;

  propertyDescriptor.value = async function (
    this: AuthClient,
    ...args: string[]
  ) {
    const response: AxiosResponse = await original.apply(this, args);

    const token = response.headers["x-auth-token"];
    if (!token) {
      return;
      throw new Error("No token received from the server ...");
    }

    localStorage.setItem("token", token);
    return response;
  };

  return propertyDescriptor;
}

class AuthClient extends APIClient {
  constructor() {
    super("organizations/auth");
  }

  @setSession
  async login(email: string, password: string) {
    return await this.post({ email, password });
  }
}

const auth = new AuthClient();
export default auth;
