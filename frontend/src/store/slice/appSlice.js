import { createSlice } from '@reduxjs/toolkit';
import channelsApi from '../../api/channelsApi';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  showModal: '',
  channelId: '',
  modalChannelName: '',
  isSuccses: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, { payload }) => {
      Object.assign(state, {
        currentChannelId: payload.id,
        currentChannelName: payload.name,
      });
    },
    setChannelModal: (state, { payload }) => {
      Object.assign(state, {
        showModal: payload.modalName,
        channelId: payload.id,
        modalChannelName: payload.name,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(channelsApi.endpoints.addChannel.matchPending, (state) => {
      Object.assign(state, {
        ...initialState,
        isSuccses: false,
      });
    });
    builder.addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
      Object.assign(state, {
        ...initialState,
        currentChannelId: payload.id,
        currentChannelName: payload.name,
        isSuccses: true,
      });
    });
    builder.addMatcher(channelsApi.endpoints.addChannel.matchRejected, (state) => {
      Object.assign(state, {
        ...initialState,
        isSuccses: false,
      });
    });
  },
});

export const { changeChannel, setChannelModal } = appSlice.actions;
export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectIsSuccses = (state) => state.app.isSuccses;
export const selectModalChannelName = (state) => state.app.modalChannelName;
export const selectChannelId = (state) => state.app.channelId;
export const selectShowModal = (state) => state.app.showModal;
export default appSlice.reducer;
