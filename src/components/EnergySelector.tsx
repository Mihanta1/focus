import { FaCloud, FaSun, FaBolt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setEnergy } from '../store/focusSlice';
import { motion } from 'framer-motion';

const EnergySelector = () => {
    const dispatch = useDispatch();

  const currentEnergy = useSelector((state: any) => state.focus.energy);

  const levels = [
    {
      id: 'low',
      label: 'Fatigué',
      desc: 'Focus 15 min',
      icon: <FaCloud />,
      activeColor: 'bg-red-100 text-red-600 border-red-200',
      hoverColor: 'hover:bg-red-50'
    },
    {
      id: 'medium',
      label: 'Ça va',
      desc: 'Focus 25 min',
      icon: <FaSun />,
      activeColor: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      hoverColor: 'hover:bg-yellow-50'
    },
    {
      id: 'high',
      label: 'À fond',
      desc: 'Focus 45 min',
      icon: <FaBolt />,
      activeColor: 'bg-green-100 text-green-600 border-green-200',
      hoverColor: 'hover:bg-green-50'
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {levels.map((level) => {
        const isActive = currentEnergy === level.id;
        
        return (
          <motion.button
            key={level.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(setEnergy(level.id as any))}
            className={`
              relative flex flex-col items-center justify-center p-6 
              rounded-4xl border-2 transition-all duration-300
              ${isActive ? `${level.activeColor} shadow-md` : `bg-white border-transparent text-gray-400 ${level.hoverColor}`}
            `}
          >
            <span className="text-3xl mb-2">{level.icon}</span>
            <span className="font-bold text-lg">{level.label}</span>
            <span className="text-xs opacity-70 mt-1 uppercase tracking-wider font-semibold">
              {level.desc}
            </span>

      
            {isActive && (
              <motion.div 
                layoutId="activeGlow"
                className="absolute -inset-1 rounded-[2.1rem] border-2 border-current opacity-20"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  )
}

export default EnergySelector