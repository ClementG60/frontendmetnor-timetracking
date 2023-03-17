import React, { useEffect, useState } from "react";

interface IData {
  data: any;
  typeSelected: string;
}

const Card = ({ data, typeSelected }: IData) => {
  const [currentHrs, setCurrentHrs] = useState();
  const [previousHrs, setPreviousHrs] = useState();
  const [bgColorIcon, setBgColorIcon] = useState<string>();

  const bgColorArray = [
    { name: "work", backgroundColor: "bg-orange-400" },
    { name: "play", backgroundColor: "bg-cyan-300" },
    { name: "study", backgroundColor: "bg-red-400" },
    { name: "exercise", backgroundColor: "bg-emerald-300" },
    { name: "social", backgroundColor: "bg-violet-600" },
    { name: "selfcare", backgroundColor: "bg-yellow-300" },
  ];

  const getBackgroundColor = (title: string) => {
    bgColorArray.map((line) => {
      if (title === line.name) {
        setBgColorIcon(line.backgroundColor);
      }
    });
  };

  useEffect(() => {
    getBackgroundColor(data.title.toLocaleLowerCase().replace(/\s/g, ""));
    console.log(bgColorIcon);
  }, []);

  const timeframes = [
    {
      type: "daily",
      currentData: data.timeframes.daily.current,
      previousData: data.timeframes.daily.previous,
    },
    {
      type: "weekly",
      currentData: data.timeframes.weekly.current,
      previousData: data.timeframes.weekly.previous,
    },
    {
      type: "monthly",
      currentData: data.timeframes.monthly.current,
      previousData: data.timeframes.monthly.previous,
    },
  ];

  useEffect(() => {
    timeframes.map((timeframe) => {
      if (timeframe.type === typeSelected.toLowerCase()) {
        setCurrentHrs(timeframe.currentData);
        setPreviousHrs(timeframe.previousData);
      }
    });
  }, [typeSelected]);

  return (
    <div className="h-fit">
      <div className={`${bgColorIcon} relative rounded-lg overflow-hidden h-10`}>
        <img
          className="w-16 absolute -top-1 right-3"
          src={`./assets/icon-${data.title
            .toLocaleLowerCase()
            .replace(/\s/g, "")}.svg`}
          alt={data.title}
        />
      </div>
      <div className="bg-[#1D204B] hover:bg-[#3B4196] rounded-lg relative h-full w-full cursor-pointer p-5">
        <div className="flex w-full justify-between md:mt-3">
          <h1 className="fill-[18px] text-white">{data.title}</h1>
          <svg
            className="w-5 fill-[#5D629C] cursor-pointer hover:fill-white"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32.055 32.055"
          >
            <g>
              <path
                d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
              />
            </g>
          </svg>
        </div>
        <div className="flex justify-between items-center md:items-start md:flex-col">
          <p className="text-4xl text-white">{currentHrs}hrs</p>
          <p className="text-[12px] mt-2 text-[#5D629C]">Last week - {previousHrs}hrs</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
