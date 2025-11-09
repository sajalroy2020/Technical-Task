import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { setCurrentDevice, applyPreset, loadInitialData } from '../redux/deviceSlice'; 
import axiosInstance from '../utils/axios';

const PresetItemTypes = {PRESET: 'Preset'};

// Base class definitions for re-use
const baseClasses = "w-full border border-[#364153] rounded-lg px-4 py-2 md:py-3 text-left text-sm font-medium transition-colors flex items-center gap-2";
const activeClasses = "bg-[#646F7F]/80 text-white";
const inactiveClasses = "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white";

// --- DraggableDevice Component (Device List) ---
const DraggableDevice = ({ device, dispatch, lastAction, setIsSidebarOpen }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: device.type, 
    item: { id: device.id, name: device.name, type: device.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [device.id, device.name, device.type]);

  // if the last action was a DEVICE and the IDs match
  const isActive = lastAction.type === 'Device' && lastAction.id === device.id;
  
  const handleDeviceClick = () => {    
    dispatch(setCurrentDevice(device.id));
    setIsSidebarOpen(false);
  };

  return (
    <button
      ref={drag} 
      onClick={handleDeviceClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}
    >
      <span className="text-lg">
        {device.type === 'Light' && <img src='/icons/light.svg' alt='light' />}
        {device.type === 'Fan' && <img src='/icons/fan.svg' alt='fan' />}  
      </span> {device.name}
    </button>
  );
};

// --- Preset Button Component (Presets List) ---
const PresetButton = ({ preset, dispatch, lastAction, setIsSidebarOpen }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: PresetItemTypes.PRESET,
        item: { 
            id: preset.id, 
            name: preset.name,
            type: PresetItemTypes.PRESET
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [preset.id, preset.name]);

    const isActive = lastAction.type === 'Preset' && lastAction.id === preset.id; 
    
    const handlePresetClick = () => {
        dispatch(applyPreset(preset.id));
        setIsSidebarOpen(false);
    };

    return (
        <button 
            ref={drag}
            onClick={handlePresetClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
        >
            <span className="text-lg">
              {preset.type === 'Light' && <img src='/icons/light.svg' alt='light' />}
              {preset.type === 'Fan' && <img src='/icons/fan.svg' alt='fan' />}
            </span> {preset.name}
        </button>
    );
}

// --- Main Sidebar Component ---
export function Sidebar({ devices, presets, dispatch, lastAction, isSidebarOpen, setIsSidebarOpen }) {  

  const [isLoading, setIsLoading] = useState(false);

  // get devices & presets data
  useEffect(() => {
    const fetchDevicesAndPresets = async () => {
      setIsLoading(true);
      
      try {
        const [devicesResponse, presetsResponse] = await Promise.all([
          axiosInstance.get('/devices'),
          axiosInstance.get('/presets')
        ]);

        const storeDevices = devicesResponse.data.data || devicesResponse.data;
        const devicesData = devicesResponse.data.data || devicesResponse.data;
        const presetsData = presetsResponse.data.data || presetsResponse.data;

        dispatch(loadInitialData({
          storeDevices: storeDevices,
          devices: devicesData,
          presets: presetsData,
        }));

      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error details:', error.response?.data || error.message);
        
        dispatch(loadInitialData({
          devices: [],
          presets: [],
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevicesAndPresets();
  }, [dispatch]);
  console.log('Is loading:', isLoading);
  
  return (
    <aside className={`
            w-56 md:w-56 h-screen
            border-r border-[#1E2939] bg-[#101828] 
            p-4 md:p-6 
            overflow-y-auto overflow-x-auto 
            transition-transform duration-300 ease-in-out
            md:static md:translate-x-0 
            fixed top-0 bottom-0 left-0 z-20
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-slate-400">Loading...</div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Devices Section */}
          <div className="mb-4 md:mb-8 shrink-0">
            <h2 className="mb-2 md:mb-4 text-xs font-semibold tracking-wider text-[#F3F4F6]">
              Devices ({devices?.length || 0})
            </h2>
            <div className="space-x-2 space-y-2">
              {devices && devices.length > 0 ? (
                devices.map(device => (
                  <DraggableDevice 
                      key={device.id} 
                      device={device} 
                      dispatch={dispatch} 
                      lastAction={lastAction}
                      setIsSidebarOpen={setIsSidebarOpen}
                  />
                ))
              ) : (
                <div className="w-full border border-[#364153] text-[#E5E7EB]/40 rounded-lg px-4 py-3 text-left text-sm font-medium">
                  No devices available
                </div>
              )}
            </div>
          </div>

          {/* Saved Presets Section */}
          <div className="shrink-0">
            <h2 className="mb-4 text-xs font-semibold tracking-wider text-[#F3F4F6]">
              Saved Presets ({presets?.length || 0})
            </h2>
            {!presets || presets.length === 0 ? (
              <div className="w-full border border-[#364153] text-[#E5E7EB]/40 rounded-lg px-4 py-3 text-left text-sm font-medium">
                Nothing added yet
              </div>
            ) : (
              <div className="space-y-2">
                {presets.map(preset => (
                    <PresetButton 
                        key={preset.id} 
                        preset={preset} 
                        dispatch={dispatch} 
                        lastAction={lastAction}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}