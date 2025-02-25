import { useEffect, useState } from "react";
import { getAlluser } from "../services/Service";
import { useSearchParams } from "react-router-dom";
import useSocket from "../Hooks/useSocket";

export default function Sidebar({ socket, onlineusers }) {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const val = getAlluser().then((val) => setData(val));
    setData(val);
  }, []);
  // const theArray = data?.data?.map((val) => {
  //   console.log(val.username);
  //   return val.username;
  // });
  function UserFun(user) {
    if (!user) return;

    // Find the matching user from onlineusers
    const theSelectedUserData = Object.entries(onlineusers)?.find(
      ([key, value]) => key === user.username
    );

    if (!theSelectedUserData) return;

    // Extract the key (username) and value (socket ID)
    const [username, socketId] = theSelectedUserData;

    // Update searchParams
    searchParams.set("user", username);
    searchParams.set("id", socketId);
    setSearchParams(searchParams);
  }

  return (
    <div className="w-80 max-w-80 h-[calc(100vh-70px)] overflow-y-auto bg-gray-900 text-white flex flex-col">
      {/* Header - Profile & Search */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src="icon.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold text-lg">My Chats</span>
        </div>
        <button className="text-gray-400 hover:text-white">+</button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 bg-gray-800 rounded-md focus:outline-none text-gray-300 placeholder-gray-500"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {data?.data?.map((user, index) => (
          <div
            key={user._id}
            onClick={() => UserFun(user)}
            className="p-3 flex items-center space-x-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800"
          >
            <img
              src="chiko.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-sm font-semibold">{user.username}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
