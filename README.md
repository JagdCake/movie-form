## Movie form for [I watched a Movie!](https://github.com/jagdcake/i-watched-a-movie)

A form to add, update, and delete movies from my movie database (used to
display movies on https://movies.jagdcake.com).

- meant solely for local use
- uses [Formik](https://jaredpalmer.com/formik/) to build the form
    - currently displays only an add form
- uses [PostGraphile](https://www.graphile.org/postgraphile/) to create
  a GraphQL API server pointing at a PostgreSQL database
- uses [Apollo Client](https://www.apollographql.com/docs/react/) to
  update and query the database

### First Time Setup

1. Database
    - make sure you have PostgreSQL (version 10+) installed and running
    - download database dump from a
      [release](https://github.com/jagdcake/i-watched-a-movie/releases)
    - create a database for the movies `psql -d [DATABASE USER] -c "create database [DATABASE NAME]"`
    - extract the database dump `tar -xavf database_dump.movies.tar.xz`
    - import the database dump `psql -U [DATABASE USER] -d [DATABASE NAME] < movies_dump`
    - update the `start-gql-server` script in `package.json`
        - change this string `npx postgraphile -c
          postgres://postgres:@localhost/[DATABASE NAME] --watch -o`

1. Install dependencies
    - `npm install` / `yarn install`

1. Start the GraphQL server
    - `npm run start-gql-server` / `yarn run start-gql-server`

1. Start the development server
    - `npm run start` / `yarn run start`
