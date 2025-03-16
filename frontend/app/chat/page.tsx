import ChatArea from "@/components/chat/chatarea";
import Sidebar from "@/components/home/sidebar";
import HomeHeader from "@/components/home/homeheader";


export default function Chat(){
    return(
        <div className="fixed inset-0 flex bg-black text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden h-full">
            <HomeHeader />
            <ChatArea />
        </div>
        </div>
    );    
}