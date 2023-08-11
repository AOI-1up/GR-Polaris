import { NextPage } from "next";
import { DrawCanvas } from "../components/DrawCanvas";
import { Sidebar } from "../components/Sidebar"

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-center px-[10px] bg-red-500">
        <DrawCanvas />
      </div>
      <div className="fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
