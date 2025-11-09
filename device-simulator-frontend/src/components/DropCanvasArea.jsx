import { useDrop } from 'react-dnd'; 
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDevice, applyPreset } from '../redux/deviceSlice';

const ItemTypes = {
    FAN: 'Fan',
    LIGHT: 'Light',
    PRESET: 'Preset',
};

export function DropCanvasArea({ children }) {
    const dispatch = useDispatch();
    const devices = useSelector(state => state.device.devices);
    const currentDeviceId = useSelector(state => state.device.currentDeviceId);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: [ItemTypes.FAN, ItemTypes.LIGHT, ItemTypes.PRESET], 
        drop: (item) => {
            if (item.type === ItemTypes.PRESET) {
                dispatch(applyPreset(item.id)); 
            } else {
                const deviceToSet = devices.find(d => d.type === item.type);
                if (deviceToSet) {
                    dispatch(setCurrentDevice(deviceToSet.id)); 
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [devices, dispatch]);

    const isActive = isOver && canDrop;
    let borderColor = 'border-slate-700';
    if (isActive) {
        borderColor = 'border-green-500';
    } else if (canDrop) {
        borderColor = 'border-yellow-500';
    }
    const showPrompt = !currentDeviceId;

    return (
        <div ref={drop} className={`flex-1 flex items-center justify-center rounded-2xl m-2 md:m-5 p-4 sm:p-8 relative bg-[#10182880] border border-[#10182880]/50 ${borderColor} transition-colors`}>      
            {showPrompt ? (
                <p className="text-base font-light text-slate-500 text-center p-8"> Drag anything here </p>
            ) : isActive ? (
                <p className="text-base text-green-400 font-bold text-center">Release to add device!</p>
            ) : (
                children
            )}
        </div>
    );
}