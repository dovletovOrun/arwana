import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getAllWhyArwanaApi = createApi({
    reducerPath: "getAllWhyArwanaApi",
    baseQuery: fetchBaseQuery({baseUrl: `http://216.250.11.9:8090`}),
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