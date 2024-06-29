import { Link, useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/features/product/productApi";
import { Breadcrumb, Button } from "antd";
import CustomForm from "../components/Forms/CustomForm";
import CustomInput from "../components/Forms/CustomInput";
import { useEffect, useState } from "react";
import CustomSelect from "../components/Forms/CustomSelect";
import { useGetCategoryListQuery } from "../redux/features/category/categoryApi";
import CustomTextArea from "../components/Forms/CustomTextArea";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TProduct } from "../types";
import Swal from "sweetalert2";

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
      href: "/",
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
      Swal.fire({
        title: "Do you want to update this product?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = (await updateProduct({ id: params.id, data: values })) as { data: TProduct };
          if (res.data?.id) {
            Swal.fire("Product updated", "", "success");
          } else {
            Swal.fire("Something went wrong", "", "error");
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
        <div>Loading...</div>
      ) : (
        <CustomForm onsubmit={handleSubmit} defaultValues={defaultValues} key={formKey}>
          <>
            <CustomInput id='title' label='Title' name='title' placeholder='title' type='text' />
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
            <CustomInput
              id='description'
              label='Description'
              name='description'
              placeholder='description'
              type='text'
            />
            <CustomInput id='price' label='Price' name='price' placeholder='price' type='number' />
            <CustomInput
              id='discountPercentage'
              label='Discount Percentage'
              name='discountPercentage'
              placeholder='discountPercentage'
              type='number'
            />
            <CustomInput
              id='rating'
              label='Rating'
              name='rating'
              placeholder='rating'
              type='number'
            />
            <CustomInput id='stock' label='Stock' name='stock' placeholder='stock' type='number' />
            <CustomInput id='brand' label='Brand' name='brand' placeholder='brand' type='text' />
            <CustomInput
              id='thumbnail'
              label='Thumbnail'
              name='thumbnail'
              placeholder='thumbnail'
              type='text'
            />
            <CustomSelect id='tags' label='Tags' name='tags' placeholder='tags' mode='tags' />
            <CustomInput
              id='weight'
              label='Weight'
              name='weight'
              placeholder='weight'
              type='number'
            />
            <CustomInput
              id='dimensions-width'
              label='Dimensions Width'
              name='dimensions.width'
              placeholder='dimensions width'
              type='number'
            />
            <CustomInput
              id='dimensions-height'
              label='Dimensions Height'
              name='dimensions.height'
              placeholder='dimensions height'
              type='number'
            />
            <CustomInput
              id='dimensions-depth'
              label='Dimensions Depth'
              name='dimensions.depth'
              placeholder='dimensions depth'
              type='number'
            />
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

            <CustomTextArea
              id='warrantyInformation'
              label='Warranty Information'
              name='warrantyInformation'
              placeholder='warrantyInformation'
            />
            <CustomTextArea
              id='shippingInformation'
              label='Shipping Information'
              name='shippingInformation'
              placeholder='shippingInformation'
            />

            <Button loading={isLoadingUpdate} htmlType='submit' type='primary'>
              Submit
            </Button>
          </>
        </CustomForm>
      )}
    </div>
  );
};

export default EditProduct;
