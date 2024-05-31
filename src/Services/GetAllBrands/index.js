import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getAllBrandsApi = createApi({
    reducerPath: "getAllBrandsApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes: ["Brand"],
    endpoints: (build) => ({
        getHomePageData: build.query({
            query: () => ({
                url: "/arwana/home-page/",
            }),
            providesTags: () => ["Brand"]
        }),
        getAllBrandsData: build.query({
            query: () => ({
                url: "/brand/brands/",
            }),
          
        }),
        getAllProductDetailsData: build.query({
            query: (id) => ({
                url: `/product/product-detail/${id}/`,
            }),
     
        }),
        getAllBrandDetailsData: build.query({
            query: (id) => ({
                url: `/brand/brand-detail/${id}/`,
            }),
        }),
       
    })
})
