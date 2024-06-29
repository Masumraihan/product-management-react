import { Badge, Button, Flex, TableProps, Typography } from "antd";
//import {ExpandOutlined} from ""
import { EditOutlined, ExpandOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TProduct } from "../../types";

const ProductColumn: TableProps<TProduct>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render(value) {
      return <span>${value}</span>;
    },
  },
  {
    title: "Discount (%)",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
    render(value) {
      return (
        <Badge
          text={`${value.toFixed(1)}%`}
          color={value > 50 ? "green" : value > 20 ? "orange" : "blue"}
        />
      );
    },
  },
  {
    title: " Status",
    dataIndex: "availabilityStatus",
    key: "availabilityStatus",
    render(value) {
      const color = value === "In Stock" ? "green" : value === "Out of Stock" ? "red" : "orange";
      return <Typography style={{ color }}>{value}</Typography>;
    },
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    render(value) {
      return <span>{value.toFixed(1)}</span>;
    },
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: (_, record) => (
      <Flex gap={8} align='center'>
        <Link to={`/products/${record.id}`}>
          <Button icon={<ExpandOutlined />} />
        </Link>
        <Link to={`/products/edit/${record.id}`}>
          <Button icon={<EditOutlined />} />
        </Link>
      </Flex>
    ),
  },
];

export default ProductColumn;
