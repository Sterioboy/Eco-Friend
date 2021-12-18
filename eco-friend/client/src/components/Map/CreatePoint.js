import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popup } from "react-map-gl";
import { Image } from "cloudinary-react";

import { createMarkerThunk, uploadImgThunk } from "../../store/map/actions";

import classes from "./CreatePoint.module.css";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

const { Option, OptGroup } = Select;

const CreatePoint = ({ setNewMarker, newMarker }) => {
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.auth.user);
  const currentImg = useSelector((store) => store.map.currentImg);

  const [value, setValue] = useState({
    category: "",
    author: "",
    coordinates: ["", ""],
    adress: "",
    img: "",
    stars: [],
  });

  const onInputCategory = (value) => {
    console.log({ value });
    setValue((prev) => ({ ...prev, category: value }));
  };

  const createNewPoint = (event) => {
    event.preventDefault();

    let link, point;
    if (currentImg) {
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      point = {
        category: value.category,
        author: user.id,
        coordinates: [newMarker[0], newMarker[1]],
        adress: newMarker[3],
        img: link,
        stars: [],
        date: new Date(),
      };
    } else {
      point = {
        category: value.category,
        author: user.id,
        coordinates: [newMarker[0], newMarker[1]],
        adress: newMarker[3],
        img: "",
        stars: [],
        date: new Date(),
      };
    }
    dispatch(createMarkerThunk(point));
    setValue({
      category: "",
      author: "",
      coordinates: ["", ""],
      adress: "",
      img: "",
      stars:0,
    });
    setNewMarker(null);
  };
  return (
    <Popup
      className={classes.Popup}
      latitude={newMarker[1]}
      longitude={newMarker[0]}
      onClose={() => {
        setNewMarker(null);
      }}
    >
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
      <p className={classes.p_adress}>{newMarker[2]}</p>
      <form onSubmit={createNewPoint}>
        <div className={classes.upload_img}>
          <label for="upload_img" className={classes.custom_file_upload}>
            Add a picture
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
        <Select
          showSearch
          name="category"
          style={{ width: 200 }}
          placeholder="Select category"
          optionFilterProp="children"
          onChange={onInputCategory}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <OptGroup label="Recycling">
            <Option value="paper">paper</Option>
            <Option value="plastic">plastic</Option>
            <Option value="metal">metal</Option>
            <Option value="glass">glass</Option>
          </OptGroup>
          <OptGroup label="Disposal">
            <Option value="batteries">batteries</Option>
            <Option value="appliances">appliances</Option>
            <Option value="electronics">electronics</Option>
          </OptGroup>
        </Select>
        <div className={classes.btns}>
          <Button variant="primary" htmlType="submit">
            <CheckOutlined style={{ color: "green" }} />
          </Button>
        </div>
      </form>
    </Popup>
  );
};
export default CreatePoint;
