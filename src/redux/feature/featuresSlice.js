import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../Api';

import { Alert } from 'react-native';
import { errorToast, successToast } from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  get_PostList: [],
  childRequest: null,
  Privacypolicy: null,
  TermsCondition: null,
  Event_list: [],
  Video_list: [],
  Training_list: [],
  Registration_list: [],
  event_details: null,
  registration_form: [],
  clubUsers: [],
  ChatGroupList: [],
  LastGameresult: [],
  teamList: [],
  getIndividualChat: [],
  getEventMembers: [],
  TeamDetails: [],
  getMyChild:[],
  getTeam_by_Member:[],
  GeneralDetails:[],
  notificationsList:[],
  groupMembers:[]


};


export const get_terms_conditions = createAsyncThunk(
  'get_terms_conditions',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get_term_condition',);

      if (response.data.success) {
        console.log('User get_terms_conditions Succesfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ : get_terms_conditions error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get_privacy_policy', );



      if (response.data.success) {
        console.log('User get_privacy_policy Succesfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ : get_privacy_policy error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_post = createAsyncThunk(
  'get_posts',
  async (params, thunkApi) => {
    try {

      console.log('=>>>get_posts>>>>>>>>>>>>', params);
      const response = await API.get(
        `/get_posts?user_id=${params.user_id}&group_code=${params.group_code}&type=${params.type}`,
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
export const get_registration_category = createAsyncThunk(
  'get_registration_category',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_registration_category?group_code=${params.group_code}`,
      );

      if (response.data.status == '1') {
        console.log('User get_registration_category Succesfuly');
      }
      return response.data.result;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_registration_category .js:16 ~  ~ error:',
        error,
      );

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
      else{
        errorToast(response.data.message);
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
export const delete_training = createAsyncThunk(
  'delete_training',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/delete_training?training_id=${params.training_id}`,
      );

      console.log(
        '==============params.post_id======================',
        params.training_id,
      );
      if (response.data.status == '1') {
        successToast('Training Deleted Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: delete_training .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const delete_video = createAsyncThunk(
  'delete_video',
  async (params, thunkApi) => {
    console.log('================params.video_id====================');
    console.log(params.video_id);

    try {
      const response = await API.get(
        `/delete_video?video_id=${params.video_id}`,
      );
      console.log('====================================', response.data.status);
      if (response.data.status == '1') {
        successToast('Video Deleted Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: video_Delete .js:16 ~  ~ error:', error);

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
      formData.append('type', params.type);
      params.members.forEach((member, index) => {
        formData.append(`members[${index}]`, member);
      });

      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      };

      console.log('FormData:', formData);

      const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/add_event', config);
      console.log('members=>>>>>>>>', response);
      const data = await response.json();

      if (data.status === '1') {
        successToast('Add Event Successfully');
      }

      return data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Failed to add event');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const update_password = createAsyncThunk(
  'update_password',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();


      formData.append('old_password', params.old_password);
      formData.append('password', params.password);
      formData.append('user_id', params.user_id);

      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      };

      console.log('FormData:', formData);

      const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/update_password', config);
  
      const data = await response.json();
   console.log('update_password=>>>>>>>>', data);
      if (data.status === '1') {
        successToast('Password Change Successfully');
      }
      else{
        errorToast(data.message);
      }

      return data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Password Chang Failed');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const add_team_member = createAsyncThunk(
  'add_team_member',
  async (params, thunkApi) => {
    try {


      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: params.data,
      };



      const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/add_team_member', config);
      const data = await response.json();

      if (data.status === '1') {
        console.log('add_team_member=>>>>>>>>', response);

      }

      return data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Failed to add event');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const delete_team_member = createAsyncThunk(
  'delete_team_member',
  async (params, thunkApi) => {
    try {
console.log('delete_team_member=>>>>>>>>>>>',params.data);

      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: params.data,
      };



      const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/delete_team_member', config);
      const data = await response.json();

      if (data.status === '1') {
        console.log('delete_team_member=>>>>>>>>', response);
        successToast('Team Member Remove Successfuly')

      }

      return data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Failed to add event');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const update_details = createAsyncThunk(
  'update_details',
  async (params, thunkApi) => {
    try {


      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: params.data,
      };



      const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/update_details', config);
      const data = await response.json();

      if (data.status === '1') {
        console.log('update_details=>>>>>>>>', response);
        //successToast('Team Member Remove Successfuly')

      }

      return data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Failed to update_details');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const get_team_details = createAsyncThunk(
  'get_team_details',
  async (params, thunkApi) => {
    try {

console.log('=>?.>>get_team_details>>>>>>>',params.data);
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: params.data,
      };



      const response = await fetch('https://server-php-8-1.technorizen.com/Sport/api/get_team_details', config);
      const data = await response.json();

      if (data.status === '1') {
        console.log('get_team_details=>>>>>>>>', response);

      }

      return data.result;
    } catch (error) {
      console.log('Error:', error);
      errorToast('Failed to add event');
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const add_training = createAsyncThunk(
  'add_training',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('name', params.name);
      formData.append('training_type', params.training_type);
      formData.append('training_date', params.training_date);
      formData.append('training_time', params.training_time);
      formData.append('training_duration', params.training_duration);
      formData.append('training_location', params.training_location);
      formData.append('training_description', params.training_description);
      formData.append('group_code', params.group_code);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_training', formData, config);

      if (response.data.status == '1') {
        successToast('Add training Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_training .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_Registration_form = createAsyncThunk(
  'add_Registration_form',
  async (params, thunkApi) => {
    try {
      console.log(
        '==============add_Registration_form========params==============',
      );
      console.log(params);
      console.log('====================================');

      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append(
        'registration_category_id',
        params.registration_category_id,
      );
      formData.append('first_name', params.firstName);
      formData.append('last_name', params.lastName);
      formData.append('identity_card', params.identityCardNumber);
      formData.append('gender', params.gender);
      formData.append('address', params.address);
      formData.append('city', params.city);
      formData.append('postal_code', params.postalCode);
      formData.append('mobile', params.mobile);
      formData.append('"dob"', params.dob);
      formData.append('school', params.school);
      formData.append('authorize', params.authorize);
      formData.append(
        'health_Insurance_card_number',
        params.healthInsuranceCardNumber,
      );
      formData.append('bank_account_number', params.bankAccountNumber);
      formData.append('legal_guardian_id', params.legalGuardianId);
      formData.append('legal_guardian_mobile', params.legalGuardianMobile);
      formData.append('legal_guardian_email', params.legalGuardianEmail);
      formData.append('group_code', params.group_code);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post(
        '/add_registration_form',
        formData,
        config,
      );

      if (response.data.status == '1') {
        successToast('Your Registration Request Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_Registration_form .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_training = createAsyncThunk(
  'update_training',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('training_id', params.training_id);
      formData.append('name', params.name);
      formData.append('training_type', params.training_type);
      formData.append('training_date', params.training_date);
      formData.append('training_time', params.training_time);
      formData.append('training_duration', params.training_duration);
      formData.append('training_location', params.training_location);
      formData.append('training_description', params.training_description);
      formData.append('group_code', params.group_code);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/update_training', formData, config);

      if (response.data.status == '1') {
        successToast('Update Training Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: update_training .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_event = createAsyncThunk(
  'update_event',
  async (params, thunkApi) => {
    try {

      console.log('==============update_event======================');
      console.log(params.data);


      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/update_event', params.data, config);

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

      console.log('=>>>>get_event>>>>>>>>>', params);
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
export const get_registration_form = createAsyncThunk(
  'get_registration_form',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_registration_form?group_code=${params.group_code}&user_id=${params.user_id}`,
      );

      if (response.data.status == '1') {
        console.log('get registration_form Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_registration_form .js:16 ~  ~ error:', error);

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
        console.log('get get_event_details Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_event_details .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_training = createAsyncThunk(
  'get_training',
  async (params, thunkApi) => {
    try {
      const response = await API.get(
        `/get_training?user_id=${params.user_id}&group_code=${params.group_code}&type=${params.type}`,
      );

      if (response.data.status == '1') {
        console.log('get Training Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_training .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_club_users = createAsyncThunk(
  'get_club_users',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('group_code', params.group_code);
      const response = await API.post('/get_club_users', data, config);

      if (response.data.status == '1') {
        console.log('get get_club_users Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_club_users .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_chat_groups_by_code = createAsyncThunk(
  'get_chat_groups_by_code',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('user_id', params.user_id);
      const response = await API.post('/get_chat_groups_by_code', data, config);
      console.log(
        '==============get_chat_groups_by_code======================',
      );
      console.log(response.data);
      console.log('====================================');
      if (response.data.status == '1') {
        console.log('get get_chat_groups_by_code Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_chat_groups_by_code .js:16 ~  ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_game_result = createAsyncThunk(
  'get_game_result',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('group_code', params.Group_code);
      const response = await API.post('/get_game_result', data, config);

      if (response.data.status == '1') {
        console.log('get get_game_result Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_game_result .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_team_list = createAsyncThunk(
  'get_team_list',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('group_code', params.Group_code);
      const response = await API.post('/get_team_list', data, config);
      console.log('==============get_team_list======================');
      console.log(response.data);
      console.log('====================================');
      if (response.data.status == '1') {
        console.log('get get_team_list Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_team_list .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_team_by_member_id = createAsyncThunk(
  'get_team_by_member_id',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('user_id', params.user_id);
      const response = await API.post('/get_team_by_member_id', data, config);
      console.log('==============get_team_by_member_id======================');
      console.log(response.data);
      console.log('====================================');
      if (response.data.status == '1') {
        console.log('get get_team_by_member_id Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_team_by_member_id .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_event_by_member_id = createAsyncThunk(
  'get_event_by_member_id',
  async (params, thunkApi) => {
    try {
      console.log('==============get_event_by_member_id======================',params);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('user_id', params.user_id);
      const response = await API.post('/get_event_by_member_id', data, config);
    
      console.log(response.data);
      console.log('====================================');
      if (response.data.status == '1') {
        console.log('get get_event_by_member_id Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_event_by_member_id .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const report_bug = createAsyncThunk(
  'report_bug',
  async (params, thunkApi) => {
    try {
      console.log('==============report_bug======================',params);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('user_id', params.user_id);
      data.append('message', params.message);
      const response = await API.post('/report_bug', data, config);

      console.log('====================================',);

      if (response.data.status == '1') {
   successToast('Your Issue Sent Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('report_bug .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_event_members = createAsyncThunk(
  'get_event_members',
  async (params, thunkApi) => {
    try {
      console.log('==============get_event_members======================', params);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('event_id', params.event_id);
      const response = await API.post('/get_event_members', data, config);
      console.log('==============get_event_members======================', response.data);


      if (response.data.status == '1') {
        console.log('get get_event_members Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_event_members .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_my_child = createAsyncThunk(
  'get_my_child',
  async (params, thunkApi) => {
    try {
      console.log('==============get_my_child======================', params);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();
      data.append('user_id', params.user_id);
      const response = await API.post('/get_my_child', data, config);
      console.log('==============get_my_child======================', response.data);


      if (response.data.status == '1') {
        console.log('get get_my_child Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_my_child .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_event_memeber_data = createAsyncThunk(
  'update_event_memeber_data',
  async (params, thunkApi) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      let data = new FormData();

      data.append('member_id', params.member_id);
      data.append('attendence', params.attendence);
      console.log('==============update_event_memeber_data======================', data);

      const response = await API.post('/update_event_memeber_data', data, config);
      console.log('==============update_event_memeber_data======================', response.data);


      if (response.data.status == '1') {
        console.log('get update_event_memeber_data Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: update_event_memeber_data .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const create_chat_group = createAsyncThunk(
  'create_chat_group',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('chat_group_name', params.name);
      data.append('user_id', params.user_id);
      data.append('group_code', params.group_code);
      data.append('firebase_group_id', params.firebase_group_id);
      params.selectedMembers.forEach((member, index) => {
        data.append(`members[${index}]`, JSON.stringify(member));
      });
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };
      console.log(
        '===============create_chat_group=====================',
        data.data,
      );

      const response = await API.post('/create_chat_group', data, config);


      if (response.data.result) {
        successToast('Group Create Successfully');
      } else {
        errorToast('Group Create faild');
      }
      return response.data;
    } catch (error) {
      console.log('🚀 ~ file: create_chat_group .js:16 ~  ~ error:', error);

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
export const add_chat_user = createAsyncThunk(
  'add_chat_user',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('reciver_id', params.reciver_id);
      formData.append('firebase_chat_id', params.firebase_chat_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_chat_user', formData, config);

      if (response.data.status == '1') {
        console.log('add_chat_user  Successfully');
        params.navigation.navigate(ScreenNameEnum.CHAT_CONTACT_SCREEN)
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_chat_user .js:16 ~  ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_event_memeber = createAsyncThunk(
  'add_event_memeber',
  async (params, thunkApi) => {
    console.log('add_event_memeber=<>>>>>>>>>>>', params);
    try {
      const formData = new FormData();

      formData.append('event_id', params.event_id);
      formData.append('user_id', params.user_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/add_event_memeber', formData, config);
      console.log('add_event_memeber=<>>>>>>>>>>>', response.data);
      if (response.data.status == '1') {
        successToast(response.data.message)

      }
      else {
        errorToast(response.data.message)
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event_memeber .js:16 ~  ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const update_post = createAsyncThunk(
  'update_post',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();

      formData.append('user_id', params.user_id);
      formData.append('title', params.title);
      formData.append('description', params.description);
      formData.append('group_code', params.group_code);
      formData.append('post_id', params.post_id);
      formData.append('image', params.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post('/update_posts', formData, config);

      if (response.data.status == '1') {
        successToast('Post Update Successfully');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event .js:16 ~  ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_like_unlike_posts = createAsyncThunk(
  'add_like_unlike_posts',
  async (params, thunkApi) => {
    try {
      const formData = new FormData();

      console.log('==============Post Like ======================', params);
      formData.append('user_id', params.user_id);
      formData.append('post_id', params.post_id);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await API.post(
        '/add_like_unlike_posts',
        formData,
        config,
      );

      if (response.data.status == '1') {
        //successToast('Post Update Successfully');
        console.log('==============Post Like ======================');
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_event .js:16 ~  ~ error:', error);
      //   errorToast('Network error');
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
        `/get_video?user_id=${params.user_id}&group_code=${params.group_code}&type=${params.type}`,
      );

      if (response.data.status == '1') {
        console.log('get get_video Successfully', params.type);
      }
      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_video .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_individual_chat = createAsyncThunk(
  'get_individual_chat',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('user_id', params.user_id);
      const response = await API.post(`/get_chat_user`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_individual_chat .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_notifications = createAsyncThunk(
  'get_notifications',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('group_code', params.group_code);
      const response = await API.post(`/get-notifications`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_individual_chat .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_group_member = createAsyncThunk(
  'add_group_member',
  async (params, thunkApi) => {
    try {
      
      const response = await API.post(`/add_group_member`, params.data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: add_group_member .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_group_members = createAsyncThunk(
  'get_group_members',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('group_id', params.group_id);
      const response = await API.post(`/get_group_members`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_group_members .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const delete_group_members = createAsyncThunk(
  'delete_group_members',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('group_id', params.group_id);
      data.append('user_id', params.user_id);
      const response = await API.post(`/delete_group_members`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data.result;
    } catch (error) {
      console.log('🚀 ~ file: get_individual_chat .js:16 ~  ~ error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_general_details = createAsyncThunk(
  'get_general_details',
  async (params, thunkApi) => {
    try {
     

      const response = await API.get(`/get-general-details`, null, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      return response.data.result;
    } catch (error) {
      console.log('get_general_details .js:16 ~  ~ error:', error);

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
    builder.addCase(delete_group_members.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_group_members.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
   
    });
    builder.addCase(delete_group_members.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_group_members.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_group_members.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.groupMembers = action.payload;
    });
    builder.addCase(get_group_members.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_group_member.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_group_member.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
     
    });
    builder.addCase(add_group_member.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_notifications.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_notifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.notificationsList = action.payload;
    });
    builder.addCase(get_notifications.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_general_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_general_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.GeneralDetails = action.payload;
    });
    builder.addCase(get_general_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_team_by_member_id.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_team_by_member_id.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getTeam_by_Member = action.payload;
    });
    builder.addCase(get_team_by_member_id.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_event_by_member_id.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_event_by_member_id.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Event_list = action.payload;
    });
    builder.addCase(get_event_by_member_id.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.Event_list = []
    });
    builder.addCase(get_my_child.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_my_child.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getMyChild = action.payload;
    });
    builder.addCase(get_my_child.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_password.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_password.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(update_password.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_team_member.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_team_member.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
    });
    builder.addCase(delete_team_member.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      
    });
    builder.addCase(update_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_team_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_team_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TeamDetails = action.payload;
    });
    builder.addCase(get_team_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_team_member.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(report_bug.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(report_bug.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(report_bug.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_team_member.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(add_team_member.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_event_memeber.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_event_memeber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(add_event_memeber.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_event_memeber_data.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_event_memeber_data.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Privacypolicy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_terms_conditions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_terms_conditions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TermsCondition = action.payload;
    });
    builder.addCase(get_terms_conditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_event_memeber_data.rejected, (state, action) => {
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
    builder.addCase(get_individual_chat.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_individual_chat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getIndividualChat = action.payload;
    });
    builder.addCase(get_individual_chat.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.getIndividualChat = []
    });
    builder.addCase(get_training.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_chat_groups_by_code.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ChatGroupList = action.payload;
    });
    builder.addCase(get_chat_groups_by_code.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_chat_groups_by_code.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_team_list.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.teamList = action.payload;
    });
    builder.addCase(get_team_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_team_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_game_result.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.LastGameresult = action.payload;
    });
    builder.addCase(get_game_result.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_game_result.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_training.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Training_list = action.payload;
    });
    builder.addCase(get_training.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_registration_form.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_registration_form.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.registration_form = action.payload;
    });
    builder.addCase(get_registration_form.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_Registration_form.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_Registration_form.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      //state.registration_form = action.payload;
    });
    builder.addCase(add_Registration_form.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_chat_user.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_chat_user.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      //state.registration_form = action.payload;
    });
    builder.addCase(add_chat_user.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_event_members.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_event_members.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getEventMembers = action.payload;
    });
    builder.addCase(get_event_members.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_event_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_event_details.fulfilled

      , (state, action) => {
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
    builder.addCase(get_club_users.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_club_users.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.clubUsers = action.payload;
    });
    builder.addCase(get_club_users.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_registration_category.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_registration_category.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Registration_list = action.payload;
    });
    builder.addCase(get_registration_category.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(create_chat_group.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(create_chat_group.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(create_chat_group.rejected, (state, action) => {
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
    builder.addCase(add_training.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_training.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_training.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_training.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_training.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_training.rejected, (state, action) => {
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
    builder.addCase(update_post.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_post.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_post.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_like_unlike_posts.pending, state => {
      //state.isLoading = true;
    });
    builder.addCase(add_like_unlike_posts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(add_like_unlike_posts.rejected, (state, action) => {
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
    builder.addCase(delete_training.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_training.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(delete_training.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_video.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_video.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(delete_video.rejected, (state, action) => {
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
