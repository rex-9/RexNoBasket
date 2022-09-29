import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { assign } from "../redux/reducers/playerXer";
import { updatePlayerCount } from "../redux/reducers/teamXer";

import { Button, Select } from "./forms";

import { ReactComponent as CloseIcon } from "../assets/close.svg";

import IAssign from '../interfaces/assign';
import { ITeamUnitProps } from "../interfaces/team";
import { IPlayerProps } from "../interfaces/player";

interface IAssignProps {
  player: IPlayerProps;
  closeAddModal: () => void;
}

const AssignProps = ({
  player,
  closeAddModal,
}: IAssignProps) => {
  const dispatch = useDispatch();
  const teams = useSelector((state: any) => state.team.teams);
  const players = useSelector((state: any) => state.player.players);

  const [selectedTeam, setSelectedTeam] = useState<ITeamUnitProps | null>(
    teams.length > 0 ? teams[0] : null
  );

  const handleSelectTeam = (teamId: number) => {
    const team = teams.find((team: ITeamUnitProps) => team.id === teamId);
    setSelectedTeam(team);
  };

  const handleAdd = () => {
    if (selectedTeam) {
      dispatch(assign({ player, team: selectedTeam }));

      let selectedTeamsCount =
        players.filter(
          (player: IAssign) => player.teamId === selectedTeam.id
        ).length + 1;
      dispatch(
        updatePlayerCount({
          teamId: selectedTeam.id,
          playerCount: selectedTeamsCount,
        })
      );
      closeAddModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen p-2 bg-dark/70">
      <div className="p-8 bg-white w-96">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Select Team</h3>
          <Button
            type="button"
            variant="icon"
            disabled={false}
            icon={<CloseIcon className="w-4 h-4" />}
            handleClick={closeAddModal}
          />
        </div>
        <div className="mt-8 mb-2">
          {teams.length > 0 ? (
            <Select
              value={selectedTeam?.id ?? 0}
              options={teams}
              handleSelectTeam={handleSelectTeam}
            />
          ) : (
            <p className="mb-2 text-md text-danger">No teams to assign. Please create one.</p>
          )}
        </div>
        {teams.length > 0 && (
          <Button
            variant={"primary"}
            type={"button"}
            disabled={false}
            label={"Assign to team"}
            handleClick={handleAdd}
          />
        )}
      </div>
    </div>
  );
};

export default AssignProps;
