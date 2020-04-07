## Movie form for [I watched a Movie!](https://github.com/jagdcake/i-watched-a-movie)

A form to add, update, and delete movies from my movie database (used to
display movies on https://movies.jagdcake.com).

- meant solely for local use
- uses [Formik](https://jaredpalmer.com/formik/) to build the form
    - currently displays only an add form
- uses [PostGraphile](https://www.graphile.org/postgraphile/) to create
  a GraphQL API server pointing at a PostgreSQL database
- uses [Apollo Client](https://www.apollographql.com/docs/react/) to
  update the database
