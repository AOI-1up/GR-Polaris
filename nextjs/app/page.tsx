import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="w-full h-[50px] border border-red-500 bg-red-100 text-red-700">
        ヘッダー
      </header>
      <div className="flex w-full h-full">
        <div className="min-w-[250px] border border-blue-500 bg-blue-100 text-blue-700">
          右バー
        </div>
        <main className="w-full border border-green-50 bg-green-100 text-green-700">
          作業画面
        </main>
        <div className="min-w-[250px] border border-yellow-500 bg-yellow-100 text-yellow-700">
          左バー
        </div>
      </div>
    </div>
  );
};

export default Home;
