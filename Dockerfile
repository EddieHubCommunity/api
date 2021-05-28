FROM node:15 As building
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/api
ARG github_token  
WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${github_token}" > ~/.npmrc
RUN npm install --ignore-scripts
RUN rm -f .npmrc
COPY . .
RUN npm run build


FROM node:15 

WORKDIR /usr/src/app
COPY --from=building /usr/src/app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
