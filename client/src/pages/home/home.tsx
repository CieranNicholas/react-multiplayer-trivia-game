import { useContext } from "react";

import "./home.css";
import SocketContext from "../../contexts/Socket/Context";

const Home = () => {
  const { socket, uid, users } = useContext(SocketContext).SocketState;
  const createGame = () => {};

  return (
    <div className='page'>
      <button onClick={createGame}>Create Game</button>
      <h2>Socket IO Information</h2>
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
