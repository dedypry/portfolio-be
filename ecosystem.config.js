module.exports = {
  apps: [
    {
      name: 'portfolio-be',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
