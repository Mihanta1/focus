import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  energy: "low" | "medium" | "high";
  timeLeft: number;
  isActive: boolean;
  tasks: { id: string; text: string; completed: boolean }[];
}

const initialState: AppState = {
  energy: "medium",
  timeLeft: 25 * 60,
  isActive: false,
  tasks: [],
};

export const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    setEnergy: (state, action: PayloadAction<"low" | "medium" | "high">) => {
      state.energy = action.payload;
      const durations = { low: 15, medium: 25, high: 45 };
      state.timeLeft = durations[action.payload] * 60;
      state.isActive = false;
    },
    tick: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    toggleTimer: (state) => {
      state.isActive = !state.isActive;
    },
    addTask: (state, action: PayloadAction<string>) => {
      if (state.tasks.length < 3) {
        state.tasks.push({
          id: Date.now().toString(),
          text: action.payload,
          completed: false,
        });
      }
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { setEnergy, tick, toggleTimer, addTask, toggleTask } = focusSlice.actions;
export default focusSlice.reducer;