# Nhost NextJS Example App

A simple, yet powerful, NextJS to show how [Nhost](https://nhost.io) and [NextJS](https://nextjs.org) can work together.

## Features

- Select public data (ads) using `getStaticProps`.
- Authentication
  - Protect Dashboard route
- Select, Insert, Update and Delete data as a logged in user
  - With correct permissions

## Get started

Basically, create a Nhost project, edit two config files, apply Hasura migrations/metadata to your Nhost project and you are good to go!

1. Create a new [Nhost project](https://console.nhost.io).
2. `git clone git@github.com:nhost/nhost-nextjs-example-app.git` to clone this repo.
3. Update `lib/config.js` with **Backend** and **GraphQL** endpoints from your Nhost Project.
4. Update `hasura/config.yaml` with **GraphQL endpoint** and **Admin Secret** from your Nhost project.
5. Make sure you have the [Hasura CLI](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/install-hasura-cli.html) installed.
6. `cd hasura`, `hasura migrate apply`, `hasura metadata apply` to apply Hasura migrations and metadata.
7. `yarn install` to install dependencies.
8. `yarn dev` to start NextJS.
