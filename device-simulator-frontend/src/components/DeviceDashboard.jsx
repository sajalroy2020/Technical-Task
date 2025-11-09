import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LightBulb } from './Devices/LightBulb';
import { DropCanvasArea } from './DropCanvasArea';
import { SavePresetModal } from './SavePresetModal';
import { useSelector, useDispatch } from 'react-redux';
import { resetCurrentDevice } from '../redux/deviceSlice';
import { FanVisualization } from './Devices/FanVisualization';
import { FanControlPanel } from './DeviceControlPanel/FanControlPanel';
import { LightControlPanel } from './DeviceControlPanel/LightControlPanel';

export function DeviceDashboard() {
    const dispatch = useDispatch(); 
    const devices = useSelector(state => state.device.devices);
    const presets = useSelector(state => state.device.presets);
    const currentDeviceId = useSelector(state => state.device.currentDeviceId);
    const lastAction = useSelector(state => state.device.lastAction);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isFan = currentDevice?.type === 'Fan';
    const isLight = currentDevice?.type === 'Light';    

    const handleClearCanvasArea = () => {
        dispatch(resetCurrentDevice());
        setCurrentDevice(null);
    };

    const handleSavePresetClick = () => {
        if (currentDevice) {
            setIsModalOpen(true);
        }
    };

    useEffect(() => {        
        if (!lastAction?.type || !currentDeviceId) return;

        const list = lastAction.type === "Device" ? devices : presets;

        const foundItem = list.find(item => item.id === currentDeviceId);
        if(foundItem) setCurrentDevice(foundItem);
    }, [lastAction.type, lastAction.id, currentDeviceId, devices, presets]);    

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col md:flex-row md:h-screen bg-[#030712]">

                {/* Toggle Button for Mobile */}
                <button
                    className="md:hidden p-4 text-white bg-slate-800 border-b border-[#1E2939] z-20 flex justify-between items-center"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <span className="font-semibold text-sm">Menu</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isSidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> // Close icon
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> // Menu icon
                        )}
                    </svg>
                </button>
            
                {/* Sidebar  */}
                <Sidebar 
                    activeDeviceId={currentDeviceId} 
                    devices={devices} 
                    presets={presets} 
                    dispatch={dispatch} 
                    lastAction={lastAction}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="flex-1 flex flex-col min-h-[50vh] md:min-h-0 relative">
                    {/* Header Start */}
                    <header className="bg-[#030712] px-4 md:px-8 pt-4 md:pt-6 flex justify-between items-center">
                        <h1 className="text-base font-semibold text-white">Testing Canvas</h1>
                        {currentDeviceId && 
                            <div className="flex gap-1 sm:gap-2">
                                <button onClick={handleClearCanvasArea} className="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors">
                                    Clear
                                </button>
                                <button
                                onClick={handleSavePresetClick}
                                    disabled={!currentDevice}
                                    className="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Save Preset
                                </button>
                            </div>
                        }
                    </header>
                    {/* Header End */}

                    {/*  Drop Canvas Area Start */}
                    <DropCanvasArea>
                        {isFan && currentDevice && (
                            <div className="w-full max-w-sm h-full max-h-sm flex justify-center pt-0 md:pt-16">
                                <FanVisualization 
                                    isPowerOn={currentDevice.settings.power} 
                                    speed={currentDevice.settings.speed} 
                                />
                            </div>
                        )}
                                
                        {isLight && currentDevice && (
                            <div className="w-full max-w-sm h-full max-h-sm flex justify-center pt-0 md:pt-16">
                                <LightBulb 
                                    isOn={currentDevice.settings.power} 
                                    brightness={currentDevice.settings.brightness} 
                                    color={currentDevice.settings.color} 
                                />
                            </div>
                        )}
                    </DropCanvasArea>
                    {/*  Drop Canvas Area End  */}

                    {/*  Device Settings Area Start */}
                    {isFan && (
                        <FanControlPanel
                            device={currentDevice}
                            dispatch={dispatch}
                        />
                    )}
                    {isLight &&(
                        <LightControlPanel
                            device={currentDevice}
                            dispatch={dispatch}
                            type={lastAction.type}
                        />
                    )}
                    {/*  Device Settings Area End */}

                </main>
            </div>

            {/* Render Modal */}
            {isModalOpen && currentDevice && (
                <SavePresetModal 
                    device={currentDevice}
                    onClose={() => setIsModalOpen(false)}
                    presets={presets}
                    lastAction={lastAction}
                    setCurrentDevice={setCurrentDevice}
                />
            )}
        </div>
    );
}