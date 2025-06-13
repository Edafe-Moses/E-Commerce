import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  onboardingStep: number;
  showOnboarding: boolean;
  preferences: {
    currency: string;
    language: string;
    notifications: boolean;
  };
}

const initialState: UserState = {
  onboardingStep: 0,
  showOnboarding: false,
  preferences: {
    currency: 'USD',
    language: 'en',
    notifications: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startOnboarding: (state) => {
      state.showOnboarding = true;
      state.onboardingStep = 1;
    },
    nextOnboardingStep: (state) => {
      if (state.onboardingStep < 5) {
        state.onboardingStep += 1;
      }
    },
    prevOnboardingStep: (state) => {
      if (state.onboardingStep > 1) {
        state.onboardingStep -= 1;
      }
    },
    completeOnboarding: (state) => {
      state.showOnboarding = false;
      state.onboardingStep = 0;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const {
  startOnboarding,
  nextOnboardingStep,
  prevOnboardingStep,
  completeOnboarding,
  updatePreferences,
} = userSlice.actions;
export default userSlice.reducer;