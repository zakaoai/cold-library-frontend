#### Stage 1: Build the react application
FROM node:lts-alpine as build

RUN npm install -g npm@latest
RUN corepack enable | corepack prepare yarn@stable --activate

# Configure the main working directory inside the docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
COPY package.json yarn.lock ./
RUN yarn install

# Copy the main application
COPY . ./

# Build the application
RUN yarn run build

#### Stage 2: Serve the React application from Nginx
FROM nginx:alpine-slim

# Copy the react build from Stage 1
COPY --from=build /app/dist /var/www

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/templates/nginx.conf.template

# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["nginx","-g","daemon off;"]
