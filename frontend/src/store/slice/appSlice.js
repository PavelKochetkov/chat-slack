import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  showModal: '',
  channelId: '',
  modalChannelName: '',
  isSuccses: false,
  error: null,
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
    setDefaultChannel: (state) => {
      Object.assign(state, {
        currentChannelId: 1,
        currentChannelName: 'general',
      });
    },
    closeModal: (state) => {
      Object.assign(state, {
        showModal: '',
        channelId: '',
        modalChannelName: '',
        error: null,
      });
    },
  },
});

export const {
  changeChannel,
  setChannelModal,
  setDefaultChannel,
  closeModal,
} = appSlice.actions;
export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectIsSuccses = (state) => state.app.isSuccses;
export const selectModalChannelName = (state) => state.app.modalChannelName;
export const selectChannelId = (state) => state.app.channelId;
export const selectShowModal = (state) => state.app.showModal;
export const selectError = (state) => state.app.error;
export default appSlice.reducer;
