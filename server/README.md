# How to setup Node.js project with Typescript

### Step 1
Create a new project folder (for example, `node_with_typescript`) and open the folder with any text editor you want (I prefer `VS Code`).

### Step 2
Open a **terminal** in **VS Code** and run the command

```
npm init
```
### Step 3
Next, run the following installation to proceed with a typescript

```
npm i -g typescript

npm i -D typescript ts-node nodemon

npm i express --save
```
**Note: Initially, nodemon is not mandatory. However, it is good to have.**

### Step 4
If typescript is globally installed as mentioned in Step 3, then run the command
```
tsc --init
```
If typescript is installed locally in the project, then run the command
```
npx tsc --init
```

### Step 5
Create a folder named as `src` in the root directory. This folder contain all the files and folders related to the project. 
Next, open a `package.json` file and under `script` property add the following key-value pair
```
"scripts": {
    "dev": "nodemon ./src/app.ts",
    "start": "node ./dist/app.js"
}
```

### Step 6
Later, install the further dev-dependencies by running the following command in the terminal
```
npm i -D @types/express @types/node
```

### Step 7
Open `tsconfig.json` file, copy the following configuration and paste it into your file.

```
{
  "compilerOptions": {
    "target": "ES6",                              
    "module": "commonjs",                         
    "rootDir": "./src",                           
    "moduleResolution": "node",                   
    "outDir": "./dist",                           
    "esModuleInterop": true,                      
    "forceConsistentCasingInFileNames": true,     
    "strict": true,                               
    "skipLibCheck": true                          
  },
  "include": ["./src/**/*"]
}
```

### Step 8
Create a file with the name `app.ts` inside the **src** folder and add the following line of code.
```
import express from 'express';

const app = express();

app.get('/', (req, res) => { 
    res.send('listening');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})
```

### Step 9
Run the project with the command, 
```
npm run dev
```
See the message in the console of the terminal and/or open a browser and hit the URL `http://localhost:3000/`

**You are ready to go with typescript setup for the Node.js project. ENJOY!!!**
