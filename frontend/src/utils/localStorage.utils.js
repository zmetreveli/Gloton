import { jwtDecode } from "jwt-decode";

export const getStorageObject = (key) => {
  if (key === "token") {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token);
    }
  } else {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
  }
  return null;
};

export const setStorageObject = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject("user-session");
  if (session) {
    return session.token;
  }
  return null;
};

export const getUserSession = () => {
  const session = getStorageObject("user");
  if (session) {
    return session;
  }
  return null;
};

export const setUserSession = (sessionData) => {
  setStorageObject("user-session", JSON.stringify(sessionData));
};

export const removeSession = () => {
  deleteStorageObject("user-session");
};

export const isSessionActive = () => {
  const token = getUserToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      removeSession();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};


export const getRestaurantData = (key) => {
  if (key === "token") {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token);
    }
  } else {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
  }
  return null;
};

export const getRestaurantToken = () => {
  const session = getStorageObject("restaurant-session");
  return session?.token || null;
};

export const getRestaurantSession = () => {
  const session = getStorageObject("restaurant");
  return session || null;
};

export const setRestaurantSession = (sessionData) => {
  setStorageObject("restaurant-session", sessionData);
};

export const removeRestaurantSession = () => {
  deleteStorageObject("restaurant-session");
};

export const isRestaurantSessionActive = () => {
  const token = getRestaurantToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      removeRestaurantSession();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
