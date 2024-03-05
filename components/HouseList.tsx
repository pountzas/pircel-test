"use client";
import React, { useState, useEffect } from "react";
import GradientBar from "./GradientBar";

import { getHouses } from "@/actions/getHouses";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";

const NUMBER_OF_HOUSES_TO_FETCH = 4;

export default function HouseList({
  initialHouses
}: {
  initialHouses: House[];
}) {
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState(initialHouses);
  const [offset, setOffset] = useState(NUMBER_OF_HOUSES_TO_FETCH);
  const { ref, inView } = useInView();

  let newHouses = [] as House[];
  const fetchMoreHouses = async () => {
    newHouses = await getHouses(offset, NUMBER_OF_HOUSES_TO_FETCH);
    setHouses((prevHouses) => [...prevHouses, ...newHouses]);
    setOffset((prevOffset) => prevOffset + NUMBER_OF_HOUSES_TO_FETCH);
  };

  // useEffect(() => {
  //   if (inView) {
  //     fetchMoreHouses();
  //   }
  // }, [inView, newHouses]);

  return (
    <div className="space-y-[50px]">
      {houses.length ? (
        houses?.map((house) => (
          <div
            key={house.id}
            className="w-[1000px] h-[320px] rounded-[22px] drop-shadow-sm shadow-lg bg-white border shadow-black/15 flex flex-col items-center justify-between px-[50px]"
          >
            <div className="flex items-end justify-between w-full mt-[60px]">
              <div className="text-5xl font-bold">{house.name}</div>
              <div className="text-4xl">{house.animal}</div>
            </div>
            <GradientBar colors={house.houseColours} />
            <div className="flex items-baseline w-full gap-4 mb-[55px] text-4xl ">
              Founder:{" "}
              <span className="text-4xl font-bold">{house.founder}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center pt-8">
          <Loading />
        </div>
      )}
      {loading && (
        <div ref={ref} className="flex items-center justify-center pt-8">
          <Loading />
        </div>
      )}
    </div>
  );
}
