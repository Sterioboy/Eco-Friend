import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

import { Form, CloseButton } from "react-bootstrap";
import { PlusOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import classes from "./CreateEntry.module.css";

import { createEntryThunk, uploadImgThunk } from "../../store/entry/actions";

const { Option } = Select;

const CreateEntry = () => {
  const dispatch = useDispatch();
  const currentImg = useSelector((store) => store.entry.currentImg);
  const user = useSelector((store) => store.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({ text: "", category: "", file: "" });

  const onInputText = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, text: value }));
  };

  const onInputCategory = (value) => {
    setValue((prev) => ({ ...prev, category: value }));
  };
  const changeState = () => {
    setIsOpen(!isOpen);
  };
  const createNewPost = (event) => {
    event.preventDefault();
    let link;
    if (currentImg) {
      console.log(currentImg)
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      dispatch(createEntryThunk(value, link));
      setValue({ text: "", category: "", file: "" });
    }
  };

  return (
    <div className={classes.CreateEntry}>
      <div>
        {!isOpen && (
          <div className="d-grid gap-2">
            <Button block variant="secondary" size="lg" onClick={changeState}>
              Create new post
              <PlusOutlined />
            </Button>
          </div>
        )}
        <div>
          {isOpen && user && (
            <div className={classes.block}>
              {!currentImg && (
                <Image
                  className={classes.imgs}
                  width={200}
                  src="https://storage.googleapis.com/proudcity/elgl/uploads/2018/04/Environmental-11.gif"
                  fallback="public/img/empty/default_photo.png"
                />
              )}
              {currentImg && (
                <Image
                  className={classes.imgs}
                  width={200}
                  cloudName="dwvm712y7"
                  publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`}
                />
              )}
              <form onSubmit={createNewPost}>
                <div>
                  <label
                    htmlFor="upload_img"
                    className={classes.custom_file_upload}
                  >
                    Choose a picture
                    <input
                      id="upload_img"
                      style={{ display: "none" }}
                      type="file"
                      name="file"
                      onChange={(e) => {
                        dispatch(uploadImgThunk(e.target.files[0]));
                      }}
                    />
                  </label>
                </div>
                <Form.Control
                  className={classes.textArea}
                  as="textarea"
                  type="text"
                  name="text"
                  placeholder="text here"
                  style={{ height: "100px" }}
                  value={value?.text}
                  onChange={onInputText}
                />
                <Select
                  showSearch
                  name="category"
                  style={{ width: 200 }}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={onInputCategory}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="eco-news">eco-news</Option>
                  <Option value="sorting">sorting</Option>
                  <Option value="events">events</Option>
                </Select>
                <div className={classes.btns}>
                  <Button
                    onClick={() => {
                      setValue({ text: "", category: "" });
                      setIsOpen(false);
                    }}
                  >
                    <CloseOutlined style={{ color: "red" }} />
                  </Button>
                  <Button
                    variant="primary"
                    htmlType="submit"
                  >
                    <CheckOutlined style={{ color: "green" }} />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div>
          {isOpen && !user && (
            <div className={classes.entryAccess}>
              <CloseButton onClick={changeState} />
              <h5 className={classes.access}>
                You don't have access. Please <Link to="/signin">login</Link>
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEntry;
