import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/product/productApi";
import { Breadcrumb } from "antd";
import CustomForm from "../components/Forms/CustomForm";
import CustomInput from "../components/Forms/CustomInput";
import { useEffect, useState } from "react";

const EditProduct = () => {
  const params = useParams();
  const [defaultValues, setDefaultValues] = useState({});
  const { data: product } = useGetSingleProductQuery(params.id);
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

  const handleSubmit = () => {};

  useEffect(() => {
    if (product) {
      setDefaultValues(product);
    }
  }, [product]);

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <CustomForm onsubmit={handleSubmit} defaultValues={defaultValues}>
        <div className='space-y-4'>
          <CustomInput id='title' label='Title' name='title' placeholder='title' type='text' />
        </div>
      </CustomForm>
    </div>
  );
};

export default EditProduct;
