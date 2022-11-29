import pino from 'pino';

const logger = pino({
  level: 'debug',
  base: {
    env: 'ENV not set',
  },
});

const formatObjectKeys = (headers) => {
  const keyValues = {};

  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_');
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

export { logger, formatObjectKeys };