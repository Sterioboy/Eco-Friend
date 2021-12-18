import React, {  useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Space } from "antd";

import { closeWelcomeComponent } from "../../../store/auth/actions";

const WelcomeComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    info();
  }, []);

  function info() {
    Modal.info({
      title: "Welcome",
      content: (
        <div>
          <p>If you want to comment and add points to the map, please login!</p>
          <img
            src="https://i.pinimg.com/originals/f9/04/07/f90407a75a3ecff9d8a28b4789a6a54e.gif"
            alt=""
            style={{ width: "250px" }}
          />
        </div>
      ),
      onOk() {
        console.log("");
        dispatch(closeWelcomeComponent());
      },
    });
  }

  return (
    <Space wrap>
      <Button onClick={info}>Info</Button>
    </Space>
  );
};
export default WelcomeComponent;
