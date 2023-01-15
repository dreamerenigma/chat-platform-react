import { Outlet } from "react-router-dom"
import { CallsSidebar } from "../../components/sidebars/calls/CallsSidebar";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { fetchFriendsThunk } from "../../store/friends/friendsThunk";
import { useEffect } from "react";

export const CallsPage = () => {
   const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(fetchFriendsThunk());
   }, []);
   return (
      <>
         <CallsSidebar />
         <Outlet />
      </>
   );
};
