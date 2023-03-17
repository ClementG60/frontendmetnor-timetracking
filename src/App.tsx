import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

function App() {
  const [typeSelected, setTypeSelected] = useState<string>("Weekly");
  const [data, setData] = useState<any>();
  const types: string[] = ["Daily", "Weekly", "Monthly"];

  const getData = () => {
    axios.get("data.json").then((res) => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="body-font font-rubik my-5 flex items-center justify-center h-screen">
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-y-5 lg:gap-x-5 justify-center lg:w-8/12">
        <div className="bg-[#1D204B] rounded-lg">
          <div className="bg-[#5746EA] flex lg:flex-col items-center lg:items-start p-6 rounded-lg">
            <img
              className="w-16 border-2 border-white rounded-full"
              src="./assets/image-jeremy.png"
              alt=""
            />
            <p className="text-xs ml-3 lg:mt-7 lg:ml-0 lg:mb-8 text-white">
              Report for <br />
              <span className="text-4xl text-white">Jeremy <br/> Robson</span>
            </p>
          </div>
          <div className="flex lg:flex-col justify-around px-6 my-5">
            {types.map((type, index) => {
              return (
                <p
                  className={`text-sm ${
                    typeSelected === type ? "text-white" : "text-[#5D629C]"
                  } cursor-pointer`}
                  key={index}
                  onClick={() => setTypeSelected(type)}
                >
                  {type}
                </p>
              );
            })}
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {data &&
            data.map((card: any) => {
              return <Card data={card} typeSelected={typeSelected} />;
            })}
        </div>
      </section>
    </main>
  );
}

export default App;
