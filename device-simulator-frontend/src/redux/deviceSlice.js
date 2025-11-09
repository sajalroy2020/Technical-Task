import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeDevices: [],
  devices: [],
  presets: [],
  currentDeviceId: null, 
  lastAction: { type: 'None', id: null },
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    loadInitialData: (state, action) => {
        state.storeDevices = action.payload.storeDevices;
        state.devices = action.payload.devices;
        state.presets = action.payload.presets;
    },

    addPreset: (state, action) => {
        state.presets.push(action.payload);
        state.lastAction = { type: 'Preset', id: action.payload.id };
        
        // Reset devices to original storeDevices after adding preset
        state.devices = [...state.storeDevices];
    },
    
    setCurrentDevice: (state, action) => {
      state.currentDeviceId = action.payload;
      state.lastAction = { type: 'Device', id: action.payload }; 
    },

    updateDeviceSettings: (state, action) => {
      let deviceToUpdate;
      const { deviceId, newSettings } = action.payload;
      if (state.lastAction.type === 'Device') {
        deviceToUpdate = state.devices.find(d => d.id === deviceId);
      }else{
        deviceToUpdate = state.presets.find(d => d.id === deviceId);
      }
      if (deviceToUpdate) {
          deviceToUpdate.settings = {
              ...deviceToUpdate.settings,
              ...newSettings,
          };
      }
    },

    applyPreset: (state, action) => {
      const presetId = action.payload;      
      const preset = state.presets.find(p => p.id === presetId);
      if (!preset) return;        
      
      const deviceToUpdate = state.devices.find(d => d.id === preset.device_id);

      if (deviceToUpdate) {
        deviceToUpdate.settings = {
            ...deviceToUpdate.settings,
            ...deviceToUpdate.settings,
        };

        state.currentDeviceId = presetId;
        state.lastAction = { type: 'Preset', id: presetId };
      }
    },

    resetCurrentDevice: (state) => {
        state.currentDeviceId = null;
        state.lastAction = { type: 'None', id: null };
    },

    updatePreset: (state, action) => {
      const { id, name, settings } = action.payload;
      const presetToUpdate = state.presets.find(p => p.id === id);

      if (presetToUpdate) {
          presetToUpdate.name = name;
          if (settings) {
              presetToUpdate.settings = settings; 
          }
          state.lastAction = { type: 'Preset', id: id };
      }
    },

  },
});

export const { 
    loadInitialData,
    setCurrentDevice, 
    updateDeviceSettings, 
    applyPreset, 
    resetCurrentDevice,
    addPreset,
    updatePreset
} = deviceSlice.actions;

export default deviceSlice.reducer;