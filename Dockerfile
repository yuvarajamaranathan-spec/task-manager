# Step 1: Use official Node.js image as the base
# Think of this like choosing your base OS on mainframe
FROM node:20-alpine

# Step 2: Set the working directory inside the container
# Like setting your default directory in a job
WORKDIR /app

# Step 3: Copy package.json first (for efficient builds)
# Like copying your JCL before the source
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the rest of your app code
COPY . .

# Step 6: Tell Docker your app runs on port 3000
EXPOSE 3000

# Step 7: Command to start the app
# Like the EXEC statement in JCL
CMD ["node", "app.js"]