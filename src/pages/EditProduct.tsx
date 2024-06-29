import { Breadcrumb, Button, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Alert from "sweetalert2";
import CustomForm from "../components/Forms/CustomForm";
import CustomInput from "../components/Forms/CustomInput";
import CustomSelect from "../components/Forms/CustomSelect";
import CustomTextArea from "../components/Forms/CustomTextArea";
import ReviewForm from "../components/ui/ReviewForm";
import { useGetCategoryListQuery } from "../redux/features/category/categoryApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/features/product/productApi";
import { TProduct } from "../types";
import EditProductLoader from "../components/ui/EditProductLoader";

const EditProduct = () => {
  const params = useParams();
  const [defaultValues, setDefaultValues] = useState<Record<string, unknown>>({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    tags: [],
    weight: 3,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
  });

  //  REDUX HOOKS
  const [formKey, setFormKey] = useState(0);
  const { data: product, isLoading } = useGetSingleProductQuery(params.id);
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoryListQuery({});
  const [updateProduct, { isLoading: isLoadingUpdate }] = useUpdateProductMutation();
  const breadcrumbItems = [
    {
      title: <Link to='/'>Home</Link>,
    },
    {
      title: <Link to='/products'>Products</Link>,
    },
    {
      title: product?.title,
    },
  ];

  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      Alert.fire({
        title: "Do you want to update this product?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = (await updateProduct({ id: params.id, data: values })) as { data: TProduct };
          // API DOES NOT RETURN THE FULL PRODUCT DATA AFTER UPDATE
          console.log(res);
          if (res.data?.id) {
            Alert.fire("Product updated", "", "success");
          } else {
            Alert.fire("Something went wrong", "", "error");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product) {
      setDefaultValues({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        tags: product.tags,
        weight: product.weight,
        dimensions: product.dimensions,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
      });

      setFormKey((prev) => prev + 1);
    }
  }, [product]);
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      {isLoading ? (
        <EditProductLoader />
      ) : (
        <>
          <Typography.Title level={3} style={{ marginTop: 16 }}>
            Edit Product
          </Typography.Title>
          {/* IN THIS FORM RESOLVER IS NOT NEEDED BECAUSE ALL FIELDS ARE IN DEFAULT VALUES */}
          <CustomForm onsubmit={handleSubmit} defaultValues={defaultValues} key={formKey}>
            <Row gutter={16}>
              <>
                <Col span={24} md={12}>
                  <CustomInput
                    id='title'
                    label='Title'
                    name='title'
                    placeholder='title'
                    type='text'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomSelect
                    id='category'
                    label='Category'
                    name='category'
                    placeholder='category'
                    options={
                      categories?.map((category) => ({
                        label: <span>{category}</span>,
                        value: category,
                      })) || []
                    }
                    loading={isLoadingCategories}
                    showSearch
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='description'
                    label='Description'
                    name='description'
                    placeholder='description'
                    type='text'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='price'
                    label='Price'
                    name='price'
                    placeholder='price'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='discountPercentage'
                    label='Discount Percentage'
                    name='discountPercentage'
                    placeholder='discountPercentage'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='rating'
                    label='Rating'
                    name='rating'
                    placeholder='rating'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='stock'
                    label='Stock'
                    name='stock'
                    placeholder='stock'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='brand'
                    label='Brand'
                    name='brand'
                    placeholder='brand'
                    type='text'
                  />
                </Col>
                <Col span={24}>
                  <CustomInput
                    id='thumbnail'
                    label='Thumbnail'
                    name='thumbnail'
                    placeholder='thumbnail'
                    type='text'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomSelect id='tags' label='Tags' name='tags' placeholder='tags' mode='tags' />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='weight'
                    label='Weight'
                    name='weight'
                    placeholder='weight'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='dimensions-width'
                    label='Dimensions Width'
                    name='dimensions.width'
                    placeholder='dimensions width'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='dimensions-height'
                    label='Dimensions Height'
                    name='dimensions.height'
                    placeholder='dimensions height'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomInput
                    id='dimensions-depth'
                    label='Dimensions Depth'
                    name='dimensions.depth'
                    placeholder='dimensions depth'
                    type='number'
                  />
                </Col>
                <Col span={24} md={12}>
                  <CustomSelect
                    id='availabilityStatus'
                    label='Availability Status'
                    name='availabilityStatus'
                    placeholder='availabilityStatus'
                    options={[
                      {
                        label: <span>IN_STOCK</span>,
                        value: "In Stock",
                      },
                      {
                        label: <span>OUT_OF_STOCK</span>,
                        value: "Out of Stock",
                      },
                      {
                        label: <span>Low Stock</span>,
                        value: "Low Stock",
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <CustomTextArea
                    id='warrantyInformation'
                    label='Warranty Information'
                    name='warrantyInformation'
                    placeholder='warrantyInformation'
                  />
                </Col>
                <Col span={24}>
                  <CustomTextArea
                    id='shippingInformation'
                    label='Shipping Information'
                    name='shippingInformation'
                    placeholder='shippingInformation'
                  />
                </Col>

                <Col span={24}>
                  <Button
                    style={{ width: "100%" }}
                    loading={isLoadingUpdate}
                    htmlType='submit'
                    type='primary'
                  >
                    Submit
                  </Button>
                </Col>
              </>
            </Row>
          </CustomForm>
          <div style={{ marginTop: 16 }}>
            <ReviewForm reviews={product?.reviews} id={params.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default EditProduct;
