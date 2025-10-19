import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const fetchAllProducts = createAsyncThunk(
  "/product/fetchAll",
  async (
    {
      availability = "",
      price = "0-10000",
      category = "",
      ratings = "",
      search = "",
      page = 1,
    },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (price) params.append("price", price);
      if (search) params.append("search", search);
      if (ratings) params.append("ratings", ratings);
      if (availability) params.append("availability", availability);
      if (page) params.append("page", page);

      const response = await axiosInstance.get(`/product?${params.toString()}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to fetch products."
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/product/singleProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/product/singleProduct/${id}`);
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to fetch product details."
      );
    }
  }
);



const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    productDetails: {},
    totalProducts: 0,
    topRatedProducts: [],
    newProducts: [],
    aiSearching: false,
    isReviewDeleting: false,
    isPostingReview: false,
    productReviews: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.newProducts = action.payload.newProducts;
        state.topRatedProducts = action.payload.topRatedProducts;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
        state.productReviews = action.payload.reviews;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
