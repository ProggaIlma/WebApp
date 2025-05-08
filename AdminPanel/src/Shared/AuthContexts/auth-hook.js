import { useState, useCallback, useEffect } from "react";
let logOutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((token, user, expirationDate) => {
    setToken(token);
    setUser(user);
    const tokenExpirationDateO = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDateO);

    localStorage.setItem("userData",
      JSON.stringify({ token: token, expiration: tokenExpirationDateO, user: user, })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    clearTimeout(logOutTimer);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = new Date(tokenExpirationDate) - new Date();
      logOutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, storedData.user, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, user, setUser, login, logout, };
};
