export { default as swaggerConfig } from "./swagger.config.js";
import environmentVariables from "./env.js";

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const {
  DB_URI,
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_SECRET_ACCESS_PASSWORD,
} = environmentVariables;

export const awsS3SecretAccessKey = AWS_S3_SECRET_ACCESS_KEY;
export const awsS3SecretAccessPassword = AWS_S3_SECRET_ACCESS_PASSWORD;
export const port = PORT || 5000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = DB_URI;
export const awsAccessKey = AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
export const awsRegion = AWS_REGION;
export const bucketName = AWS_S3_BUCKET;
export const prefix = "/api";
export const specs = "/docs";

export const ENABLE_MONGODB_CONNECTION = true;

// STATUS CODES
export const CONFLICT_ERROR = 409;
export const FORBIDDEN_RESOURCE_ERROR = 401;
export const NOT_FOUND_ERROR = 404;
export const INPUT_ERROR = 400;
export const UNKNOWN_SERVER_ERROR = 500;
export const CREATED_SUCCESS = 201;
export const OK_SUCCESS = 200;

// TOKEN REFRESH
// ~~~ Change access token back to 1h
export const ACCESS_TOKEN_EXPIRATION = "4h";
export const REFRESH_TOKEN_EXPIRATION = "1y";

// MODELS
// export const COLLECTION_USER = "User";
// export const COLLECTION_WORKOUT = "Workout";
// export const COLLECTION_MEAL = "Meal";
// export const COLLECTION_TRAINING_PLAN = "Training-Plan";
// export const COLLECTION_EVENT = "Event";
// export const COLLECTION_GENERAL = "General";
