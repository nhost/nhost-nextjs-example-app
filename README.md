![Next.js Logo](https://github.com/nhost/nhost-nextjs-example-app/blob/master/public/nextjs.svg)
# Next.js Example
This repo is a small example of a [Next.js](https://nextjs.org/) app with Nhost as the backend.
## How was this example created
We used the default starter template from `create-next-app`  
```shell
$ npx create-next-app
```

Install and run development server
```shell
$ yarn install && yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) and you should see the app running. 

### How is this project structured 

`./lib/config.js` contains the endpoints for both Hasura GraphQL ond Hasura Backend Plus which, by default, point to a project running on Nhost. 
`./context/auth.js` contains the authorization logic. 

