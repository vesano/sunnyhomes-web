FROM keymetrics/pm2:10-alpine

WORKDIR /var/www

ENV NODE_ENV=development

CMD ["pm2-runtime", "start", "ecosystem.config.js"]