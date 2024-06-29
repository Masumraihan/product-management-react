import { HomeOutlined, ProductOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export const navItems = [
  {
    label: <Link to='/'>Home</Link>,
    path: "/",
    key: "1",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to='/products'>Products</Link>,
    path: "/products",
    key: "2",
    icon: <ProductOutlined />,
  },
];
