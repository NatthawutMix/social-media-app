import React, { useContext, useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";

import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router";
import { useForm } from "../utill/hooks";

const Register = () => {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const registerUser = () => addUser();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.login);
      history.push("/");
    },
    onError(err) {
      if (err.graphQLErrors.length !== 0)
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <div className="form-container">
      <h1>Register</h1>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="ConfirmPassword"
          placeholder="ConfirmPassword..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Resgister
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
