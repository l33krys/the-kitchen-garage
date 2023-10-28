import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const customersApi = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555/'
    }),
    endpoints(builder) {
        return {
            addCustomer: builder.mutation({
                query: (customer) => {
                    return {
                        url: "/customers",
                        method: "POST",
                        body: {
                            first_name: customer.first_name,
                            last_name: customer.last_name,
                            email: customer.email,
                            phone_number: customer.phone_number,
                            _password_hash: customer._password_hash
                        }
                    }
                }
            }),
            fetchCustomers: builder.query({
                query: (customer) => {
                    return {
                        url: "/customers",
                        params: {
                            customerId: customer.id,
                        },
                        method: "GET",

                    };
                }
            })
        };
    }
})

export const { useFetchCustomersQuery, useAddCustomerMutation } = customersApi;
export { customersApi };