import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import SocketContext from "../../contexts/Socket/Context";

const Home = () => {
  const navigate = useNavigate();

  const { socket, uid, users } = useContext(SocketContext).SocketState;
  const createGame = () => {
    socket?.emit("create_game", "TestGame", (lobby_id: string) => {
      if (lobby_id) {
        navigate(`game/${lobby_id}`);
      }
      // redirect to https::site.com/game/lobby_id
    });
  };

  return (
    <div className='page'>
      <button onClick={createGame}>Create Game</button>
      <p>
        Your user ID: <strong>{uid}</strong>
        <br />
        Users online: <strong>{users.length}</strong>
        <br />
        Socket ID: <strong>{socket?.id}</strong>
        <br />
      </p>
    </div>
  );
};

export default Home;
