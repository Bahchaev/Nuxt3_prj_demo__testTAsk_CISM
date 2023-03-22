FROM node:16.10.0-alpine
ENV APP_ROOT /

ENV BASE_URL="https://cism-test-app.herokuapp.com"

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install
RUN npm run build

CMD ["npm", "run", "dev"]
