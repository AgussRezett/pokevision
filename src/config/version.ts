export const APP_VERSION = __APP_VERSION__;

export const getVersionInfo = () => {
  const [major, minor, patch] = APP_VERSION.split('.').map(Number);

  return {
    full: APP_VERSION,
    major,
    minor,
    patch,
    display: `v${APP_VERSION}`,
  };
};
