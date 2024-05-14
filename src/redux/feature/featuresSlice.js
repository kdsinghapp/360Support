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
  childRequest: null,
  Event_list: null,
  
};

export const get_post = createAsyncThunk(
  'get_posts',
  async (params, thunkApi) => {
    try {
      const response = await API.get(`/get_posts?user_id=${params.user_id}`);

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
export const add_event = createAsyncThunk(
  'add_event',
  async (params, thunkApi) => {
    console.log(params);
    console.log('====================================');
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('event_name', params.event_name);
      formData.append('event_date', params.event_date);
      formData.append('event_location', params.event_location);
      formData.append('event_description', params.event_description);
      formData.append('event_time', params.event_time);
      formData.append('group_code', params.group_code);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_event', formData, config);
      console.log('====================================', response.data);
      if (response.data.status == '1') {
        successToast('Add Event Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_event = createAsyncThunk(
  'get_event',
  async (params, thunkApi) => {
    console.log(params);
    console.log('====================================');
    try {
      const response = await API.get(
        `/get_event?user_id=${params.user_id}&group_code=${params.group_code}`,
      );
      console.log('====================================', response.data);

      if (response.data.status == '1') {
        console.log('get Event Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_event .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_post = createAsyncThunk(
  'add_post',
  async (params, thunkApi) => {

    console.log('=================add_post===================',params);
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('title', params.title);
      formData.append('description', params.description);
      formData.append('image', params.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_post', formData, config);
      console.log('=============add_post=======================', response.data);
      if (response.data.status == '1') {
        successToast('Add Post Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event .js:16 ~  ~ error:', error);
errorToast("Network error")
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
    builder.addCase(get_post.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_post.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.get_PostList = action.payload;
    });
    builder.addCase(get_post.rejected, (state, action) => {
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
      state.childRequest = action.payload;
    });
    builder.addCase(send_child_request.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_event.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_event.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_event.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_post.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_post.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_post.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
   
  },
});

export default FeatureSlice.reducer;
