import { Flex, Skeleton } from "antd";

const ProductDetailsLoader = () => {
  return (
    <Flex gap={44} vertical>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Flex>
  );
};

export default ProductDetailsLoader;
