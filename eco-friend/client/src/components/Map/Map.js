import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Geocoder from "react-map-gl-geocoder";
import ReactMapGl, {
  Marker,
  FlyToInterpolator,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";

import useSupercluster from "use-supercluster";

import classes from "./Map.module.css";
import { Drawer, Button } from "antd";

import DrawerBody from "./DrawerBody";
import CreatePoint from "./CreatePoint";
import SelectedPoint from "./SelectedPoint";

import { createMarkerThunk } from "../../store/map/actions";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const getRightCategoryIcon = (category) => {
  if (category === "plastic") return "/img/categories/bottle.png";
  if (category === "paper") return "/img/categories/paper.png";
  if (category === "metal") return "/img/categories/metal.png";
  if (category === "glass") return "/img/categories/glass.png";

  if (category === "electronics") return "/img/categories/electronics.png";
  if (category === "appliances") return "/img/categories/appliances.png";
  if (category === "batteries") return "/img/categories/batteries.png";

  if (!category) return "/img/categories/unknown.png";
};

const Map = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedMapPoint, setSelectedMapPoint] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 45.4211, 
    longitude: -75.6903, 
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  const mapRef = useRef();
  const geoRef = useRef();
  const categoryRef = useRef();
  const descRef = useRef();

  const user = useSelector((store) => store.auth.user);
  const mapData = useSelector((store) => store?.map?.map);

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const points = mapData.map((point) => ({
    type: "Feature",
    properties: {
      cluster: false,
      pointId: point._id,
      confirmed: point.confirmed,
      category: point.category,
      img: point.img,
      adress: point.adress,
      confirmed: point.confirmed,
      stars: point.stars,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(point.coordinates[0]),
        parseFloat(point.coordinates[1]),
      ],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const handleGeocoderResult = async (e) => {
    await setNewMarker([
      ...e.result.center,
      e.result.place_name,
      e.result.properties.address,
    ]);
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedMapPoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  function onSaveMarker() {
    console.log(user, newMarker);
    const marker = {
      category: categoryRef.current.value,
      description: descRef.current.value,
      author: user.id,
      coordinates: [newMarker[0], newMarker[1]],
      adress: newMarker[3],
    };
    console.log(marker);
    dispatch(createMarkerThunk(marker));
    setNewMarker(null);
  }

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="Map">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        ref={mapRef}
      >
        <Geocoder
          className={classes.geocoder}
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={handleGeocoderResult}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-left"
          ref={geoRef}
        />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <NavigationControl className={classes.navigation} showCompass={false} />
        {clusters.map((cluster) => {
          // every cluster point has coordinates
          const [longitude, latitude] = cluster.geometry.coordinates;
          // the point may be either a cluster or a crime point
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          // we have a cluster to render
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className={classes.cluster}
                  style={{
                    width: `${10 + (pointCount / points.length) * 50}px`,
                    height: `${10 + (pointCount / points.length) * 50}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={`point-${cluster.properties.pointId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button
                className={
                  cluster.properties.confirmed
                    ? classes.markerbtn_confirmed
                    : classes.markerbtn_not_confirmed
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMapPoint(cluster);
                }}
              >
                <img
                  className={classes.imgs}
                  src={getRightCategoryIcon(cluster.properties.category)}
                  alt="icon"
                />
              </button>
            </Marker>
          );
        })}

        {selectedMapPoint && (
          <SelectedPoint
            selectedMapPoint={selectedMapPoint}
            setSelectedMapPoint={setSelectedMapPoint}
          />
        )}
        {user && newMarker && (
          <CreatePoint
            setNewMarker={setNewMarker}
            onSaveMarker={onSaveMarker}
            newMarker={newMarker}
          />
        )}
        {user?.role === 0 && (
          <>
            <Button
              className={classes.moderator_btn}
              type="primary"
              onClick={showDrawer}
            >
              Open Moderator's menu
            </Button>
            <Drawer
              title={
                <div className={classes.Drawer_header}>
                  <p> Run the ECO world</p>
                </div>
              }
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <DrawerBody className={classes.Drawer} mapData={mapData} />
            </Drawer>
          </>
        )}
      </ReactMapGl>
    </div>
  );
};

export default Map;
