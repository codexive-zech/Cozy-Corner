import { Outlet, useNavigation } from "react-router-dom";
import { Footer, Header, Loading, Navbar } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; // getting the loading state from Router useNavigation
  return (
    <>
      <Header />
      <Navbar />
      <section className=" align-element">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
      <Footer />
    </>
  );
};

export default HomeLayout;
