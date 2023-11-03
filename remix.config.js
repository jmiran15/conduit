/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  postcss: true,
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  serverModuleFormat: "cjs",
};
