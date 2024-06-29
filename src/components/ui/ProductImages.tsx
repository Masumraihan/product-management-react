import { Col, Row } from "antd";
import { useState } from "react";

const ProductImages = ({ images, thumbnail }: { images?: string[]; thumbnail?: string }) => {
  const [currentImage, setCurrentImage] = useState(thumbnail);
  return (
    <Row gutter={[16, 16]} align='middle'>
      <Col span={24} md={6} style={{ height: "100%" }}>
        <Row gutter={[16, 16]} className='product-images-container'>
          {images?.map((image) => (
            <Col span={8} md={24} style={{ height: "100%" }} key={image}>
              <img
                src={image}
                alt={image}
                style={{ border: `1px solid ${image === currentImage ? "#00246B" : "lightgray"}` }}
                onClick={() => setCurrentImage(image)}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24} md={18}>
        <div className='product-thumbnail-container'>
          <img src={currentImage} alt='thumbnail' className='product-thumbnail' />
        </div>
      </Col>
    </Row>
  );
};

export default ProductImages;
