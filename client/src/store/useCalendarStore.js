import { create } from "zustand";

const useCalendarStore = create((set) => ({
  selectedDate: null,
  backupDates: new Set(),

  setSelectedDate: (date) => set({ selectedDate: date }),

  addBackupDate: (date) =>
    set((state) => {
      const updated = new Set(state.backupDates);
      updated.add(date);
      return { backupDates: updated };
    }),

  // Stubbed function for now (no backend)
  fetchBackupDates: async (startDate, endDate) => {
    console.log("fetchBackupDates called (no backend)");
    // Optional: Simulate some mock data
    // set({ backupDates: new Set(["2025-05-01", "2025-05-10"]) });
  },
}));

export default useCalendarStore;
