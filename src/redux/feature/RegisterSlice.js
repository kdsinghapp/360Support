import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';
import {Alert} from 'react-native';
import ScreenNameEnum from '../../routes/screenName.enum';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
};

// register
export const register = createAsyncThunk(
  'register',
  async (params, thunkApi) => {
    console.log('Register =>>>>>>>>>>', params.data);
    try {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      };
      const response = await API.post('/auth/signup', params.data, config);

      console.log(
        '🚀 ~ file: RegisterSlice. response ~ register ~ response:',
        response.data,
      );

      if (response.data.success) {
        params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
        Alert.alert(
          'Success',
          'User Registered Successfully',
          [
            {
              text: 'Please Login',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Failed',
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
  },
);

const RegisterSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // register cases
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default RegisterSlice.reducer;
