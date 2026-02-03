import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  contact: string;
}

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

/* 🔹 ASYNC THUNK (API CALL) */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await fetch("http://localhost:4000/users");
    return await res.json();
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: { name: string; email: string; contact: string }) => {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error("Failed to add user");
    }

    return await res.json();
  }
);

  export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id: string) => {
      await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
      });
      return id;
    }
  );

  export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({
      id,
      data,
    }: {
      id: string;
      data: { name: string; email: string; contact: string };
    }) => {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json(); // updated user
    }
  );

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}, // abhi empty
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
