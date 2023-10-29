import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const customersApi = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({
        baseUrl: ''
    }),
    endpoints(builder) {
        return {
            addCustomer: builder.mutation({
                invalidatesTags: (result, error, customer) => {
                    return [{ type: "Customer" }]
                },
                query: (customer) => {
                    return {
                        url: "/customers",
                        method: "POST",
                        body: {
                            first_name: customer.first_name,
                            last_name: customer.last_name,
                            email: customer.email,
                            password: customer.password
                        }
                    }
                }
            }),
            fetchCustomer: builder.query({
                query: (customer) => {
                    return {
                        url: "/customers",
                        params: {
                            customerId: customer.id,
                        },
                        method: "GET",

                    };
                }
            }),
            fetchCustomers: builder.query({
                providesTags: (result, error, customer) => {
                    return [{ type: "Customer" }]
                },
                query: () => {
                    return {
                        url: "/customers",
                        params: {},
                        method: "GET",

                    };
                }
            })
        };
    }
})

export const { useFetchCustomersQuery, useFetchCustomerQuery, useAddCustomerMutation } = customersApi;
export { customersApi };