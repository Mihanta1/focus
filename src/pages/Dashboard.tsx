import { motion } from "framer-motion";
import FocusTimer from "../components/FocusTimer";
import TaskList from "../components/TaskList";
import EnergySelector from "../components/EnergySelector";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans text-gray-900">
      <header className="max-w-6xl mx-auto mb-10">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-black"
        >
          Salut ! ☺️
        </motion.h1>
        <p className="text-gray-500 mt-2 text-lg">
          Comment te sens-tu aujourd'hui ?
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12">
          <EnergySelector />
        </div>

        <div className="md:col-span-7">
          <FocusTimer />
        </div>

        <div className="md:col-span-5 flex flex-col gap-6">
          <TaskList />
          <div className="bg-indigo-600 p-8 rounded-4xl text-white shadow-lg">
            <h4 className="text-lg font-medium opacity-80">Ton progrès</h4>
            <p className="text-3xl font-bold mt-2">
              "Tu fais de ton mieux, et c'est déjà génial."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
