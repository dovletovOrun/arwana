import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getAllBrandsApi = createApi({
    reducerPath: "getAllBrandsApi",
    baseQuery: fetchBaseQuery({baseUrl: `http://216.250.11.9:8090`}),
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
