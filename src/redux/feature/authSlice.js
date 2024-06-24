import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {API} from '../Api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../routes/screenName.enum';
import Toast from 'react-native-toast-message';
import {errorToast, successToast} from '../../configs/customToast';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
  selectedRole: null,
  group_code: null,
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

    console.log('===============login=====================', response.data);

    if (response.data.status === '1') {
      // Navigate to the bottom tab or login screen based on child details
      if (response.data?.result.child_details) {
        params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        params.navigation.navigate(ScreenNameEnum.WELCOME_SCREEN);
      }

      // Store user ID in AsyncStorage
      await AsyncStorage.setItem('user_id', response.data?.result.id);

      // Dispatch login success action
      thunkApi.dispatch(loginSuccess(response.data.result));

      // Show success toast
      successToast(response.data.message);
    } else {
      // Show error toast if status is not 1
      errorToast(`${response.data.message}`);
    }

    return response.data.result;
  } catch (error) {
    console.log('Error:', error);
    errorToast('Network error');
    return thunkApi.rejectWithValue(error);
  }
});
export const Get_Group = createAsyncThunk(
  'Get_Group',
  async (params, thunkApi) => {
   

    try {
      const response = await API.get(
        `/get_group_details?group_code=${params.group_code}`,
      );
    
      if (response.data.status == '1') {
        if (!params.profile) {
          params.navigation.navigate(ScreenNameEnum.GROUP_DETAILS);
        } else {
        }
      } else {
        errorToast('Group Not Found');
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);

      if (!params.profile) {
        errorToast(`Server not response`);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const Get_UserProfile = createAsyncThunk(
  'Get_UserProfile',
  async (params, thunkApi) => {

    try {

      console.log('get profile =>>>>>>',params);
      const response = await API.post('/get_profile', params.data);
     
      if (response.data.status == '1') {
        console.log('Get_UserProfile Success', response.data.message);
      } else {
        console.log(
          'Get_UserProfile Not Found',
         
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
        successToast('Otp Send Successfully');
        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN, {
          email: params.data,
        });
      } else {
        errorToast(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:',
        error,
      );
      errorToast('Network error');
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
        successToast('Otp Verify Successfully');

        params.navigation.navigate(ScreenNameEnum.CREATE_NEWPASS, {
          email: params.data.email,
        });
      } else {
        errorToast(response.data.message);
        // params.navigation.navigate(ScreenNameEnum.CREATE_NEWPASS,{email:params.data.email});
      }

      return response.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: AuthSlice.js:16 ~ ResetPasswordEmail ~ error:',
        error,
      );

      errorToast('Network error');
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
        successToast('Password Reset Successfully');

        params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
      } else {
        errorToast('response.data.message');
      }

      return response.data;
    } catch (error) {
      errorToast('Network error');
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
  

    try {
      const formData = new FormData();
      formData.append('first_name', params.data.first_name);
      formData.append('last_name', params.data.last_name);
      formData.append('dob', params.data.dob);
      formData.append('country', params.data.country);
      formData.append('type', params.data.type);
      formData.append('group_code', params.data.group_code);
      formData.append('image', params.data.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/user_info', formData, config);


      if (response.data.status == '1') {
        await AsyncStorage.setItem('user_id', response?.data.result.id);
        params.navigation.navigate(ScreenNameEnum.CONTINUE_USERDETAILS);
      } else {
        errorToast(response.data.message);
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);

      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const Updated_UserInfo = createAsyncThunk(
  'Updated_UserInfo',
  async (params, thunkApi) => {
  

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

  
      if (response.data.status == '1') {
        if (params.selected === 'Coach') {
          params.navigation.navigate(ScreenNameEnum.COACH_STEP1);
        } else if (params.selected === 'Player') {
          params.navigation.navigate(ScreenNameEnum.PLAYER_STEP1);
        } else if (params.selected === 'Parent') {
          params.navigation.navigate(
            ScreenNameEnum.CREATE_OR_REQUESTCONNECTION,
          );
        }
      } else {
        errorToast(response.data.message);
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network error');

      return thunkApi.rejectWithValue(error);
    }
  },
);

// add child
export const Add_ChildInfo = createAsyncThunk(
  'Add_ChildInfo',
  async (params, thunkApi) => {
 

    try {
      const formData = new FormData();
      formData.append('first_name', params.data.first_name);
      formData.append('last_name', params.data.last_name);
      formData.append('dob', params.data.dob);
      formData.append('country', params.data.country);
      formData.append('parent_id', params.data.parent_id);
      formData.append('group_code', params.data.group_code);
      formData.append('type', params.data.type);
      formData.append('image', params.data.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_child_info', formData, config);

     

      if (response.data.status == '1') {
        await AsyncStorage.setItem('child_user_id', response?.data?.result.id);
        if (params.Childprofile) {
          params.navigation.navigate(ScreenNameEnum.CREATECHILDACCOUNT, {
            Childprofile: true,
          });
        } else {
          params.navigation.navigate(ScreenNameEnum.FIRST_TIMECHILD);
        }
      } else {
        errorToast('Network error');
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const Updated_ChildInfo = createAsyncThunk(
  'Updated_ChildInfo',
  async (params, thunkApi) => {
  

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

      if (response.data.status == '1') {
        if (params.Childprofile) {
          params.navigation.navigate(ScreenNameEnum.CHILD_PROFILE);
        } else {
          params.navigation.navigate(ScreenNameEnum.NOWITHOUTSCREEN);
        }
      } else {
        errorToast(response.data.message);
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const log_out = createAsyncThunk('log_out', async (params, thunkApi) => {
  try {
    console.log(' AuthSlice.js:29 ~ logout ~ called:');

    const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you might need
      },
    });

    const data = await response.json();

    console.log(' AuthSlice.js:29 ~ logout ~ response:', data);

    if (data.status == '1') {
      await AsyncStorage.clear();
      successToast(data.message);
      params.navigation.navigate(ScreenNameEnum.LOGIN_OPTION);
    } else {
      errorToast(data.message);
    }

  } catch (error) {
    errorToast('Network error');
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});


//get Profile
export const get_profile = createAsyncThunk(
  'get_profile',
  async (params, thunkApi) => {


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
     
      if (response.data.status == '1') {
        // Alert.alert('Success', response.data.message);
      } else {
      }

      return response.data.result;
    } catch (error) {
      console.log('Error:', error);
     errorToast('Network Error')
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_parent_profile = createAsyncThunk(
  'update_parent_profile',
  async (params, thunkApi) => {

    try {
      const formData = new FormData();
      formData.append('user_id', params.user_id);
      formData.append('first_name', params.first_name);
      formData.append('last_name', params.last_name);
      formData.append('gender', params.gender);
      formData.append('dob', params.dob);
      formData.append('age', params.age);
      formData.append('city', params.city);
      formData.append('mobile', params.mobile);
      formData.append('street_address', params.street_address);
      formData.append('zip_code', params.zip_code);
      formData.append('state', params.state);
      formData.append('country', params.country);
      formData.append('image', params.image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
    
      const response = await API.post('/update_parent_profile', formData, config);


      
      if (response.data.status == '1') {
        successToast('Profile Update Successfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~update_parent_profile:', error);
      errorToast(response.data.message);
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
    updateGroup_code(state, action) {
      state.group_code = action.payload;
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

    builder.addCase(log_out.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(log_out.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
    });
    builder.addCase(log_out.rejected, (state, action) => {
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
    builder.addCase(update_parent_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_parent_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.get_PostList = action.payload;
    });
    builder.addCase(update_parent_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export const {loginSuccess, updateSelectedRole, updateGroup_code} =
  AuthSlice.actions;

export default AuthSlice.reducer;
