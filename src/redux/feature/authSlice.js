import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {API} from '../Api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../routes/screenName.enum';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
  selectedRole: null,
  Group_Details: null,
  Country_List:null
};

export const login = createAsyncThunk('login', async (params, thunkApi) => {
  console.log('===============login=====================', params.data);

  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await API.post('/login', params.data, config);

    console.log('=================response.data ===================');
    console.log(response.data);
    console.log('=============Login api=======================');
    if (response.data.status) {
      thunkApi.dispatch(loginSuccess(response.data.data));
      params.navigation.navigate(ScreenNameEnum.WELCOME_SCREEN);
      Alert.alert('Success', response.data.message);
    } else {
      Alert.alert('Failed', response.data.message);
    }

    return response.data.result;
  } catch (error) {
    console.log('Error:', error);
    Alert.alert(
      'Network error',
      'Server not responding. Please try again later.',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
    return thunkApi.rejectWithValue(error);
  }
});
export const Get_Group = createAsyncThunk(
  'Get_Group',
  async (params, thunkApi) => {
    console.log(
      '===============Get_Group=====================',
      params.group_code,
    );

    try {
      const response = await API.get(
        `/get_group_details?group_code=${params.group_code}`,
      );

      if (response.data.status == '1') {
        // Alert.alert('Success', response.data.message);
        params.navigation.navigate(ScreenNameEnum.STEP_ONE);
      } else {
        Alert.alert('Failed', response.data.message);
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      Alert.alert(
        'Network error',
        'Server not responding. Please try again later.',
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const Get_Country = createAsyncThunk(
  'Get_Country',
  async (params, thunkApi) => {
   

    try {
      const response = await API.get(
       '/get_country',
      );
console.log('==============Get_Country======================');

      if (response.data.status == '1') {
        console.log('Success:Get_Country');
      } else {
        Alert.alert('Failed', response.data.message);
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const ResetPasswordEmail = createAsyncThunk(
  'ResetPasswordEmail',
  async (params, thunkApi) => {
    console.log(
      '🚀 ~ file: AuthSlice.js:12 ~ ResetPasswordEmail ~ params:',
      params,
    );

    try {
      const response = await API.post('/resend_otp', params.data);

      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ response:',
        response.data,
      );

      if (response.data.status == '1') {
        Alert.alert('Success', 'Otp Send Successfully');
        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN, {
          email: params.data,
        });
      } else {
        Alert.alert('Failed', response.data.message);
      }

      return response.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:',
        error,
      );
      Alert.alert(
        'Network error',
        'server not responding please try later',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const validOtp = createAsyncThunk(
  'validOtp',
  async (params, thunkApi) => {
    try {
      const response = await API.post('/check_otp', params.data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to FormData
        },
      });

      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ validOtp ~ response:',
        response.data,
      );

      if (response.data.status == '1') {
        Alert.alert('Success', 'Otp Verify Successfully');

        params.navigation.navigate(ScreenNameEnum.CREATE_NEWPASS, {
          email: params.data.email,
        });
      } else {
        Alert.alert('Failed', response.data.message);
        // params.navigation.navigate(ScreenNameEnum.CREATE_NEWPASS,{email:params.data.email});
      }

      return response.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:',
        error,
      );

      Alert.alert('Network error', 'server not responding please try later');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const CreateNewPassword = createAsyncThunk(
  'CreateNewPassword',
  async (params, thunkApi) => {
    console.log(
      '🚀 ~ file: AuthSlice.js:12 ~ CreatePassword ~ params:',
      params,
    );

    try {
      const response = await API.post('/reset_password', params.data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to FormData
        },
      });

      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ CreatePassword ~ response:',
        response.data,
      );

      if (response.data.status) {
        Alert.alert('Success', 'Password Reset Successfully');

        params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
      } else {
        Alert.alert('Failed', response.data.message);
      }

      return response.data;
    } catch (error) {
      Alert.alert('Network error', 'server not responding please try later');
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ CreatePassword ~ error:',
        error,
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('logout', async (params, thunkApi) => {
  try {
    const response = await API.post('/log_out', params.data, {
      headers: {
        Authorization: `Bearer ${params.authToken}`,
      },
    });

    console.log(
      '🚀 ~ file: AuthSlice.js:29 ~ logout ~ response:',
      response.data,
    );

    if (response.data.status) {
      Alert.alert(
        'LogOut',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => {
              AsyncStorage.clear();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'LogOut',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    }

    params.navigation.navigate('Login');
  } catch (error) {
    Alert.alert(
      'Network error',
      'server not responding please try later',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});
// signup
export const signup = createAsyncThunk('signup', async (params, thunkApi) => {
  console.log('Register =>>>>>>>>>>', params.data);
  try {
    const response = await API.post('/signup', params.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(
      '🚀 ~ file: RegisterSlice. response ~ register ~ response:',
      response.data,
    );

    if (response.data.success) {
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
      Alert.alert('Success', 'User Registered Successfully');
    } else {
      Alert.alert('Failed', response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log('🚀 ~ file: RegisterSlice.js:16 ~ register ~ error:', error);
    Alert.alert(
      'Network error',
      'server not responding please try later',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );

    return thunkApi.rejectWithValue(error);
  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    },
    updateSelectedRole(state, action) {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(signup.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = true;
    });
    builder.addCase(ResetPasswordEmail.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(ResetPasswordEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(ResetPasswordEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(validOtp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(validOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(validOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(CreateNewPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(CreateNewPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(CreateNewPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(Get_Group.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Get_Group.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.Group_Details = action.payload;
    });
    builder.addCase(Get_Group.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(Get_Country.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Get_Country.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.Country_List = action.payload;
    });
    builder.addCase(Get_Country.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {loginSuccess, updateSelectedRole} = AuthSlice.actions;

export default AuthSlice.reducer;
