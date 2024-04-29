import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { API } from '../Api';
import { Alert } from 'react-native';
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
};

export const login = createAsyncThunk('login', async (params, thunkApi) => {
  console.log('===============login=====================');
  console.log(params.data);

  try {
    const config = {
      headers: {
        
        Accept:'application/json'
      }
    };
    const response = await API.post('/auth/login', params.data,config);


    if (response.data.success) {
      thunkApi.dispatch(loginSuccess(response.data.data));
      params.navigation.navigate(ScreenNameEnum.ASK_LOCATION);
      Alert.alert(
        'Success',
        response.data.message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Failed',
        response.data.message,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }

    return response.data.data;
  } catch (error) {
    console.log('Error:', error);
    Alert.alert(
      'Network error',
      'Server not responding. Please try again later.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
    return thunkApi.rejectWithValue(error);
  }
});
export const ResetPasswordEmail = createAsyncThunk('ResetPasswordEmail', async (params, thunkApi) => {
  console.log('🚀 ~ file: AuthSlice.js:12 ~ login ~ params:', params);

  try {
    const response = await API.post('/password_reset', params.data);

    console.log(
      '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ response:',
      response.data,
    );
    
    if (response.data.status) {
      Alert.alert(
        'Success',
        'Otp Send Successfully',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
      );
      params.navigation.navigate('CheckMailOtp',{userId:response.data.user_id});
    }
    else
    {
      Alert.alert(
        'Failed',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
      );
    }

    return response.data;
  } catch (error) {
    console.log('🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:', error);
    Alert.alert(
      'Network error',
      'server not responding please try later',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
    return thunkApi.rejectWithValue(error);
    
  }
});
export const validOtp = createAsyncThunk('validOtp', async (params, thunkApi) => {
  console.log('🚀 ~ file: AuthSlice.js:12 ~ validOtp ~ params:', params);

  try {
    const response = await API.post('/check_otp', params.data);

    console.log(
      '🚀 ~ file: AuthSlice.js:16 ~ validOtp ~ response:',
      response.data,
    );
    
    
    if (response.data.status) {
      Alert.alert(
        'Success',
        'Otp Verify Successfully',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
      );
      
      params.navigation.navigate('CreatePassword',{user:response.data.user_data});
    }
    else
    {
      Alert.alert(
        'Failed',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
      );
    }

    return response.data;
  } catch (error) {
    console.log('🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:', error);
   
    Alert.alert(
      'Network error',
      'server not responding please try later',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
    return thunkApi.rejectWithValue(error);
  }
});
export const CreateNewPassword = createAsyncThunk('CreateNewPassword', async (params, thunkApi) => {
  console.log('🚀 ~ file: AuthSlice.js:12 ~ CreatePassword ~ params:', params);

  try {
    const response = await API.post('/create_new_password', params.data);

    console.log(
      '🚀 ~ file: AuthSlice.js:16 ~ CreatePassword ~ response:',
      response.data,
    );
    
    
    if (response.data.status) {
      Alert.alert(
        'Success',
        'Password Reset Successfully',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
      );
      
      params.navigation.navigate('Login',);
    }
    else
    {
      Alert.alert(
        'Failed',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
      );
    }

    return response.data;
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
      { cancelable: false }
    );
    console.log('🚀 ~ file: AuthSlice.js:16 ~ CreatePassword ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('logout', async (params, thunkApi) => {
  try {
    const response = await API.post('/log_out', params.data ,{
      headers: {
        Authorization: `Bearer ${params.authToken}`,
      },
    },);

    console.log(
      '🚀 ~ file: AuthSlice.js:29 ~ logout ~ response:',
      response.data,
    );

    
    if (response.data.status){
      Alert.alert(
        'LogOut',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () =>  {
              AsyncStorage.clear()
            } 
          }
        ],
        { cancelable: false }
      );
    }
    else {
      Alert.alert(
        'LogOut',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed') 
          }
        ],
        { cancelable: false }
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
      { cancelable: false }
    );
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
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
  },


});

export const { loginSuccess ,updateSelectedRole } = AuthSlice.actions;

export default AuthSlice.reducer;
