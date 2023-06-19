import { NextPage } from "next";
import { MainCanvas } from "../components/MainCanvas";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <header className="w-full h-[50px] bg-[#9370DB]">
        <div className="font-bold text-white text-2xl">ヘッダー</div>
      </header>
      <div className="flex w-full h-full">
        <div className="min-w-[250px] border border-blue-500 bg-blue-100 text-blue-700">
          右バー
        </div>
        <main>
          <MainCanvas />
        </main>
        <div className="min-w-[250px] border border-yellow-500 bg-yellow-100 text-yellow-700">
          左バー
        </div>
      </div>
    </div>
  );
};

export default Home;
