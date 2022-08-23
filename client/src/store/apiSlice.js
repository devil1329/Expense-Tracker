import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const baseURI = 'http://localhost:8080'

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : baseURI }),
    endponts : builder => ({
        // get categories 
        getCategories : builder.query({
            // for get http://localhost:8080/api/categories 
            query : () => '/api/categories',
            providesTags : ['categories']
        }),

        // get labels 
        getLabels : builder.query({
            // for get http://localhost:8080/api/labels
            query : () => '/api/labels',
            providesTags : ['transactions']
        }),

        // add new Transaction 
        addTransaction : builder.mutation({
            query : (record) => ({
                // for post http://localhost:8080/api/transactions 
                url: '/api/transactions',
                method : "POST",
                body : record // used to get the transaction data from the  page,
            }),
            invalidatesTags : ['transactions'] 
        }),

        // delete record
        deleteTransaction : builder.mutation({
            query : recordID => ({
                // for delete http://localhost:8080/api/transactions 
                url: '/api/transactions',
                method : "DELETE",
                body : recordID // used to get the transaction data from the  page
            }),
            invalidatesTags : ['transactions'] 
        })
    })
})

export default apiSlice;