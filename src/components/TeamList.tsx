import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TeamUnit, TeamModal } from "./";
import { Button } from "./forms";

import { ITeamUnitProps } from "./../interfaces/team";

import { openTeamModal } from "./../redux/reducers/teamModalXer";

const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state: any) => state.team.teams);
  const isTeamModalOpen = useSelector((state: any) => state.teamModal.isOpen);

  return (
    <>
      <div>
        <div className="flex items-center justify-between h-12">
          <div className="w-40">
            <Button
              variant={"primary"}
              type={"button"}
              disabled={false}
              label={"Create a team"}
              handleClick={() =>
                dispatch(
                  openTeamModal({
                    isOpen: true,
                    formType: "create",
                    team: null,
                  })
                )
              }
            />
          </div>
          <h3 className="flex justify-center w-full text-2xl font-bold text-primary">Teams</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 mt-4 overflow-auto">
          {teams.length > 0 ? (
            <>
              {teams.map((team: ITeamUnitProps, index: number) => (
                <React.Fragment key={index}>
                  <TeamUnit
                    id={team.id}
                    name={team.name}
                    playerCount={team.playerCount}
                    region={team.region}
                    country={team.country}
                  />
                </React.Fragment>
              ))}
            </>
          ) : (
            <p className="m-auto text-center text-md text-danger">There is No team yet. <br />Create your first team now. 😉</p>
          )}
        </div>
      </div>

      {isTeamModalOpen && <TeamModal />}
    </>
  );
};

export default TeamList;
