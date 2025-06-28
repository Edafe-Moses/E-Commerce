import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  isSidebarOpen: boolean;
  selectedWidget: string;
  quickStats: {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
  };
}

const initialState: DashboardState = {
  isSidebarOpen: true,
  selectedWidget: 'sales',
  quickStats: {
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSelectedWidget: (state, action: PayloadAction<string>) => {
      state.selectedWidget = action.payload;
    },
    updateQuickStats: (state, action: PayloadAction<Partial<DashboardState['quickStats']>>) => {
      state.quickStats = { ...state.quickStats, ...action.payload };
    },
  },
});

export const { toggleSidebar, setSelectedWidget, updateQuickStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;