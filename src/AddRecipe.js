import React, { useState } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import recipesQuery from './recipesQuery'

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`

export default () => {
  const [title, setTitle] = useState('')
  const [vegetarian, setVegetarian] = useState(false)

  const resetFields = () => {
    setTitle('')
    setVegetarian(false)
  }

  const updateTitle = ({ target }) => {
    setTitle(target.value)
  }

  const updateVegetarian = ({ target }) => {
    setVegetarian(target.checked)
  }

  return (
    <Mutation
      mutation={addRecipeMutation}
      refetchQueries={[
        {
          query: recipesQuery,
          variables: { vegetarian: true }
        },
        {
          query: recipesQuery,
          variables: { vegetarian: false }
        }
      ]}
      awaitRefetchQueries
    >
      {(addRecipe, { loading, error }) => (
        <form
          onSubmit={evt => {
            evt.preventDefault();
            addRecipe({
              variables: {
                recipe: {
                  title,
                  vegetarian,
                }
              }
            })
            resetFields();
          }}
        >
          <label>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={updateTitle}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={vegetarian}
              onChange={updateVegetarian}
            />
            <span>vegetarian</span>
          </label>
          <div>
            <button>Add Recipe</button>
            {loading && <p>loading...</p>}
            {error && <p>error</p>}
          </div>
        </form>
      )}
    </Mutation>
  );
};
