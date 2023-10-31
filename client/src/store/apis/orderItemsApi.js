import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderItemsApi = createApi({
    reducerPath: 'orderItems',
    baseQuery: fetchBaseQuery({
        baseUrl: ''
    }),
    endpoints(builder) {
        return {
            addOrderItem: builder.mutation({
                invalidatesTags: (result, error, orderItem) => {
                    return [{ type: "OrderItem" }]
                },
                query: (order_item) => {
                    return {
                        url: "/order_items",
                        method: "POST",
                        body: {
                            item_id: order_item.item_id,
                            quantity: order_item.quantity,
                            order_id: order_item.order_id,
                        }
                    }
                }
            }),
            deleteOrderItem: builder.mutation({
                invalidatesTags: (result, error, orderItem) => {
                    return [{ type: "OrderItem" }]
                },
                query: (delOrderItem) => {
                    return {
                        url: `/order_items/${delOrderItem}`,
                        method: "DELETE",
                    }
                }
            }),
            fetchOrderItem: builder.query({
                query: (order_item) => {
                    return {
                        url: "/order_items",
                        params: {
                            orderItem: order_item.item_id,
                        },
                        method: "GET",
                    };
                }
            }),
            fetchOrderItems: builder.query({
                providesTags: (result, error, orderItem) => {
                    return [{ type: "OrderItem" }]
                },
                query: (order) => {
                    return {
                        url: "/order_items",
                        params: {
                            order_id: order.id
                        },
                        method: "GET",

                    };
                }
            })
        };
    }
})


export const { useFetchOrderItemsQuery, useFetchOrderItemQuery, useAddOrderItemMutation, useDeleteOrderItemMutation } = orderItemsApi;
export { orderItemsApi };