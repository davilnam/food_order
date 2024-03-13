import AboutRestaurant from "../components/about/AboutRestaurant";
import AboutChef from "../components/about/AboutChef";
import FeedBack from "../components/about/FeedBack";
import Post from "../components/post/Post";
import OutstandingProduct from "../components/outstanding/OutstandingProduct";
const Home = () => {
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
