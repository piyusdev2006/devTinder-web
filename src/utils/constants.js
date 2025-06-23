
// make the  BASE_URL dynamic based on the environment developement or production

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";

