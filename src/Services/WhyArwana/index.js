import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getAllWhyArwanaApi = createApi({
    reducerPath: "getAllWhyArwanaApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes: ["WhyArwana"],
    endpoints: (build) => ({
        getAllWhyArwanaData: build.query({
            query: () => ({
                url: "/arwana/why-arwana",
            }),
            providesTags: () => ["WhyArwana"]
        }),
       
    })
})