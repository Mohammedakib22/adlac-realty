import nextVitals from "eslint-config-next/core-web-vitals";

const config = [{ ignores: ["node_modules/**", ".next/**", ".npm-cache/**"] }, ...nextVitals, { settings: { react: { version: "19.3.0" } } }];

export default config;
