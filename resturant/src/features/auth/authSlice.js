// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "./authService";


// const user = JSON.parse(localStorage.getItem("user"))


// const initialState = {
//     user: user ? user : null,
//     userInfo: {},
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: "",
// }



// export const register = createAsyncThunk(
//     "auth/register",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.register(userData);
//         } catch (error) {
//             let message = "";

//             if (error.response) {
//                 const responseSize = error.response.headers['content-length'];
                
//                 // Use response body size to trigger more specific error handling
//                 if (responseSize === '58') {
//                     message = "This email is already in use. Please use a different email.";
//                 } else if (responseSize === '151') {
//                     message = "Invalid password should be 8char contain num char special char";
//                 }
              
//             }

//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );






// export const login = createAsyncThunk(
//     "auth/login",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.login(userData);
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 // Handle 404 error (Not Found) specifically for login
//                 return thunkAPI.rejectWithValue("Invalid username or password");
//             } else if (error.response && error.response.status === 401) {
//                 // Handle 401 error (Unauthorized) specifically for login
//                 // return thunkAPI.rejectWithValue("Invalid username or password");
//                 const responseBody = error.response && error.response.data;
//                 const responseSize = responseBody ? JSON.stringify(responseBody).length : 0;

//                 if (responseSize === 63) {
//                     // Handle the case where the response size is exactly 63 bytes
//                     return thunkAPI.rejectWithValue("Invalid username or password or you dosnt activate email ");
//                 } else {
//                     // Handle other cases for 401 errors
//                     return thunkAPI.rejectWithValue("Invalid username or password or you dosnt activate email");
//                 }
//             } else {
//                 // Handle other unexpected errors
//                 const message = error.response
//                     ? error.response.data.message || error.response.statusText
//                     : error.message || error.toString();
//                 return thunkAPI.rejectWithValue(message);
//             }
//         }
//     }
// );

// export const logout = createAsyncThunk(
//     "auth/logout",
//     async () => {
//         authService.logout()
//     }
// )

// export const activate = createAsyncThunk(
//     "auth/activate",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.activate(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )

// export const resetPassword = createAsyncThunk(
//     "auth/resetPassword",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.resetPassword(userData)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )


// export const resetPasswordConfirm = createAsyncThunk(
//     "auth/resetPasswordConfirm",
//     async (userData, thunkAPI) => {
//         try {
//             return await authService.resetPasswordConfirm(userData);
//         } catch (error) {
//             let errorMessage = "An error occurred while resetting the password.";

//             if (error.response && error.response.status === 400) {
//                 const responseSize = error.response.headers["content-length"];

//                 if (responseSize === "62") {
//                     errorMessage = "passwords does not match. Please try again.";
//                 } else if (responseSize === "155") {
//                     errorMessage = "The password should be at least 8 characters long and contain numbers and special char.";
//                 }
//                 // Add more conditions based on specific response sizes or criteria
//             }

//             return thunkAPI.rejectWithValue(errorMessage);
//         }
//     }
// );


// export const getUserInfo = createAsyncThunk(
//     "auth/getUserInfo",
//     async (_, thunkAPI) => {
//         try {
//             const accessToken = thunkAPI.getState().auth.user.access
//             return await authService.getUserInfo(accessToken)
//         } catch (error) {
//             const message = (error.response && error.response.data
//                 && error.response.data.message) ||
//                 error.message || error.toString()

//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )


// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         reset: (state) => {
//             state.isLoading = false
//             state.isError = false
//             state.isSuccess = false
//             state.message = false
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(register.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(register.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//             })
//             .addCase(register.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(login.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(login.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//             })
//             .addCase(login.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(logout.fulfilled, (state) => {
//                 state.user = null
//             })
//             .addCase(activate.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(activate.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//             })
//             .addCase(activate.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(resetPassword.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(resetPassword.fulfilled, (state) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//             })
//             .addCase(resetPassword.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(resetPasswordConfirm.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(resetPasswordConfirm.fulfilled, (state) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//             })
//             .addCase(resetPasswordConfirm.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.message = action.payload
//                 state.user = null
//             })
//             .addCase(getUserInfo.fulfilled, (state, action) => {
//                 state.userInfo = action.payload
//             })
//     }
// })




// export const { reset } = authSlice.actions

// export default authSlice.reducer