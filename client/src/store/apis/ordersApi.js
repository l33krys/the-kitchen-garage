import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const ordersApi = createApi({
    reducerPath: 'orders',
    baseQuery: fetchBaseQuery({
        baseUrl: ''
    }),
    endpoints(builder) {
        return {
            addOrder: builder.mutation({
                invalidatesTags: (result, error, order) => {
                    return [{ type: "Order" }]
                },
                query: (order) => {
                    return {
                        url: "/orders",
                        method: "POST",
                        body: {
                            // first_name: customer.first_name,
                            // last_name: customer.last_name,
                            // email: customer.email,
                            // password: customer.password
                        }
                    }
                }
            }),
            deleteOrder: builder.mutation({
                invalidatesTags: (result, error, order) => {
                    return [{ type: "Order" }]
                },
                query: (order) => {
                    return {
                        url: "/orders",
                        method: "DELETE",
                        body: {
                            id: order.id,
                        }
                    }
                }
            }),
            fetchOrder: builder.query({
                query: (order) => {
                    return {
                        url: `/orders/${order.id}`,
                        params: {},
                        method: "GET",

                    };
                }
            }),
            fetchOrders: builder.query({
                providesTags: (result, error, order) => {
                    return [{ type: "Order" }]
                },
                query: () => {
                    return {
                        url: "/orders",
                        params: {},
                        method: "GET",

                    };
                }
            })
        };
    }
})

export const { useFetchOrdersQuery, useFetchOrderQuery, useAddOrderMutation, useDeleteOrderMutation } = ordersApi;
export { ordersApi };