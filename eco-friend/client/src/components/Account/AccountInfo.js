
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Container } from "react-bootstrap";
import { Card, Button } from "antd";
import { Space, Input, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import classes from "./UserProfile.module.css";

import { deleteUserThunk } from "../../store/user/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #f54242",
  },
};

const customPassStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function AccountInfo(props) {
  Modal.setAppElement("#root");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [passModalIsOpen, setPassModalIsOpen] = useState(false);
  const [passError, setPassError] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function deleteUserHandler() {
    navigate("/logout");
    dispatch(deleteUserThunk(props.user.id));
    setIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openPassModal() {
    setPassModalIsOpen(true);
  }

  async function changePasswordHandler(values) {
    setPassError(false);
    const response = await fetch("/auth/password", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await response.json();
    if (result) {
      closePassModal();
    } else setPassError(true);
  }

  async function closePassModal() {
    setPassError(false);
    setPassModalIsOpen(false);
  }

  return (
    <>
      <Card className={classes.box}>
        <Container>
          <h2>{props.user.name}</h2>

          <Button
            className={classes.btn}
            onClick={(e) => {
              e.preventDefault();
              openPassModal();
            }}
          >
            Change Password
          </Button>

          <Button
            className={classes.redbtn}
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            Delete Account
          </Button>
        </Container>
      </Card>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Account"
        style={customStyles}
      >
        <h2>
          Are you sure you want to delete your account? <br />
          This action is permanent and cannot be undone.
        </h2>
        <Button className={classes.redbtn} onClick={deleteUserHandler}>
          Yes
        </Button>
        <Button
          className={classes.bluebtn}
          onClick={closeModal}
          variant="danger"
        >
          Cancel
        </Button>
      </Modal>
      <Modal
        isOpen={passModalIsOpen}
        onRequestClose={closePassModal}
        contentLabel="Change Password"
        style={customPassStyles}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={changePasswordHandler}
        >
          <Space>
            <Form.Item
              name="prev"
              rules={[
                {
                  required: true,
                  message: "Old Password",
                },
              ]}
            >
              <Input.Password placeholder="previous password" value="prev" />
            </Form.Item>

            <Form.Item
              name="newpass"
              rules={[
                {
                  required: true,
                  message: "New Password",
                },
              ]}
            >
              <Input.Password
                placeholder="new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
          </Space>
        </Form>
        {passError ? <p className={classes.error}>Incorrect password</p> : null}
      </Modal>
    </>
  );
}

export default AccountInfo;
