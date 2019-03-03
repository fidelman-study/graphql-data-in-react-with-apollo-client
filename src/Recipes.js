import React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const recipesQuery = gql`
  {
    recipes {
      id
      title
    }
  }
`

export default () => (
  <Query
    query={recipesQuery}
  >
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <ul>
          {data.recipes.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);
