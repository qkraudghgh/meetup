import { config } from '../config.production';

export const environment = {
  production: true,
  slackClientId: config.slackClientId,
  googleApiKey: config.googleApiKey,
  apiRootUrl: config.apiRootUrl,
  webUrl: config.webUrl
};