import { TProduct, TProductsResponse, TQueryObject } from "../../../types";
import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (query: TQueryObject[]) => {
        const params = new URLSearchParams();
        if (query && query.length > 0) {
          query.forEach((item) => {
            params.append(item.label, item.value);
          });
        }
        return {
          url: "/products",
          params,
        };
      },
      transformResponse: (response: TProductsResponse) => response,
      providesTags: ["products"],
    }),
    getSingleProduct: build.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response: TProduct) => response,
      providesTags: ["products"],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery, useUpdateProductMutation } =
  productApi;
