import React, { useState } from 'react'
import { Query } from 'react-apollo';
import recipesQuery from './recipesQuery'

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