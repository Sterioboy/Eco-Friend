import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signinThunk } from "../../store/user/actions";
import { Input, Button } from "antd";
import "./Auth.css";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({ email: "", password: "" });

  const onInputPassword = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, password: value }));
  };
  const onInputEmail = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, email: value }));
  };

  const loginFunction = (event) => {
    event.preventDefault();
    dispatch(signinThunk(value));
    navigate("/");
  };

  return (
    <div>
      <form
        className="login-form"
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onSubmit={loginFunction}
      >
        <h1>Signin</h1>
        <Input
          className="login-input"
          type="email"
          name="email"
          placeholder="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
          onChange={onInputEmail}
        />
        <Input
          className="login-input"
          name="password"
          type="password"
          placeholder="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          onChange={onInputPassword}
        />
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or
        <Link to="/signup"> register now!</Link>
      </form>
    </div>
  );
};

export default Signin;
