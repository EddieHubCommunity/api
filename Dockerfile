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
ENV VERSION="v0.0.0"

# RUN --mount=type=secret,id=github_token \
#   cat /run/secrets/github_token
RUN echo "//npm.pkg.github.com/:_authToken=${secrets.GITHUB_TOKEN}" > ~/.npmrc

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc .npmrc

RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > ~/.npmrc

RUN npm install --production --ignore-scripts

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
