import { Draw } from "./draw";
import { ToolBox } from "./toolbox";

export function Home() {

    // const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000');

    // const socket = io(socketUrl);

    // const {readyState, sendMessage, lastMessage} =  useWebSocket(socketUrl,  {
    //     onOpen: () => {
    //         alert('You have joined the room');
    //     },
    //     shouldReconnect: () => true,
    // });

    // console.log('lastMessage.payload', lastMessage?.data);
    
    // useEffect(() => {
    //     if(readyState === 1) {
    //         sendMessage("connected now", true);
    //     }
    // }, [])

    return (
        <>
            <ToolBox />
            <Draw />
        </>
    );
}