import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "./forms";
import { Assign } from ".";

import { removePlayer } from "./../redux/reducers/playerXer";
import { updatePlayerCount } from "./../redux/reducers/teamXer";

import IAssign from '../interfaces/assign';
import { IPlayerProps } from "./../interfaces/player";

const PlayerUnit = ({
  id,
  first_name,
  last_name,
  height_feet,
  height_inches,
  weight_pounds,
  position,
  team,
}: IPlayerProps) => {
  const dispatch = useDispatch();
  const players = useSelector((state: any) => state.player.players);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleRemove = () => {
    dispatch(
      removePlayer({
        playerId: id,
      })
    );
    if (team) {
      let selectedTeamsCount =
        players.filter(
          (player: IAssign) => player.teamId === team.id
        ).length - 1;
      dispatch(
        updatePlayerCount({ teamId: team.id, playerCount: selectedTeamsCount })
      );
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <p className="font-bold text-md">
            {first_name} {last_name}
          </p>
          <p className="text-sm font-bold text-danger">{position}</p>
        </div>

        <div className="mt-1">
          <p className="text-sm text-gray-500">
            Height:{" "}
            {height_feet ? (
              <span>{height_feet} feet</span>
            ) : (
              <span>feet unknown</span>
            )}{" "}
            ,{" "}
            {height_feet ? (
              <span>{height_inches} inches</span>
            ) : (
              <span>inches unknown</span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Weight:{" "}
            {weight_pounds ? (
              <span>{weight_pounds} lb</span>
            ) : (
              <span>lb unknown</span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Team:{" "}
            <span className="font-bold text-primary">
              {team ? team?.name : "Nil"}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-1 mt-3">
          {team ? (
            <Button
              variant={"bordered"}
              type={"button"}
              disabled={false}
              label={"Remove from team"}
              handleClick={handleRemove}
            />
          ) : (
            <Button
              variant={"primary"}
              type={"button"}
              disabled={false}
              label={"Add to team"}
              handleClick={() => setIsAddModalOpen(true)}
            />
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <Assign
          player={{
            id,
            first_name,
            last_name,
            height_feet,
            height_inches,
            weight_pounds,
            position,
            team,
          }}
          closeAddModal={closeAddModal}
        />
      )}
    </>
  );
};

export default PlayerUnit;
