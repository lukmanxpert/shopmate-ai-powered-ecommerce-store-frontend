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

export const postReview = createAsyncThunk(
  "/product/post-new/review",
  async ({ productId, review }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/product/post-new/review/${productId}`,
        review
      );
      toast.success(response.data.message);
      return response.data.review;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to post review.");
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to post review."
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "/product/delete/review",
  async ({ productId, reviewId }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `/product/delete/review/${productId}`
      );
      toast.success(response.data.message);
      return reviewId;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete review.");
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to delete review."
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
      })
      .addCase(postReview.pending, (state) => {
        state.isPostingReview = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isPostingReview = false;
        state.productReviews = [action.payload, ...state.productReviews];
      })
      .addCase(postReview.rejected, (state) => {
        state.isPostingReview = false;
      })
      .addCase(deleteReview.pending, (state) => {
        state.isReviewDeleting = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isReviewDeleting = false;
        state.productReviews = state.productReviews.filter(
          (review) => review.review_id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isReviewDeleting = false;
      });
  },
});

export default productSlice.reducer;
