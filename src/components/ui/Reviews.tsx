import { Col, Rate, Row, Typography } from "antd";
import moment from "moment";
import { TReview } from "../../types";

const Reviews = ({ reviews }: { reviews?: TReview[] }) => {
  console.log(reviews);
  return (
    <Row gutter={[16, 16]} align='middle' className='reviews'>
      {reviews?.map((review) => (
        <Col span={24} md={12} lg={6} className='review' key={review.comment}>
          <div className='review-header'>
            <Typography.Title style={{ marginBottom: 0 }} level={5}>
              {review.reviewerName}
            </Typography.Title>
            <Typography.Text className='review-date'>
              {moment(review.date).format("LL h:mm A")}
            </Typography.Text>
          </div>
          <div className='review-rating'>
            <Rate style={{ color: "#00246B" }} allowHalf disabled value={review.rating} /> (
            {review.rating})
          </div>
          <Typography.Text className='review-text'>{review.comment}</Typography.Text>
        </Col>
      ))}
    </Row>
  );
};

export default Reviews;
