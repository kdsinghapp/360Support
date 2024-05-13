import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';

import {Alert} from 'react-native';
import {errorToast, successToast} from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  get_PostList: null,
  childRequest:null
};

export const get_posts = createAsyncThunk(
  'get_posts',
  async (params, thunkApi) => {
    try {
      const response = await API.get(`/get_posts?user_id=${params.id}`);

      if (response.data.status == '1') {
        console.log('User get_posts Succesfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_posts .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const send_child_request = createAsyncThunk(
  'send_child_request',
  async (params, thunkApi) => {

    console.log('====================================');
    console.log(params.data);
    console.log('====================================');
    try {
      const formData = new FormData();
      formData.append('email', params.data.email);
      formData.append('parent_id', params.data.parent_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/send_child_request', formData, config);
   
      if (response.data.status == '1') {
        successToast('User Request Successfully');
        params.navigation.navigate(ScreenNameEnum.REQUESTSENTSETP2);
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_posts .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);


const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // DashboardSlice cases
    builder.addCase(get_posts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_posts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.get_PostList = action.payload;
    });
    builder.addCase(get_posts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(send_child_request.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(send_child_request.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.childRequest=action.payload
     
    });
    builder.addCase(send_child_request.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

 

  },
});

export default FeatureSlice.reducer;
