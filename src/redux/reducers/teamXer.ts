import Cookies from "js-cookie";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITeamUnitProps } from "../../interfaces/team";

interface ITeamsInterface {
  teams: ITeamUnitProps[];
}

const initialState: ITeamsInterface = {
  teams: Cookies.get("_teams") ? JSON.parse(Cookies.get("_teams")!) : [],
};

export const teamXer = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<{ team: ITeamUnitProps }>) => {
      const newTeam = {
        id: state.teams.length + 1,
        name: action.payload.team.name,
        playerCount: action.payload.team.playerCount,
        region: action.payload.team.region,
        country: action.payload.team.country,
      };

      state.teams.push(newTeam);
      Cookies.set("_teams", JSON.stringify(state.teams), { expires: 1 });
    },
    updateTeam: (state, action: PayloadAction<{ team: ITeamUnitProps }>) => {
      state.teams.map((team: ITeamUnitProps) => {
        if (team.id === action.payload.team.id) {
          team.name = action.payload.team.name;
          team.playerCount = action.payload.team.playerCount;
          team.region = action.payload.team.region;
          team.country = action.payload.team.country;
        }
        return team;
      });

      Cookies.set("_teams", JSON.stringify(state.teams), { expires: 1 });
    },
    deleteTeam: (state, action: PayloadAction<{ teamId: number }>) => {
      const teamId = action.payload.teamId;
      const index = state.teams.findIndex((team) => team.id === teamId);
      state.teams.splice(index, 1);

      Cookies.set("_teams", JSON.stringify(state.teams), { expires: 1 });
    },
    updatePlayerCount: (
      state,
      action: PayloadAction<{ teamId: number; playerCount: number }>
    ) => {
      const teamId = action.payload.teamId;
      const playerCount = action.payload.playerCount;
      const index = state.teams.findIndex((team) => team.id === teamId);
      state.teams[index].playerCount = playerCount;

      Cookies.set("_teams", JSON.stringify(state.teams), { expires: 1 });
    },
  },
});

export const { addTeam, updateTeam, deleteTeam, updatePlayerCount } =
  teamXer.actions;
export default teamXer.reducer;
