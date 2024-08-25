import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  showModal: '',
  channelId: '',
  modalChannelName: '',
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
});

export const { changeChannel, setChannelModal } = appSlice.actions;
export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectModalChannelName = (state) => state.app.modalChannelName;
export const selectChannelId = (state) => state.app.channelId;
export const selectShowModal = (state) => state.app.showModal;
export default appSlice.reducer;
