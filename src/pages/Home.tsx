import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authXer";

import IAuthStates from "../interfaces/auth";

import { Button } from "../components/forms";
import { PlayerList, TeamList } from "../components/";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAuthStates) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div>
        <nav className="flex items-center justify-between w-screen px-12 py-1 border border-b">
          <p className="font-bold text-md text-dark">
            {auth.user.username} No Basket
          </p>
          <div className="flex items-center justify-center">
            <Button
              variant={"danger"}
              type={"button"}
              disabled={false}
              label={"Log out"}
              handleClick={handleLogout}
            ></Button>
          </div>
        </nav>

        <div className="grid grid-cols-2 gap-8 p-12">
          <TeamList />
          <PlayerList />
        </div>
      </div>
    </>
  );
};

export default Home;
