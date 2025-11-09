"use client"

import React, { useEffect, useState } from 'react';
import { addPreset, updatePreset } from '../redux/deviceSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios'; 

export function SavePresetModal({ device, onClose, presets, lastAction, setCurrentDevice }) {
    const [presetName, setPresetName] = useState('');
    const [existingPreset, setExistingPreset] = useState(false);
    const dispatch = useDispatch();      
    if (!device) return null;

    const handleSaveClick = async () => {
        try {
            const settingsToSave = { ...device.settings };
            let actionPayload;            
            
            if (existingPreset) {
                actionPayload = {
                    id: existingPreset.id,
                    device_id: existingPreset.device_id,
                    type: existingPreset.type,
                    name: presetName,
                    settings: settingsToSave 
                };
                
                // API call to update preset
                await axiosInstance.post(`/presets/${existingPreset.id}`, actionPayload);

                dispatch(updatePreset(actionPayload));
                toast.success('Preset updated successfully!');
                
            } else {
                actionPayload = {
                    device_id: device.id,
                    name: presetName,
                    type: device.type,
                    settings: settingsToSave, 
                };
                
                // API call to create preset
                let preset = await axiosInstance.post('/presets', actionPayload);                
                
                setCurrentDevice(preset.data.data);
                dispatch(addPreset(preset.data.data));
                toast.success('Preset created successfully!');
            }
            
            onClose();
            
        } catch (error) {
            console.error('Error saving preset:', error);
            
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to save preset. Please try again.');
            }
        }
    };
    // Handle Enter key to trigger save
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSaveClick();
      }
    };

    console.log('existingPreset', existingPreset);
    

    // check presets data exist or not
    useEffect(() => {
        if (!lastAction || !presets) return;

        const existingPresetData = presets.find(
            (p) => lastAction.type === "Preset" && p.id === lastAction.id
        );

        if (existingPresetData) {
            setExistingPreset(existingPresetData);
            setPresetName(existingPresetData.name);
        }
    }, [lastAction, presets]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            {/* Modal Content */}
            <div className="w-full max-w-xl rounded-xl border border-[#364153] bg-[#141D2B] shadow-2xl m-2 md:m-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 md:mb-4 border-b border-[#364153] p-3 md:p-6">
                    <h3 className="text-base md:text-xl font-medium md:font-semibold text-slate-100">Give me a name</h3>
                    <button onClick={onClose} className="text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                {/* Input Field */}
                <div className="p-3 md:p-6">
                    <input
                        type="text"
                        placeholder="Name it"
                        value={presetName}
                        onChange={(e) => setPresetName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full rounded-lg border-0 bg-[#364153] px-2 md:px-4 py-2 md:py-3 text-base text-slate-100 placeholder-slate-500 focus:border-transparent focus:ring-0 outline-none"
                    />
                    <p className="mt-2 text-sm text-slate-400">
                        By adding this effect as a preset you can reuse this anytime.
                    </p>
                </div>
                
                {/* Actions */}
                <div className="flex justify-end space-x-3 px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-4">
                    <button onClick={onClose}
                        className="md:px-4 px-3 cursor-pointer py-1 md:py-2 rounded-lg text-sm md:text-base font-medium bg-[#1E2939] border border-[#364153] text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClick}
                        className={`md:px-4 px-3 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors cursor-pointer bg-[#2B7FFF] text-white hover:bg-blue-700`}
                    >
                        Save Preset
                    </button>
                </div>
            </div>
        </div>
    );
}
