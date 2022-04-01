const userStorage: { [index: string]: string } = {};

export const loginApi = (userId: string, userPassword: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      userStorage[userId] = userPassword;
      resolve({
        data: "token",
      });
    }, 1200);
  });
};

export const logoutApi = (userId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      delete userStorage[userId];
      resolve(null);
    }, 1200);
  });
};

export const refreshAccessTokenApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: "token",
      });
    }, 1200);
  });
};

export default {
  login: loginApi,
  logout: logoutApi,
  refreshAccessToken: refreshAccessTokenApi,
};
