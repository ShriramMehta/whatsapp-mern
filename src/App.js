import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import { useEffect , useState } from 'react';
import axios from './axios'



function App() {

  const [messages , setMessages] = useState([]);
  useEffect( () => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    })
  },[]);

  useEffect(()=>{
    const pusher = new Pusher('69d5e5882b4828759f17', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));

      setMessages([...messages,newMessage])
    });

    //cleanup function
    return() => {
    channel.unbind_all();
    channel.unsubscribe();
  };
  },[messages])

  console.log(messages)
  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat message={messages}/>
      </div>
    </div>
  );
}

export default App;
