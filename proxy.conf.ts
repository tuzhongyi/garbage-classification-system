const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/api/howell/ver10/device_service',
      '/video/',
      '/amap/',
      '/help/',
    ],
    // target: 'http://iebs.51hws.cn',
    // target: 'http://192.168.21.241:9000',

    // target: 'http://101.91.121.126',
    // target: 'http://192.168.21.122:8080',
    target: 'http://garbage01.51hws.com',
    changeOrigin: true,

    secure: false,
    headers: {
      Connection: 'keep-alive',
    },
  },
  // {
  //   context: ['/amap/'],
  //   // target: 'http://192.168.21.241:9000',
  //   // target: 'http://garbage01.51hws.com',
  //   target: 'http://127.0.0.1:8011',
  //   changeOrigin: true,
  //   secure: false,
  // },
];

module.exports = PROXY_CONFIG;
