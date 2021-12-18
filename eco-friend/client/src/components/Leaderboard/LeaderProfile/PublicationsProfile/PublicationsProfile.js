import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const PublicationsProfile = ({ authorId }) => {
  const publications = useSelector((store) => store.entry.entries).filter(
    (publications) => {
      return publications.author._id
        .toLowerCase()
        .includes(authorId.toLowerCase());
    }
  );

  return (
    <div className="mt-1 border border-secondary rounded-3 backgroundUser">
      {publications.map((item) => (
        <Container data-bs-spy="scroll">
          <Row>
            <Col md={{ span: 6 }}>
              <Card.Img
                variant="top"
                src={item.img}
                height="200px"
                className="mt-1"
              />
            </Col>
            <Col md={{ span: 6 }} className="colorTextProfile">
              {item.text}
            </Col>
          </Row>
          <Row>
            <Form className="d-flex justify-content-between w-50 mt-1 mb-1">
              {/* <div className="colorTextProfile">Category: {item?.category}</div>//TODO */}
            </Form>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default PublicationsProfile;
