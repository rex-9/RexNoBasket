import Cookies from "js-cookie";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IAssign from '../../interfaces/assign';
import { ITeamUnitProps } from "../../interfaces/team";
import { IPlayerProps } from "../../interfaces/player";

interface IPlayerXerProps {
  players: IAssign[];
}

const initialState: IPlayerXerProps = {
  players: Cookies.get("_players") ? JSON.parse(Cookies.get("_players")!) : [],
};

export const playerXer = createSlice({
  name: "player",
  initialState,
  reducers: {
    assign: (
      state,
      action: PayloadAction<{
        player: IPlayerProps;
        team: ITeamUnitProps | null;
      }>
    ) => {
      const player = action.payload.player;
      const team = action.payload.team;

      const index = state.players.findIndex(
        (p) => p.playerId === player.id
      );

      if (index === -1) {
        const tempPlayer = {
          playerId: player.id,
          teamId: team?.id,
        };
        state.players.push(tempPlayer);
      } else {
        state.players.map((item: IAssign) => {
          if (item.playerId === player.id) {
            item.teamId = team?.id;
          }
          return item;
        });
      }

      Cookies.set("_players", JSON.stringify(state.players), { expires: 1 });
    },
    removePlayer: (state, action: PayloadAction<{ playerId: number }>) => {
      const playerId = action.payload.playerId;
      const index = state.players.findIndex(
        (item) => item.playerId === playerId
      );
      state.players.splice(index, 1);

      Cookies.set("_players", JSON.stringify(state.players), { expires: 1 });
    },
    removePlayersFromTeam: (
      state,
      action: PayloadAction<{ players: IAssign[] }>
    ) => {
      state.players = action.payload.players;

      Cookies.set("_players", JSON.stringify(state.players), { expires: 1 });
    },
  },
});

export const { assign, removePlayer, removePlayersFromTeam } =
  playerXer.actions;
export default playerXer.reducer;
