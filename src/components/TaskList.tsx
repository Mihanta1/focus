import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask } from "../store/focusSlice";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaRegCircle, FaPlus } from "react-icons/fa";

const TaskList = () => {
  const tasks = useSelector((state: any) => state.focus.tasks);
  const dispatch = useDispatch();

  const handleAdd = (e: any) => {
    if (e.key === "Enter" && e.target.value) {
      dispatch(addTask(e.target.value));
      e.target.value = "";
    }
  };
  return (
    <div className="p-6 bg-slate-50 rounded-4xl h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-700">
        Objectifs du jour (max 3)
      </h3>
      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task: any) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => dispatch(toggleTask(task.id))}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl cursor-pointer shadow-sm border border-transparent hover:border-indigo-200 transition-all"
            >
              {task.completed ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FaRegCircle className="text-gray-300 text-xl" />
              )}
              <span
                className={`flex-1 ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {task.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length < 3 && (
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Ajouter une tâche douce..."
              onKeyDown={handleAdd}
              className="w-full p-4 pl-12 bg-white/50 border-2 border-dashed border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-300 transition-all"
            />
            <FaPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
