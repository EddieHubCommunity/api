FROM node:15 as development
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/api
ARG github_token
ENV GH_TOKEN=${github_token}

WORKDIR /usr/src/app


COPY package*.json ./
COPY .npmrc .npmrc

RUN npm install --ignore-scripts
RUN rm -f .npmrc

COPY . .

RUN npm run build

FROM node:15 as production
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/api
ARG github_token
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV GH_TOKEN=${github_token}

WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc .npmrc

RUN npm install --production --ignore-scripts

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]

