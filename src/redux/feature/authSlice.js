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
  Country_List: null,
  UserInformation: null,
  ChildInformation: null,
  GetUserProfile: null,
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
    if (response.data.status == '1') {
      thunkApi.dispatch(loginSuccess(response.data.data));
      params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
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
      console.log(
        '===============Get_Group=====responser================',
        response.data,
      );
      if (response.data.status == '1') {
        // Alert.alert('Success', response.data.message);
        params.navigation.navigate(ScreenNameEnum.STEP_ONE);
      } else {
        Alert.alert('Group Not Found', 'Please Enter Valid Group Code');
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Server', 'Server not response');

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const Get_UserProfile = createAsyncThunk(
  'Get_UserProfile',
  async (params, thunkApi) => {
    console.log(
      '===============Get_UserProfile=====================',
      params.group_code,
    );

    try {
      const response = await API.get('/get_profile', params.data);
      console.log(
        '===============Get_UserProfile=====responser================',
        response.data,
      );
      if (response.data.status == '1') {
        console.log('Get_UserProfile Success', response.data.message);
      } else {
        console.log(
          'Get_UserProfile Not Found',
          'Please Enter Valid Group Code',
        );
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const Get_Country = createAsyncThunk(
  'Get_Country',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get_country');
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

// Add user Info

export const Add_UserInfo = createAsyncThunk(
  'Add_UserInfo',
  async (params, thunkApi) => {
    console.log(
      '===============Add_UserInfo=====================',
      params.data,
    );

    try {
      const formData = new FormData();
      formData.append('first_name', params.data.first_name);
      formData.append('last_name', params.data.last_name);
      formData.append('dob', params.data.dob);
      formData.append('country', params.data.country);
      formData.append('type', params.data.type);
      formData.append('image', params.data.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/user_info', formData, config);

      console.log('=================Add_UserInfo===================');
      console.log(response.data);
      console.log('=============Add_UserInfo api=======================');

      if (response.data.status == '1') {
        params.navigation.navigate(ScreenNameEnum.STEP_FOUR);
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

export const Updated_UserInfo = createAsyncThunk(
  'Updated_UserInfo',
  async (params, thunkApi) => {
    console.log(
      '===============Updated_UserInfo=====================',
      params.data,
    );

    try {
      const formData = new FormData();
      formData.append('email', params.data.email);
      formData.append('password', params.data.password);
      formData.append('user_id', params.data.user_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/update_signup', formData, config);

      console.log('=================update_signup===================');
      console.log(response.data);
      console.log('=============update_signup api=======================');

      if (response.data.status == '1') {
        params.navigation.navigate(ScreenNameEnum.CREATE_CONNECTION);
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

// add child
export const Add_ChildInfo = createAsyncThunk(
  'Add_ChildInfo',
  async (params, thunkApi) => {
    console.log(
      '===============Add_ChildInfo=====================',
      params.data,
    );

    try {
      const formData = new FormData();
      formData.append('first_name', params.data.first_name);
      formData.append('last_name', params.data.last_name);
      formData.append('dob', params.data.dob);
      formData.append('country', params.data.country);
      formData.append('parent_id', params.data.parent_id);
      formData.append('type', params.data.type);
      formData.append('image', params.data.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_child_info', formData, config);

      console.log('=================Add_ChildInfo===================');
      console.log(response.data);
      console.log('=============Add_ChildInfo api=======================');

      if (response.data.status == '1') {
        params.navigation.navigate(ScreenNameEnum.FIRST_TIMECHILD);
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

export const Updated_ChildInfo = createAsyncThunk(
  'Updated_ChildInfo',
  async (params, thunkApi) => {
    console.log(
      '===============Updated_ChildInfo=====================',
      params.data,
    );

    try {
      const formData = new FormData();
      formData.append('email', params.data.email);
      formData.append('password', params.data.password);
      formData.append('user_id', params.data.user_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/update_child_signup', formData, config);

      console.log('=================Updated_ChildInfo===================');
      console.log(response.data);
      console.log('=============Updated_ChildInfo api=======================');

      if (response.data.status == '1') {
        params.navigation.navigate(ScreenNameEnum.NOWITHOUTSCREEN);
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
      Alert.alert('LogOut', response.data.message);
    } else {
      Alert.alert('LogOut', response.data.message);
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

//get Profile
export const get_profile = createAsyncThunk(
  'get_profile',
  async (params, thunkApi) => {
    console.log(
      '===============get_profile=====================',
      params.user_id,
    );

    try {
      const formData = new FormData();
      formData.append('user_id', params.user_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/get_profile', formData, config);
      console.log(
        '===============get_profile=====responser================',
        response.data,
      );
      if (response.data.status == '1') {
        // Alert.alert('Success', response.data.message);
      } else {
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

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
    builder.addCase(get_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.GetUserProfile = action.payload;
    });
    builder.addCase(get_profile.rejected, (state, action) => {
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
    builder.addCase(Add_UserInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Add_UserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.UserInformation = action.payload;
    });
    builder.addCase(Add_UserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(Updated_UserInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Updated_UserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.UserInformation = action.payload;
    });
    builder.addCase(Updated_UserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(Add_ChildInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Add_ChildInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.ChildInformation = action.payload;
    });
    builder.addCase(Add_ChildInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(Updated_ChildInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Updated_ChildInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.ChildInformation = action.payload;
    });
    builder.addCase(Updated_ChildInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {loginSuccess, updateSelectedRole} = AuthSlice.actions;

export default AuthSlice.reducer;
