import React, { useState } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!){
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`

export default () => {
  const [vegetarian, setVegetarian] = useState(false)

  return (
    <>
      <label>
        Vegetarian?
        <input type="checkbox" checked={vegetarian} onChange={e => setVegetarian(e.target.checked)}/>
      </label>
      <Query
        query={recipesQuery}
        variables={{ vegetarian }}
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
    </>
  );
}