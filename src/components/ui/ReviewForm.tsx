import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Rate } from "antd";
import { z } from "zod";
import { TProduct, TReview } from "../../types";
import { createSchemaFieldRule } from "antd-zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import Alert from "sweetalert2";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z.string().min(1, { message: "Comment is required" }),
  reviewerName: z.string().min(1, { message: "Reviewer name is required" }),
  reviewerEmail: z.string().email({ message: "Invalid email address" }),
});

const reviewsSchema = z.object({
  items: z.array(reviewSchema),
});

const ReviewForm = ({ reviews, id }: { reviews?: TReview[]; id?: string }) => {
  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(reviewsSchema);
  const [updateProduct, { isLoading: isLoadingUpdate }] = useUpdateProductMutation();
  const reviewHandler: SubmitHandler<FieldValues> = async (values) => {
    const payload = {
      reviews: [...values.items],
    };

    try {
      Alert.fire({
        title: "Do you want to update this product review?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = (await updateProduct({ id: id, data: payload })) as { data: TProduct };
          // API DOES NOT RETURN THE FULL PRODUCT DATA AFTER UPDATE
          console.log(res);
          if (res.data?.id) {
            Alert.fire("Product review updated", "", "success");
          } else {
            Alert.fire("Something went wrong", "", "error");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{ items: reviews || [] }}
        onFinish={reviewHandler}
        layout='vertical'
        //disabled={isLoadingUpdate}
      >
        <Form.List name='items'>
          {(fields, { add, remove }) => {
            return (
              <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                {fields.map((field) => (
                  <Card
                    size='small'
                    title={`Item ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      label='Reviewer Name'
                      name={[field.name, "reviewerName"]}
                      rules={[rule]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Reviewer Email'
                      name={[field.name, "reviewerEmail"]}
                      rules={[rule]}
                    >
                      <Input type='email' />
                    </Form.Item>
                    <Form.Item label='Rating' name={[field.name, "rating"]} rules={[rule]}>
                      <Rate allowHalf />
                    </Form.Item>
                    <Form.Item label='Comment' name={[field.name, "comment"]} rules={[rule]}>
                      <Input.TextArea />
                    </Form.Item>
                  </Card>
                ))}

                <Button type='dashed' style={{ border: "#00246B" }} onClick={() => add()} block>
                  + Add Item
                </Button>
              </div>
            );
          }}
        </Form.List>

        {/*<Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>*/}
        <Button loading={isLoadingUpdate} type='primary' htmlType='submit' block>
          Update Reviews
        </Button>
      </Form>
    </>
  );
};

export default ReviewForm;
