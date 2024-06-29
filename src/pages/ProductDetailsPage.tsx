import { Breadcrumb, Col, Divider, Flex, Rate, Row, Tooltip, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import ProductDetailsLoader from "../components/ui/ProductDetailsLoader";
import ProductImages from "../components/ui/ProductImages";
import Reviews from "../components/ui/Reviews";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { Helmet } from "react-helmet-async";

const ProductDetailsPage = () => {
  const params = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery(params.id);
  const breadcrumbItems = [
    {
      title: <Link to='/'>Home</Link>,
      href: "/",
    },
    {
      title: <Link to='/products'>Products</Link>,
    },
    {
      title: product?.title,
    },
  ];
  return (
    <div className='space-y-4'>
      <Helmet>
        <title> {`${product?.title}`} | Product Management</title>
      </Helmet>
      <Breadcrumb items={breadcrumbItems} />
      {isLoading ? (
        <ProductDetailsLoader />
      ) : (
        <div>
          <Row gutter={[16, 16]} style={{ paddingTop: 16 }}>
            <Col span={24} md={12} className='space-y-4'>
              <ProductImages images={product?.images} thumbnail={product?.thumbnail} />
            </Col>
            <Col span={24} md={12}>
              <Typography.Title level={2}>{product?.title}</Typography.Title>
              <Typography.Paragraph className='product-description'>
                {product?.description}
              </Typography.Paragraph>
              <Row gutter={[16, 16]} align={"middle"}>
                <Col span={24} md={12}>
                  <Flex gap={8} align='center'>
                    <Rate style={{ color: "#00246B" }} allowHalf value={product?.rating} disabled />{" "}
                    ({product?.reviews?.length} reviews)
                  </Flex>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Brand</b> : {product?.brand}
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Category</b> : {product?.category}
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Price</b> : <b style={{ color: "#00246B" }}>${product?.price}</b>
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Discount</b> : {product?.discountPercentage}%
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Weight</b> : {product?.weight} mg
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>SKU</b> : {product?.sku}
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Stock</b> : {product?.stock} items in stock
                  </Typography.Text>
                  <Typography.Text style={{ display: "block" }}>
                    <b>Minimum Order Quantity</b> : {product?.minimumOrderQuantity}
                  </Typography.Text>
                </Col>
                <Col span={24} md={12}>
                  <Flex vertical align='center' justify='center'>
                    <Typography.Text style={{ marginBottom: 0, lineHeight: "1" }}>
                      QR Code
                    </Typography.Text>
                    <Tooltip title={"Click to open in new tab"}>
                      <img
                        onClick={() => window.open(product?.meta.qrCode)}
                        style={{ cursor: "pointer" }}
                        src={product?.meta.qrCode}
                        alt={`${product?.title} qr code`}
                      />
                    </Tooltip>
                  </Flex>
                </Col>
              </Row>
              <div className='tags-container'>
                <b>Tags</b> :{" "}
                <div className='tags'>
                  {product?.tags?.map((tag) => (
                    <span className='tag' key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className='dimensions-container'>
                <b>Dimensions</b> :{" "}
                <div className='dimensions'>
                  <span className='dimension'>
                    {product?.dimensions?.width} <span style={{ margin: "0 0.5rem" }}>X</span>{" "}
                    {product?.dimensions.height} <span style={{ margin: "0 0.5rem" }}>X</span>{" "}
                    {product?.dimensions.depth}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ paddingTop: 16 }}>
            <Col span={24}>
              <Typography.Title style={{ marginBottom: 0 }} level={5}>
                Shipping Information
              </Typography.Title>
              <Typography.Text className='product-description'>
                {product?.shippingInformation}
              </Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Title style={{ marginBottom: 0 }} level={5}>
                Warranty Information
              </Typography.Title>
              <Typography.Text className='product-description'>
                {product?.warrantyInformation}
              </Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Title style={{ marginBottom: 0 }} level={5}>
                Return Policy
              </Typography.Title>
              <Typography.Text className='product-description'>
                {product?.returnPolicy}
              </Typography.Text>
            </Col>
          </Row>
          <Divider />
          <div>
            <Typography.Title style={{ marginBottom: 0 }} level={3}>
              Reviews
            </Typography.Title>
            <Reviews reviews={product?.reviews} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
