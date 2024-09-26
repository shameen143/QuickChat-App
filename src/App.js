import './App.css';
//import socketIO from "socket.io-client";
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Join from './component/Join/Join';
import Chat from './component/chat/Chat';




function App() {


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
      <Route path="/" element={<Join/>} ></Route>
      <Route path="/chat" element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
