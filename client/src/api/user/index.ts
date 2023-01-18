import { api } from "../../axios";

export const loginUser = (email: string, password: string) =>
  api({
    url: "/user/login",
    method: "post",
    data: { email, password },
  });
