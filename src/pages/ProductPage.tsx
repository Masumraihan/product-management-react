import { Pagination, PaginationProps, Table } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductColumn from "../components/ui/productColumn";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { TQueryObject } from "../types/common";

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const skip = searchParams.get("skip") || "0";
  const query: TQueryObject[] = [];

  if (limit) {
    query.push({ label: "limit", value: limit });
  }
  if (skip) {
    query.push({ label: "skip", value: skip });
  }

  const { data, isFetching } = useGetProductsQuery([...query]);

  const handleChange = (pageValue: number) => {
    setCurrentPage(pageValue);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (_, pageSize) => {
    setCurrentLimit(pageSize);
  };

  useEffect(() => {
    const skip = (currentPage - 1) * currentLimit;
    if (currentLimit === 10 && currentPage === 1 && skip < 10) {
      searchParams.delete("skip");
      searchParams.delete("limit");
      setSearchParams(searchParams);
    } else {
      searchParams.set("limit", String(currentLimit));
      searchParams.set("skip", String(skip));
      setSearchParams(searchParams);
    }
  }, [currentLimit, currentPage, searchParams, setSearchParams]);

  return (
    <div className='space-y-4'>
      <Table
        columns={ProductColumn}
        dataSource={data?.products}
        loading={isFetching}
        pagination={false}
        rowKey='id'
      />
      <Pagination
        disabled={isFetching}
        style={{ display: "flex", justifyContent: "end" }}
        defaultCurrent={currentPage}
        onChange={handleChange}
        total={data?.total}
        showTotal={(total) => `Total ${total} items`}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={["10", "20", "30", "40", "50"]}
        responsive
        hideOnSinglePage
      />
    </div>
  );
};

export default ProductPage;
