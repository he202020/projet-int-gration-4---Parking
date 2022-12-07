# projet-integration-4-Parking

## Setting up dependencies
Install ngrok through the following link : https://ngrok.com/download
Once installed you can run the following command to launch the ngrok server : ```ngrok.exe https 8080```

Clone repo
Navigate to the folder where the repo is located through CLI
run ```npm install``` this will install all the dependencies linked to the code

to run the server locally use ``` npm start ```

### Errors
throw er; // Unhandled 'error' event

Fix : ```taskkill /im node.exe /F```
then : ``` npm start ```

If this still does not fix the issue, you can delete the `node_module` folder located at the root of the project and run `npm install` to reinstall dependencies
