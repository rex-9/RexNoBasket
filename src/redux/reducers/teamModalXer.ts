import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITeamUnitProps } from "../../interfaces/team";

interface ITeamModalInterface {
  isOpen: boolean;
  formType: "create" | "update" | null;
  team?: ITeamUnitProps | null;
}

const initialState: ITeamModalInterface = {
  isOpen: false,
  formType: null,
  team: null,
};

export const teamModalXer = createSlice({
  name: "teamModal",
  initialState,
  reducers: {
    openTeamModal: (state, action: PayloadAction<ITeamModalInterface>) => {
      state.isOpen = true;
      state.formType = action.payload.formType;
      state.team = action.payload.team;
    },
    closeTeamModal: (state) => {
      state.isOpen = false;
      state.formType = null;
      state.team = undefined;
    },
  },
});

export const { openTeamModal, closeTeamModal } = teamModalXer.actions;
export default teamModalXer.reducer;
