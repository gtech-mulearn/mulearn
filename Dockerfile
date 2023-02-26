FROM node:16.15.1 as builder

# Working dir
WORKDIR /usr/src/app


# Install dependencies
COPY package.json .
RUN npm install

# Copy whole source code
COPY . .

# Build application
RUN npm run build


FROM nginx:1.23.3-alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf 

# Copy nginx custome configuration file
COPY ./nginx/default.conf  /etc/nginx/conf.d

# Expose port 80 to the host machine
EXPOSE 80

# Copy the  build files to the container
COPY --from=builder ./usr/src/app/dist/portal /usr/share/nginx/html