import { useSelector, useDispatch } from "react-redux";
import React from "react";

import {
  deletePointThunk,
} from "../../store/map/actions";
import { deleteUserThunk } from "../../store/user/actions";

import { Modal } from "antd";

const DeleteUser = ({ setIsOpenDeleteUser, pointId, userId }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const adminId = user.id;
  console.log("adminId", adminId, 'userId', userId);

  return (
    <>
      <Modal
        title="Modal"
        visible={true}
        onOk={() => {
          setIsOpenDeleteUser(false);
          dispatch(deletePointThunk(pointId));
          dispatch(deleteUserThunk(adminId, userId));
        }}
        onCancel={() => {
          setIsOpenDeleteUser(false);
          dispatch(deletePointThunk(pointId));
        }}
        okText="yes"
        cancelText="no"
      >
        <p>Woud you like to ban user?</p>
      </Modal>
    </>
  );
};

export default DeleteUser;
