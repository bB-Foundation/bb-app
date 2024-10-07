import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {QuestCategory} from 'types/quest';

import {OmitSafe} from 'types/tools';
import QuestFilters, {DistanceUnit, TimeOfDay} from 'types/quest/quest-filters';

const initialQuestsFilters = {
  distance: 5,
  distanceUnit: DistanceUnit.KM,
  minRewards: 1,
};

type QuestsPageState = {
  showLoader: boolean;
  questsFilters: OmitSafe<QuestFilters, 'latitude' | 'longitude'> & {
    minRewards: number;
  };
  modalQuestsFilters: OmitSafe<QuestFilters, 'latitude' | 'longitude'> & {
    minRewards: number;
  };
};

const initialState: QuestsPageState = {
  showLoader: false,
  questsFilters: initialQuestsFilters,
  modalQuestsFilters: initialQuestsFilters,
};

const questsPageSlice = createSlice({
  name: 'questsPage',
  initialState,
  reducers: {
    // loader
    showLoader(state) {
      state.showLoader = true;
    },
    hideLoader(state) {
      state.showLoader = false;
    },
    // quests filters
    setDistance(state, {payload}: PayloadAction<number>) {
      state.modalQuestsFilters.distance = payload;
    },
    setCountry(state, {payload}: PayloadAction<string | undefined>) {
      state.modalQuestsFilters.country = payload;
    },
    setCity(state, {payload}: PayloadAction<string | undefined>) {
      state.modalQuestsFilters.city = payload;
    },
    setCategory(state, {payload}: PayloadAction<QuestCategory | undefined>) {
      state.modalQuestsFilters.category = payload;
    },
    setStartDate(state, {payload}: PayloadAction<string | undefined>) {
      state.modalQuestsFilters.startDate = payload;
    },
    setEndDate(state, {payload}: PayloadAction<string | undefined>) {
      state.modalQuestsFilters.endDate = payload;
    },
    setTimeOfDay(state, {payload}: PayloadAction<TimeOfDay | undefined>) {
      state.modalQuestsFilters.timeOfDay = payload;
    },
    setMinRewards(state, {payload}: PayloadAction<number>) {
      state.modalQuestsFilters.minRewards = payload;
    },
    applyFilters(state) {
      state.questsFilters = state.modalQuestsFilters;
    },
    /** clear modalQuestsFilters on close modal if apply filters button wasn't used  */
    clearModalQuestsFilters(state) {
      state.modalQuestsFilters = state.questsFilters;
    },
  },
});

export const {
  showLoader,
  hideLoader,
  setDistance,
  setCountry,
  setCity,
  setCategory,
  setStartDate,
  setEndDate,
  setTimeOfDay,
  setMinRewards,
  applyFilters,
  clearModalQuestsFilters,
} = questsPageSlice.actions;
export const questsPage = questsPageSlice.reducer;
