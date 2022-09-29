import { useDispatch } from "react-redux";

import { ITeamUnitProps } from "./../interfaces/team";

import { Button } from "./forms";

import { openTeamModal } from "../redux/reducers/teamModalXer";

import { ReactComponent as EditIcon } from "../assets/edit.svg";

const TeamUnit = ({
  id,
  name,
  playerCount,
  region,
  country,
}: ITeamUnitProps) => {
  const dispatch = useDispatch();

  const handleEditTeam = () => {
    dispatch(
      openTeamModal({
        isOpen: true,
        formType: "update",
        team: { id, name, playerCount, region, country },
      })
    );
  };

  return (
    <div className="flex items-start justify-between w-full p-4 bg-white border border-gray-300">
      <div>
        <p className="font-bold text-md">{name}</p>
        <div className="mt-1">
          <p className="text-sm text-gray-500">Region: {region}</p>
          <p className="text-sm text-gray-500">Country: {country}</p>
          <p className="text-sm text-gray-500">
            Number of Players:{" "}
            <span className="font-bold text-primary">{playerCount}</span>
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="icon"
        disabled={false}
        icon={<EditIcon className="w-4 h-4" />}
        handleClick={handleEditTeam}
      />
    </div>
  );
};

export default TeamUnit;
