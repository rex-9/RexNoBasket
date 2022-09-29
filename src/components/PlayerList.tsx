import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { PlayerUnit } from "./";
import { Button } from "./forms";

import IAssign from '../interfaces/assign';
import { IPlayerProps } from "./../interfaces/player";
import { ITeamUnitProps } from "./../interfaces/team";

const PlayerList = () => {
  const playersFromRedux = useSelector((state: any) => state.player.players);
  const teamsFromRedux = useSelector((state: any) => state.team.teams);

  const [displayPlayers, setDisplayPlayers] = useState<IPlayerProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetchingLoading, setDataFetchingLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const checkPlayers = (tempPlayers: IPlayerProps[]) => {
    if (playersFromRedux.length > 0) {
      const temp = tempPlayers.map((player: IPlayerProps) => {
        const playerFromRedux = playersFromRedux.find(
          (p: IAssign) => p.playerId === player.id
        );

        const tempTeam = teamsFromRedux.find(
          (team: ITeamUnitProps) => team.id === playerFromRedux?.teamId
        );

        if (playerFromRedux) {
          player.team = tempTeam;
        } else {
          player.team = null;
        }
        return player;
      });
      return temp;
    } else {
      const temp = tempPlayers.map((player: IPlayerProps) => {
        player.team = null;
        return player;
      });
      return temp;
    }
  };

  const handleLoadMore = async () => {
    setDataFetchingLoading(true);
    await fetchData();
  };

  const fetchData = async () => {
    const fetchPlayers = async () => {
      const res = await fetch(
        `https://www.balldontlie.io/api/v1/players?page=${currentPage}&per_page=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
          },
        }
      );
      const resJson = await res.json();
      return resJson;
    };

    let res = async () => {
      const res = await fetchPlayers();
      const temp = checkPlayers(res.data);
      setDisplayPlayers([...displayPlayers, ...temp]);
      setCurrentPage(currentPage + 1);
      if (res.meta.total_pages > currentPage) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
      setDataFetchingLoading(false);
    };
    res();
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  useEffect(() => {
    setDisplayPlayers(checkPlayers(displayPlayers));
  }, [playersFromRedux]);

  return (
    <div>
      <p className="flex justify-center h-12 text-2xl font-bold text-primary">Players</p>
      {!isLoading ? (
        <div className="h-[75vh] overflow-auto mt-4 p-4 grid grid-cols-2 gap-4">
          {displayPlayers.map((player: IPlayerProps, index: number) => (
            <React.Fragment key={index}>
              <PlayerUnit
                id={player.id}
                first_name={player.first_name}
                last_name={player.last_name}
                height_feet={player.height_feet}
                height_inches={player.height_inches}
                weight_pounds={player.weight_pounds}
                position={player.position}
                team={player.team}
              />
            </React.Fragment>
          ))}
          {hasMore && (
            <div className="col-span-2">
              <Button
                variant={"bordered"}
                type={"button"}
                isLoading={dataFetchingLoading}
                disabled={false}
                label={"Load more Players"}
                handleClick={handleLoadMore}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-5 h-5 rounded-full animate-ping bg-primary"></div>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
