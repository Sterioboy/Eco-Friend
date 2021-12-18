import { useDispatch } from "react-redux";
import React, { useState } from "react";

import { Table, Button } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import classes from "./DrawerBody.module.css";

import { confirmPointDataThunk } from "../../store/map/actions";
import DeleteUser from "./DeleteUser";

const DrawerBody = ({ mapData }) => {
  const dispatch = useDispatch();
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [isSubmitBtn, setIsSubmitBtn] = useState({});

  const columns = [
    {
      title: "Confirm",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        setCurrentUserId(id);
        return (
          <>
            <div className={classes.btns}>
              {!isSubmitBtn[id] && (
                <Button
                  variant="primary"
                  onClick={() => {
                    dispatch(confirmPointDataThunk(id));
                    setIsSubmitBtn({ ...isSubmitBtn, [id]: "open" });
                  }}
                >
                  <CheckOutlined style={{ color: "green" }} />
                </Button>
              )}
              <Button
                onClick={() => {
                  setIsOpenDeleteUser(true);
                }}
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Button>
            </div>
            {isOpenDeleteUser && (
              <DeleteUser
                setIsOpenDeleteUser={setIsOpenDeleteUser}
                pointId={id}
                userId={currentUserId}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Picture",
      dataIndex: "img",
      key: "img",
      render: (picture) => {
        if (picture)
          return <img src={picture} alt="" style={{ width: "60px" }} />;

        if (!picture) return <p>no attached photo</p>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Address",
      dataIndex: "adress",
      key: "adress",
      render: (adress) => <p>{adress}</p>,
    },

    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => {
        setCurrentUserId(author?._id);

        return (
          <div className={classes.author}>
            <p>{author?.name}</p>
          </div>
        );
      },
    },
  ];
  const unconfirmedPoints = mapData.filter((point) => !point.confirmed);
  return <Table columns={columns} dataSource={unconfirmedPoints}  pagination={false}/>;
};
export default DrawerBody;
