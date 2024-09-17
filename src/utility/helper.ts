export const isUserLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  if (token) return true;
  return false;
};
