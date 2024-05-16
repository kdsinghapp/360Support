import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';

import {Alert} from 'react-native';
import {errorToast, successToast} from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  get_PostList: [],
  childRequest: null,
  Event_list: [],
  Video_list: [],
  event_details: null,
};

export const get_post = createAsyncThunk(
  'get_posts',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_posts?user_id=${params.user_id}&group_code=${params.group_code}`,
      );

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
export const delete_posts = createAsyncThunk(
  'delete_posts',
  async (params, thunkApi) => {
    try {
      const response = await API.get(`/delete_posts?post_id=${params.post_id}`);

      if (response.data.status == '1') {
        successToast('Post Deleted Successfully');
        params.navigation.navigate(ScreenNameEnum.coachWall);
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: delete_posts .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const delete_event = createAsyncThunk(
  'delete_event',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/delete_event?event_id=${params.event_id}`,
      );

      if (response.data.status == '1') {
        successToast('Event Deleted Successfully');
        params.navigation.navigate(ScreenNameEnum.cocheEvent);
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: delete_posts .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_event = createAsyncThunk(
  'add_event',
  async (params, thunkApi) => {
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
export const update_event = createAsyncThunk(
  'update_event',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();
      console.log('==============update_event======================');
      console.log(params);

      formData.append('event_id', params.event_id);
      formData.append('event_name', params.event_name);
      formData.append('event_date', params.event_date);
      formData.append('event_time', params.event_time);
      formData.append('event_location', params.event_location);
      formData.append('event_description', params.event_description);
      formData.append('group_code', params.group_code);


      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/update_event', formData, config);

      if (response.data.status == '1') {
        successToast('Update Event Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: update_event .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_event = createAsyncThunk(
  'get_event',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_event?user_id=${params.user_id}&group_code=${params.group_code}&type=${params.type}`,
      );

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
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('title', params.title);
      formData.append('description', params.description);
      formData.append('image', params.image);
      formData.append('group_code', params.group_code);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_post', formData, config);

      if (response.data.status == '1') {
        successToast('Add Post Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event .js:16 ~  ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_video = createAsyncThunk(
  'add_video',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('title', params.title);
      formData.append('description', params.description);
      formData.append('video_url', params.video_url);
      formData.append('group_code', params.group_code);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_video', formData, config);

      if (response.data.status == '1') {
        successToast('Add Video Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event .js:16 ~  ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_video = createAsyncThunk(
  'get_video',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_video?user_id=${params.user_id}&group_code=${params.group_code}`,
      );

      if (response.data.status == '1') {
        console.log('get get_video Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_video .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_event_details = createAsyncThunk(
  'get_event_details',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_event_details?event_id=${params.event_id}`,
      );

      if (response.data.status == '1') {
        console.log('get Event detials Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_event_details .js:16 ~  ~ error:', error);

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
    builder.addCase(get_event.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_event.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Event_list = action.payload;
    });
    builder.addCase(get_event.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_event_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_event_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.event_details = action.payload;
    });
    builder.addCase(get_event_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_video.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_video.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Video_list = action.payload;
    });
    builder.addCase(get_video.rejected, (state, action) => {
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
    builder.addCase(update_event.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_event.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_event.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_posts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_posts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(delete_posts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_event.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_event.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(delete_event.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_video.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_video.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_video.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FeatureSlice.reducer;
