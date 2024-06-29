import { Col, Row, Skeleton } from "antd";

const EditProductLoader = () => {
  return (
    <Row gutter={44}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Col span={24} md={12} key={index}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Col>
      ))}
    </Row>
  );
};

export default EditProductLoader;
