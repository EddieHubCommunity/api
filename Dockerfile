FROM node:15 As development
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/api

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV HUSKY=0
ENV VERSION="v0.0.0"

RUN --mount=type=secret,id=github_token \
  cat /run/secrets/github_token
RUN echo "//npm.pkg.github.com/:_authToken=$github_token" > ~/.npmrc

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
