import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import classes from "./LeaderProfile.module.css";
import "./LeaderProfile.css";

const LeaderProfile = ({ openProfile, setShowPublications }) => {
  const { img, name, rating } = openProfile;

  return (
    <div className="mt-1 border border-secondary rounded-3 backgroundUser">
      <Container data-bs-spy="scroll">
        <Row>
          <Col md={{ span: 6 }}>
            <Card.Img
              variant="top"
              src={img ? img : "/img/person/default_avatar.jpeg"}
              className="mt-1"
            />
          </Col>
          <Col md={{ span: 6 }} className="colorTextProfile">
            <div className="colorTextProfile">
              <p>Name: {name}</p>
              <p> Rating: {rating} </p>
            </div>
          </Col>
        </Row>
        <Button
          className={classes.btn_publication}
          variant="outline-success"
          onClick={() => setShowPublications((value) => !value)}
        >
          Publications
        </Button>
      </Container>
    </div>
  );
};

export default LeaderProfile;
