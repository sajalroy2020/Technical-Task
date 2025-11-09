import { updateDeviceSettings } from "../../redux/deviceSlice";

export function LightControlPanel({ device, dispatch }) {

  // Color map for rendering and setting color data
  const colorMap = {
    warm: { hex: '#FFCC80', name: 'Warm' }, 
    neutral1: { hex: '#FFFFFF', name: 'Neutral' },
    cool: { hex: '#C0D8FF', name: 'Cool' },
    'warm-pink': { hex: '#FFB6C1', name: 'Sunset' },
  };  

  const { id, settings } = device;

  // Destructure settings for the Light device
  const { power, brightness, color } = settings;


  const handlePowerToggle = () => {
    dispatch(updateDeviceSettings({
      deviceId: id,
      newSettings: { power: !power }
    }));
  };

  const handleBrightnessChange = (newBrightness) => {
    dispatch(updateDeviceSettings({
      deviceId: id,
      newSettings: { brightness: newBrightness }
    }));
  };

  const handleColorChange = (newColorKey) => {
    dispatch(updateDeviceSettings({
      deviceId: id,
      newSettings: { color: colorMap[newColorKey].hex } 
    }));
  };

  // This looks up the hex in the color map to find the key
  const selectedColorKey = Object.keys(colorMap).find(key => colorMap[key].hex === color) || 'neutral1';

  return (
    <div className="pb-8 md:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 m-2 md:m-0">
      <div className="mx-auto max-w-md rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur w-full md:w-[450px] z-50">
          
          {/* Power Control */}
          <div className="mb-2 flex items-center justify-between">
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

          {/* Color Temperature */}
          <div className="space-y-2">
            <label className="text-sm md:text-base font-medium text-slate-200 block">Color Temperature</label>
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {Object.keys(colorMap).map((key) => (
                <button
                  key={key}
                  onClick={() => handleColorChange(key)}
                  className={`md:h-12 h-8 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                    selectedColorKey === key ? "ring-2 ring-blue-400 scale-105 shadow-lg" : "hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: colorMap[key].hex,
                  }}
                  title={colorMap[key].name}
                  aria-label={`Select ${colorMap[key].name} color`}
                />
              ))}
            </div>
          </div>

          {/* Brightness Control */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-sm md:text-base font-medium text-slate-200">Brightness</label>
              <span className="text-sm md:text-base font-semibold text-slate-300">{brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
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
              style={{background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${brightness}%, #374151 ${brightness}%, #374151 100%)`}}
            />
          </div>
      </div>
    </div>
  )
}