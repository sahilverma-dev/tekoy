import { api } from "..";

export const getProfile = (userID: string) =>
  api({
    url: `/user/${userID}`,
  });
