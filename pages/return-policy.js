import React, { useEffect, useState } from "react";
import { getMyShopData } from "../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "../src/Shared/LoadingComponets";
import Image from "next/image";

const ReturnPolicy = () => {
  const [reurnPolicy, setReturnPolicy] = useState({});
  const { data, isLoading, refetch } = useQuery(["my-shop"], getMyShopData);
  useEffect(() => {
    if (data) {
      setReturnPolicy(data);
    }
  }, [data]);
  return (
    <>
      {isLoading ? (
        <>
          <LoadingComponets />
        </>
      ) : (
        <>
          <div>
            <div className="">
              <Image
                src={reurnPolicy?.data?.return_policy_image}
                width={1000}
                height={700}
                className="w-full h-[250px] object-cover md:[450px]"
              />
            </div>
            <div className="px-5 md:px-10 mt-7">
              <div className="w-full lg:w-2/3 mx-auto ">
                {reurnPolicy?.data?.return_policy && (
                  <div
                    className=" text-[14px] text-gray-700 mb-5 md:10 avenir2"
                    dangerouslySetInnerHTML={{
                      __html: reurnPolicy?.data?.return_policy,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReturnPolicy;
