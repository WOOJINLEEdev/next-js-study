export function getEnv(key: string) {
  const nodeEnv = process.env[key];

  return nodeEnv;
}
