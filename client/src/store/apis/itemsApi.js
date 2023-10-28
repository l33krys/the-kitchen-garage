import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const itemsApi = createApi({
    reducerPath: 'items',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555/'
    }),
    endpoints(builder) {
        return {
            fetchItems: builder.query({
                query: () => {
                    return {
                        url: "/items",
                        params: {},
                        method: "GET",

                    };
                }
            })
        };
    }
})

export const { useFetchItemsQuery } = itemsApi;
export { itemsApi };