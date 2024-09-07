import Link from "next/link";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import LoadingComponets from "../../Shared/LoadingComponets";
import ProductCard from "../../Shared/ProductCard";
import { AiFillEye } from "react-icons/ai";
import CreateContext from "../CreateContex";
import { products } from "../../../lib/helper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import CustomProductSectionSkeleton from "../CustomSkeleton/CustomProductSectionSkeleton";
import { Icon } from "@iconify/react/dist/iconify.js";
const FeaturedProductSection = ({ heading, subtitle = "", data }) => {
  const { setQueryFromCategory } = useContext(CreateContext);

  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  return (
    <>
      <div className="mb-5 md:mb-10 relative px-3 md:px-0">
        <div className=" pb-3 md:pb-5 lg:pb-14">
          <div className="text-center mb-1">
            <h1 className="text-2xl font-semibold md:font-normal md:text-[28px] capitalize  mb-1 avenir4">
              {heading}
            </h1>
            <div className="text-center">
              <Link
                onClick={() =>
                  handelCategoryParams(heading)
                }
                href={`/shop`}
                className="inline-block py-1 text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </div>
        {data?.length > 4 && (
          <div className=" z-50 select-none">
            <div
              className="text-lg  md:text-2xl font-bold  text-primary  cursor-pointer absolute left-[26%]  lg:left-[41.5%]  top-1.5 sm:top-2 md:top-1"
              onClick={goPrev}
            >
              <Icon icon="fe:arrow-left" />
            </div>
            <div
              className="text-lg md:text-2xl font-bold  text-primary cursor-pointer absolute  right-[26%] lg:right-[41.5%] top-1.5 sm:top-2  md:top-1"
              onClick={goNext}
            >
              <Icon icon="fe:arrow-right" />
            </div>
          </div>
        )}
        {!isLoading ? (
          // <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 md:gap-5 mt-3">
          //   {data.slice(0, 10)?.map((item) => (
          //     <ProductCard key={item._id} product={item}></ProductCard>
          //   ))}
          // </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            // centeredSlides={true}
            // grabCursor={true}
            breakpoints={{
              "@.25": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@.50": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              "@1.25": {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              "@1.75": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              "@2.25": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            // navigation={true}
            // // autoplay={{ delay: 4000 }}
            // modules={[Navigation]}
            // className=" mySwiper_2"
            modules={[Navigation]}
            navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }} // This connects your custom buttons
            className="mySwiper"
            ref={swiperRef}
          >
            {data?.map((item, index) => {
              return (
                <SwiperSlide key={index} className="flex justify-center">
                  <ProductCard product={item}></ProductCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <CustomProductSectionSkeleton />
        )}
      </div>
    </>
  );
};

export default FeaturedProductSection;
