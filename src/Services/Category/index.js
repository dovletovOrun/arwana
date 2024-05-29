import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getAllCategoryApi = createApi({
    reducerPath: "getAllCategoryApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://216.250.11.9:8090"}),
    tagTypes: ["Category"],
    endpoints: (build) => ({
        getAllCategoryData: build.query({
            query: () => ({
                url: "/category/header-categories/"
            }),
            providesTags: ["Category"]
        }),
        getAllSubcategoryData: build.query({
            query: (id) => ({
                url: `/category/subcategory-products/${id}/`
            }),
            providesTags: ["Category"]
        })
    })
})