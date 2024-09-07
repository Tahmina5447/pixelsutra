import Image from "next/image";
import Link from "next/link";
import React from "react";
import { convertTimestamp2 } from "../../../lib/convertTimestampDateAndTime";

const MagazineCard = ({ data }) => {
  return (
    <div className="w-full p-3 bg-white">
      <div className="square-image">
        <Link href={`/magazine/${data?._id}`}>
          <Image
            src={data?.image}
            width={700}
            height={300}
            className="w-full  mb-1 image"
          />
        </Link>
      </div>
      <span className="text-light-text text-sm text-black/40">
        {convertTimestamp2(data?.createdAt)}
      </span>
      <Link href={`/magazine/${data?._id}`}>
        <p className=" text-lg md:text-xl my-3 avenir4 ">{data?.title}</p>
      </Link>
      <p className=" text-xs text-black/70 my-3 avenir1 ">
        {data?.shortDes?.slice(0, 70)}...
      </p>
      <Link href={`/magazine/${data?._id}`}>
        <p className="text-xs  text-blue-400 avenir2">CONTINUE READING</p>
      </Link>
    </div>
  );
};

export default MagazineCard;
