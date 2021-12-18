import { useSelector, useDispatch } from "react-redux";
import { Popup } from "react-map-gl";

import classes from "./SelectedPoint.module.css";
import { Card, Button, Progress, Tooltip } from "antd";

import {
  confirmPointDataThunk,
  addStarToMapPointThunk,
  changeStarPoint,
} from "../../store/map/actions";

const { Meta } = Card;

const SelectedPoint = ({ selectedMapPoint, setSelectedMapPoint }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);

  return (
    <Popup
      latitude={selectedMapPoint?.geometry.coordinates[1]}
      longitude={selectedMapPoint?.geometry.coordinates[0]}
      onClose={() => {
        setSelectedMapPoint(null);
      }}
    >
      <div className={classes.confirm_info}>
        {selectedMapPoint.properties.confirmed ? (
          <Progress type="circle" percent={100} width={50} />
        ) : (
          <Progress type="circle" percent={50} width={50} />
        )}
        {!selectedMapPoint.properties.confirmed &&
          (user?.role === 0 ? (
            <Button
              className={classes.confirmed_btn}
              type="primary"
              danger
              onClick={() => {
                dispatch(
                  confirmPointDataThunk(selectedMapPoint.properties.pointId)
                );
                setSelectedMapPoint({
                  ...selectedMapPoint,
                  properties: {
                    ...selectedMapPoint.properties,
                    confirmed: true,
                  },
                });
              }}
            >
              Сonfirm
            </Button>
          ) : (
            <Button className={classes.confirmed_btn} type="primary" danger>
              Awaiting confirmation
            </Button>
          ))}
      </div>
      <Card
        className={classes.card}
        hoverable
        style={{ width: 240 }}
        cover={
          selectedMapPoint?.properties.img ? (
            <img alt="" src={selectedMapPoint?.properties.img} />
          ) : (
            <img
              alt=""
              src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
            />
          )
        }
      >
        <Meta
          title={
            <div className={classes.title}>
              <p>{selectedMapPoint?.properties.category}</p>
              <p>
                Verified by:
                <br /> {selectedMapPoint?.properties.stars.length} people
              </p>
            </div>
          }
          description={selectedMapPoint?.properties.adress}
        />
        <Tooltip title="Thank the author">
          {user && (
            <img
              src="/img/rest/like.jpeg"
              alt=""
              style={{ width: "50px", opacity: "50%" }}
              onClick={() => {
                const userIdInStars = selectedMapPoint.properties?.stars?.find(
                  (star) => star === user.id
                );
                if (userIdInStars) {
                  setSelectedMapPoint({
                    ...selectedMapPoint,
                    properties: {
                      ...selectedMapPoint.properties,
                      stars: selectedMapPoint.properties.stars.filter(
                        (el) => el !== user.id
                      ),
                    },
                  });
                  dispatch(
                    changeStarPoint(
                      selectedMapPoint.properties.pointId,
                      user.id,
                      "-"
                    )
                  );
                } else {
                  setSelectedMapPoint({
                    ...selectedMapPoint,
                    properties: {
                      ...selectedMapPoint.properties,
                      stars: [...selectedMapPoint.properties.stars, user.id],
                    },
                  });
                  dispatch(
                    changeStarPoint(
                      selectedMapPoint.properties.pointId,
                      user.id,
                      "+"
                    )
                  );
                }
                dispatch(
                  addStarToMapPointThunk(selectedMapPoint.properties.pointId)
                );
              }}
            />
          )}
        </Tooltip>
      </Card>
    </Popup>
  );
};

export default SelectedPoint;
