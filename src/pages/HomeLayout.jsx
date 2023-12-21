import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />
      <section className=" align-element">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </>
  );
};

export default HomeLayout;
