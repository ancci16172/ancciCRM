

export const BACKEND_URL = process.env.NODE_ENV == "production" ? "https://www.blancogusmar.com:5000" : "https://localhost:5000";
console.log(BACKEND_URL);
// export const BACKEND_URL = "https://localhost:5000"
// export const BACKEND_URL = "https://www.blancogusmar.com:5000"
