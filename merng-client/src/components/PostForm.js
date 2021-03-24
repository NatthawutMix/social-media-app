import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utill/hooks";
import { FETCH_POSTS_QUERY } from "../utill/graphql";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const PostForm = () => {
  const createPostCallback = () => {
    createPost();
  };
  const [error, setError] = useState();

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) {
      if (err.graphQLErrors.length !== 0)
        setError(err.graphQLErrors[0].message);
    },
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          <ul className="list">
            <li>{error}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
