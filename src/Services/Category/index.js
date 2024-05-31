import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getAllCategoryApi = createApi({
    reducerPath: "getAllCategoryApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
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