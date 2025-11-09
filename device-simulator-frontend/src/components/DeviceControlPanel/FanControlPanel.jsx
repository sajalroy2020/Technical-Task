import { updateDeviceSettings } from "../../redux/deviceSlice";

export function FanControlPanel({ device, dispatch, }) {
  const { id, settings } = device;
  const { power, speed } = settings;  

  const handlePowerToggle = () => {
    dispatch(updateDeviceSettings({
      deviceId: id,
      newSettings: { power: !power }
    }));
  };

  const handleSpeedChange = (e) => {
    dispatch(updateDeviceSettings({
      deviceId: id,
      newSettings: { speed: Number(e.target.value) }
    }));
  };

  return (
    <div className="pb-8 md:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 m-2 md:m-0">
      <div className="mx-auto max-w-md rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur w-full md:w-[400px]">
        {/* Power Control */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-200">Power</span>
          <button
              onClick={handlePowerToggle}
              className={`relative inline-flex h-5 w-11.5 md:h-7 md:w-14 items-center rounded-full transition-colors cursor-pointer ${
                power ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block md:h-6 h-4 w-4 md:w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                  power ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
        </div>

        {/* Speed Control */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-200">Speed</span>
            <span className="text-sm font-semibold text-gray-300">{speed}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={handleSpeedChange}
            className="
                w-full 
                cursor-pointer 
                appearance-none 
                h-3.5                                        
                rounded-full 
                bg-slate-700 
                [&::-webkit-slider-thumb]:appearance-none      
                [&::-webkit-slider-thumb]:h-4                  
                [&::-webkit-slider-thumb]:w-4                  
                [&::-webkit-slider-thumb]:rounded-full         
                [&::-webkit-slider-thumb]:bg-white            
                [&::-webkit-slider-thumb]:shadow-lg            
            "
            style={{background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${speed}%, #374151 ${speed}%, #374151 100%)`}}
          />
        </div>
      </div>
    </div>
  );
}