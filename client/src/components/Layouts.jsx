// import MessageBox from "./MessageBox";
// import NavBar from "./NavBar";
// import Sidebar from "./SideBar";

// function Layout() {
//   return (
//     <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-screen">
//       {/* Navbar (Takes Auto Height) */}
//       <div className="row-span-1 col-span-3 bg-gray-800 text-white p-4">
//         <NavBar />
//       </div>

//       {/* Sidebar (Takes Full Remaining Height) */}
//       <div className="row-span-1  bg-gray-900 text-white p-4">
//         <Sidebar />
//       </div>

//       {/* Message Box (Takes Full Remaining Height & Expands) */}
//       <div className="row-span-1  bg-gray-100 ">
//         <MessageBox />
//       </div>
//     </div>
//   );
// }

// export default Layout;
import useSocket from "../Hooks/useSocket";
import MessageBox from "./MessageBox";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

function Layout() {
  const { socket, onlineusers } = useSocket();
  console.log(onlineusers, "...");
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar (Fixed Height) */}
      <div className="h-[70px] bg-gray-800 text-white p-4">
        <NavBar />
      </div>

      {/* Main Content (Sidebar + Messages) */}
      <div className="flex flex-1 h-[calc(100%-70px)]">
        {/* Sidebar (Fixed Width, Full Height) */}
        <div className="w-[300px] bg-gray-900 text-white ">
          <Sidebar socket={socket} onlineusers={onlineusers} />
        </div>

        {/* Chat Section (Expands to Fill Space) */}
        <div className="flex-1 bg-gray-100">
          <MessageBox socket={socket} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
