const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // Uygulama detayları
  appName: 'Patile',

  // Kurulum ayarları: Dev, Debug, Release vb.
  DEV: devMode,

  // TODO: google analytics kodunu değişitr
  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-84284256-1',
};
