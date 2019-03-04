import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import recipesQuery from './recipesQuery';
import gql from 'graphql-tag';

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

export default () => {
  const [vegetarian, setVegetarian] = useState(false);

  return (
    <>
      <label>
        Vegetarian?
        <input
          type="checkbox"
          checked={vegetarian}
          onChange={e => setVegetarian(e.target.checked)}
        />
      </label>
      <Query query={recipesQuery} variables={{ vegetarian }} pollInterval={3000}>
        {({ data, loading, error, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;

          return (
            <>
              <button type="button" onClick={() => refetch()}>Refresh</button>
              <ul>
                {data.recipes.map(({ id, title, isStarred }) => (
                  <li key={id}>
                    {title}
                    <Mutation
                      mutation={updateRecipeStarredMutation}
                      refetchQueries={[
                        {
                          query: recipesQuery,
                          variables: { vegetarian: false }
                        },
                        {
                          query: recipesQuery,
                          variables: { vegetarian: true }
                        }
                      ]}
                      awaitRefetchQueries
                    >
                      {(updateRecipeStarred, { loading }) => (
                        <button onClick={() => updateRecipeStarred({
                          variables: {
                            id, isStarred: !isStarred
                          }
                        })}>
                          {isStarred && '⭐️'}
                          {loading && 'Loading...'}
                        </button>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
            </>
          );
        }}
      </Query>
    </>
  );
};
