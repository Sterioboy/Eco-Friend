import { Card, Button } from "antd";
import { Image } from "cloudinary-react";

import {
  changeUserProfilePicThunk,
  uploadUserImgThunk,
  clearCurrentImg,
} from "../../store/user/actions";

import { useDispatch, useSelector } from "react-redux"

import classes from "./UserProfile.module.css";

function AccountImage(props) {
  const dispatch = useDispatch();
  const currentImg = useSelector((store) => store.auth.currentImg);
  const img = useSelector((store) => store.auth.user.img);
  const rating = useSelector((store) => store.auth.user.rating);

  const saveProfilePic = () => {
    let link;
    if (currentImg) {
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      dispatch(changeUserProfilePicThunk(props.user.id, link));
      dispatch(clearCurrentImg());
    }
  };
  return (
    <Card
      cover={
        <label
          htmlFor="upload_profile_img"
          className={classes.custom_file_upload}
        >
          {!currentImg && img && (
            <div className={classes.container}>
              <Image
                className={classes.imgs}
                src={img}
              />
              <div className={classes.middle}>
                <div className={classes.text}>Change Photo</div>
              </div>
            </div>
          )}
          {!currentImg && !img && (
            <div className={classes.container}>
              <Image
                className={classes.imgs}
                src="img/rest/green_planet.jpeg"
                fallback="img/rest/green_planet.jpeg"
              />
              <div className={classes.middle}>
                <div className={classes.text}>Change Photo</div>
              </div>
            </div>
          )}
          {currentImg && (
            <>
              <Image
                className={classes.imgs}
                cloudName="dwvm712y7"
                publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`}
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  saveProfilePic();
                }}
              >
                Save
              </Button>
            </>
          )}
          <input
            id="upload_profile_img"
            style={{ display: "none" }}
            type="file"
            name="file"
            onChange={(e) => {
              dispatch(uploadUserImgThunk(e.target.files[0]));
            }}
          />
        </label>
      }
    >
      <h1>{props.user.name}</h1>
      <p>Reputation: {rating}</p>
    </Card>
  );
}

export default AccountImage;
