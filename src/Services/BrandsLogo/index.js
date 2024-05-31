import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getBrandsLogoApi = createApi({
    reducerPath: "getBrandsLogoApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
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