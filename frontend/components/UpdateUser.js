import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

class UpdateUser extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateUser = async (e, updateUserMutation, id) => {
    e.preventDefault();
    const res = await updateUserMutation({
      variables: {
        id,
        ...this.state,
      },
    });
    console.log('updated');
  };

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.me)
            return <ErrorMessage>You are not signed in!</ErrorMessage>;
          return (
            <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
              {(updateUser, { loading, error }) => (
                <Form
                  onSubmit={e => this.updateUser(e, updateUser, data.me.id)}
                >
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="name">
                      Name
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        defaultValue={data.me.name}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="email">
                      Email
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={data.me.email}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">
                      Sav{loading ? 'ing' : 'e'} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateUser;
export { UPDATE_USER_MUTATION };
