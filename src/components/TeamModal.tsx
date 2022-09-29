import { useDispatch, useSelector } from "react-redux";

import {
  addTeam,
  updateTeam,
  deleteTeam,
} from "./../redux/reducers/teamXer";
import { closeTeamModal } from "./../redux/reducers/teamModalXer";
import { removePlayersFromTeam } from "./../redux/reducers/playerXer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input, Button } from "./forms";

import { ReactComponent as CloseIcon } from "../assets/close.svg";

import IAssign from '../interfaces/assign';
import { ITeamUnitProps } from "./../interfaces/team";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  playerCount: yup.number().required("Player count is required"),
  region: yup.string().required("Region is required"),
  country: yup.string().required("Country is required"),
});

const TeamModal = () => {
  const dispatch = useDispatch();
  const { formType, team } = useSelector((state: any) => state.teamModal);
  const teams = useSelector((state: any) => state.team.teams);
  const players = useSelector((state: any) => state.player.players);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:
      team !== null
        ? {
            name: team.name,
            playerCount: team.playerCount,
            region: team.region,
            country: team.country,
          }
        : {
            name: "",
            playerCount: 0,
            region: "",
            country: "",
          },
  });

  const closeModal = () => {
    dispatch(closeTeamModal());
  };

  const onSubmit = (data: {
    name: string;
    playerCount: number;
    region: string;
    country: string;
  }) => {
    const tempTeam = teams.find(
      (team: ITeamUnitProps) => team.name === data.name
    );

    if (tempTeam) {
      setError("name", {
        type: "manual",
        message: "This Team name is already taken",
      });
    } else {
      if (formType === "create") {
        dispatch(
          addTeam({
            team: {
              id: 0,
              name: data.name,
              playerCount: data.playerCount,
              region: data.region,
              country: data.country,
            },
          })
        );
      } else if (formType === "update") {
        formType === "update" &&
          dispatch(
            updateTeam({
              team: {
                id: team.id,
                name: data.name,
                playerCount: data.playerCount,
                region: data.region,
                country: data.country,
              },
            })
          );
      }

      closeModal();
    }
  };

  const handleDeleteTeam = () => {
    const filteredPlayers = players.filter(
      (player: IAssign) => {
        return player.teamId === team.id;
      }
    );

    let allPlayersId = players.map(
      (item: IAssign) => item.playerId
    );

    let filteredPlayersId = filteredPlayers.map(
      (playerItem: IAssign) => playerItem.playerId
    );

    const playerIds = allPlayersId.filter(
      (playerId: number) => !filteredPlayersId.includes(playerId)
    );

    const remainedPlayers = players
      .map((item: IAssign) => {
        if (playerIds.includes(item.playerId)) {
          return {
            playerId: item.playerId,
            teamId: item.teamId,
          };
        }
        return null;
      })
      .filter((item: any) => item !== null);

    dispatch(
      removePlayersFromTeam({
        players: remainedPlayers,
      })
    );

    dispatch(
      deleteTeam({
        teamId: team.id,
      })
    );

    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen p-2 bg-dark/70">
      <div className="p-8 bg-white">
        <div className="flex items-center justify-between">
          {formType === "create" && (
            <h3 className="text-xl font-bold">Create Team</h3>
          )}
          {formType === "update" && (
            <h3 className="text-xl font-bold">Update Team</h3>
          )}
          <Button
            type="button"
            variant="icon"
            disabled={false}
            icon={<CloseIcon className="w-4 h-4" />}
            handleClick={closeModal}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="mt-8 w-96">
            <Input
              register={register("name")}
              required={true}
              type={"text"}
              disabled={false}
              name={"name"}
              label={"Team Name"}
              placeholder={"Team Name"}
              error={errors.name?.message?.toString()}
            />
            <Input
              register={register("region")}
              required={true}
              type={"text"}
              disabled={false}
              name={"region"}
              label={"Region"}
              placeholder={"Region"}
              error={errors.region?.message?.toString()}
            />
            <Input
              register={register("country")}
              required={true}
              type={"text"}
              disabled={false}
              name={"country"}
              label={"Country"}
              placeholder={"Country"}
              error={errors.country?.message?.toString()}
            />
            <Input
              register={register("playerCount")}
              required={true}
              type={"text"}
              disabled={true}
              name={"playerCount"}
              label={"Player Count"}
              placeholder={"Player Count"}
              error={errors.playerCount?.message?.toString()}
            />
          </div>

          {formType === "create" && (
            <Button
              variant={"primary"}
              type={"submit"}
              disabled={false}
              label={"Create team"}
            />
          )}

          {formType === "update" && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={"danger"}
                type={"button"}
                disabled={false}
                label={"Delete team"}
                handleClick={handleDeleteTeam}
              />
              <Button
                variant={"primary"}
                type={"submit"}
                disabled={false}
                label={"Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeamModal;
