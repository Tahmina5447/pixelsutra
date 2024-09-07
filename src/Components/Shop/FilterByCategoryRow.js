import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterByCategoryRow = ({
  categories,
  setQueryFilterPrice,
  refetch,
  onChange,
  selectedCategories,
}) => {
  useEffect(() => {
    getProducts();
  }, [selectedCategories]);

  const getProducts = async () => {
    if (selectedCategories?.length > 0) {
      const params = new URLSearchParams();
      selectedCategories?.forEach((category) => {
        params?.append("category", category);
      });
      const url = `${params.toString()}`;
      setQueryFilterPrice(url);
      refetch(["products", url]);
    }else{
      setQueryFilterPrice("")
    }
  };

  return (
    <>
      <div className="">
        {/* ------------------category filter */}
        {categories?.data?.result?.map((item) => (
          <label
            key={item?._id}
            className="label justify-start gap-2 cursor-pointer hover:text-primary"
          >
            <input
              onClick={() => {
                onChange(item?.parent_category);
              }}
              type="checkbox"
              className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
              value={item?.parent_category}
              checked={selectedCategories?.includes(item?.parent_category)}
            />
            <span className="text-[#777] font-bold text-sm mt-[2px]  capitalize hover:text-primary">
              {item?.parent_category}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default FilterByCategoryRow;
