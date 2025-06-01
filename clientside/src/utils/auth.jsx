export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload, "payload");
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat as expired if decoding fails
  }
};
