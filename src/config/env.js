import { config } from "dotenv";
config();
const PREFIX = "EXPRESS_APP_";
const express_app_variables = getExpressAppEnvVariables(process.env);
const environmentVariables = getEnvironmentVariables(express_app_variables);

function getExpressAppEnvVariables(env) {
  const expressAppEnvVariables = {};

  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith(PREFIX)) {
      const newKey = key.replace(PREFIX, "");
      expressAppEnvVariables[newKey] = value;
    }
  }

  return expressAppEnvVariables;
}

function getEnvironmentVariables(environment_variables) {
  const environmentMode = environment_variables.ENVIRONMENT_MODE;
  const prefix = `${environmentMode.toUpperCase()}_`;
  const environmentVariables = {};

  Object.keys(environment_variables).forEach((key) => {
    if (key.startsWith(prefix)) {
      const strippedKey = key.slice(prefix.length);
      environmentVariables[strippedKey] = environment_variables[key];
    }
  });

  return environmentVariables;
}

export default {
  ...environmentVariables,
};
