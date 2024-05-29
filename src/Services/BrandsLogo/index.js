import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getBrandsLogoApi = createApi({
    reducerPath: "getBrandsLogoApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://216.250.11.9:8090"}),
    tagTypes: ["BrandLogo"],
    endpoints: (build) => ({
        getAllBrandsLogoData: build.query({
            query: () => ({
                url: "/brand/brand-logos/"
            }),
            providesTags: ["BrandLogo"]
        })
    })
})