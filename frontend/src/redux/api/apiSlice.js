import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Export the hook for use in functional components
// This is the hook that will be used in the components to make the API calls
export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});