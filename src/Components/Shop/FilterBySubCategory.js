import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterBySubCategory = ({
  categories,
  setQueryFilterPriceSubCategory,
  refetch,
  selectedCategories,
  onChange,
}) => {
  useEffect(() => {
    getProducts();
  }, [selectedCategories]);
  const getProducts = async () => {
    if (selectedCategories?.length > 0) {
      const params = new URLSearchParams();
      selectedCategories?.forEach((category) => {
        params?.append("first_child_category", category);
      });
      const url = `${params.toString()}`;
      setQueryFilterPriceSubCategory(`&${url}`);
      refetch(["products", url]);
    } else {
      setQueryFilterPriceSubCategory("");
    }
  };

  const handleClearFilters = () => {
    // setSelectedCategories([]);
  };
  return (
    <>
      <div className="">
        {/* ------------------category filter */}
        {categories?.map((item) => {
          return (
            <>
              {item?.first_child_Category?.map((child, index) => {
                return (
                  <label
                    key={index}
                    className="label justify-start gap-2 cursor-pointer"
                  >
                    <input
                      onClick={() => {
                        onChange(child?.firstChildTitle);
                      }}
                      type="checkbox"
                      className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
                      value={child?.firstChildTitle}
                      checked={selectedCategories?.includes(
                        child?.firstChildTitle
                      )}
                    />
                    <span className="text-[#777] font-bold text-sm  capitalize hover:text-primary">
                      {child?.firstChildTitle}
                    </span>
                  </label>
                );
              })}
            </>
          );
        })}
      </div>
      {/* <div className=" mt-3 mb-1">
        <button
          onClick={handleClearFilters}
          type="button"
          className="text-sm flex items-center justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
        >
          <FaTrashAlt />
          <span className="font-bold">Clear</span>
        </button>
      </div> */}
    </>
  );
};

export default FilterBySubCategory;
