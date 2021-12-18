import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";

import { editEntryThunk, uploadImgThunk } from "../../store/entry/actions";

import classes from "./EditEntry.module.css";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Select  } from "antd";

const { Option } = Select;

const EditEntry = ({ entry, setIsOpenEditEntryForm }) => {
  const dispatch = useDispatch();
  const currentImg = useSelector((store) => store.entry.currentImg);
  const user = useSelector((store) => store.auth.user);

  const [value, setValue] = useState({ text: "", category: "", file: "" });

  const onInputText = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, text: value }));
  };

  const onInputCategory = (value) => {
    setValue((prev) => ({ ...prev, category: value }));
  };

  const updateEntry = (event) => {
    event.preventDefault();
    let link;
    if (currentImg) {
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      dispatch(editEntryThunk(value, link, entry._id));
      setValue({ text: "", category: "", file: "" });
    } else {
      dispatch(editEntryThunk(value, entry.img, entry._id));
    }
    setIsOpenEditEntryForm({ id: "" });
  };

  return (
    <div className={classes.EditEntry}>
      <div>
        <div>
          {user && (
            <div className={classes.edit_block}>
              {!currentImg && (
                <img
                  src={entry.img}
                  style={{ width: "auto", height: "200px" }}
                  alt=""
                />
              )}
              {currentImg && (
                <>
                  <Image
                    style={{ width: "auto", height: "200px" }}
                    cloudName="dwvm712y7"
                    publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`}
                  />
                </>
              )}
              <form onSubmit={updateEntry} className={classes.form}>
                <div>
                  <label
                    htmlFor="upload_img2"
                    className={classes.custom_file_upload}
                  >
                    Choose a picture
                    <input
                      id="upload_img2"
                      style={{ display: "none" }}
                      type="file"
                      name="file"
                      onChange={(e) => {
                        dispatch(uploadImgThunk(e.target.files[0]));
                      }}
                    />
                  </label>
                </div>
                <Input
                  as="textarea"
                  type="text"
                  name="text"
                  placeholder="text here"
                  style={{ height: "100px" }}
                  defaultValue={entry.text}
                  onChange={onInputText}
                />
                <Select
                  showSearch
                  className={classes.selector}
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
                  <Button onClick={() => setIsOpenEditEntryForm({ id: "" })}>
                    <CloseOutlined style={{ color: "red" }} />
                  </Button>
                  <Button variant="primary" htmlType="submit">
                    <CheckOutlined style={{ color: "green" }} />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEntry;
