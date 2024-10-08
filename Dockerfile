# Step 1: Specify the base image (node.js)
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app's code to the container
COPY . .

# Step 6: Build the app (useful for production)
RUN npm run build

# Step 7: Expose the port your app runs on
EXPOSE 5173

# Step 8: Command to run the app
CMD ["npm", "start"]
