module.exports = {
  apps : [{
    name: 'project-name',
    script: './.build/main.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 8081
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    }
  }]
};
