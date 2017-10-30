This project was initialised with [Create React App](https://github.com/facebookincubator/create-react-app).

![](https://media.giphy.com/media/pAUg2l9WEV3QA/giphy.gif)

## API set-up
Navigate to the api folder under src ```src/api```, run the marvel api server with

``` npm start <private key> <public key> ```

if you don't have one yet, you can run it with mine

``` npm start 83d9d1f988be210b461a1e30bcc2c98bf20a45aa 413fa45d04692e57cb21bc878b5d82e7 ```


## Run the app
Navigate to the project folder, run

``` npm install ```

and then

``` npm start ```

## Testing

You can run tests by running

``` npm test ```

If you are unable to run the test cases, try clearing the npm cache 

``` rm -rf node_modules ```

``` npm i ```


## Future work
* Connect the app via production Marvel API, so that users don't have to set up a local host before running the app.
* Better sorting algorithm for search results (eg. base on popularity or year)
* Hosting the app on server.