import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../actions/actions";
import AboutRestaurant from "../components/about/AboutRestaurant";
import AboutChef from "../components/about/AboutChef";
import FeedBack from "../components/about/FeedBack";
import Post from "../components/post/Post";
import OutstandingProduct from "../components/outstanding/OutstandingProduct";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);
  return (
    <>
      <AboutRestaurant></AboutRestaurant>
      <OutstandingProduct></OutstandingProduct>
      <AboutChef></AboutChef>
      <FeedBack></FeedBack>
      <Post></Post>
    </>
  );
};
export default Home;
