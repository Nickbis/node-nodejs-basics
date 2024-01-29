import process from "node:process";

const parseEnv = () => {
    // Write your code here 
    const envs = process.env;
    const foundEnvs = [];
    Reflect.ownKeys(envs)
      .filter((key) => key.startsWith("RSS_"))
      .forEach((key) => {
        foundEnvs.push(`${key}=${envs[key]}`);
      });
    console.log(foundEnvs.join("; "));
};

parseEnv();