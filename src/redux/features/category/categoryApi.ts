import baseApi from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryList: build.query({
      query: () => "/products/category-list",
      transformResponse: (response: string[]) => response,
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryApi;
