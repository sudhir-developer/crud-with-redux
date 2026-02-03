import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

// 🔹 Async thunk - fetch products from API
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      return data.products; // important: array of products
    }
  );

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
