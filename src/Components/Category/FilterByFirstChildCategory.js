import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterByFirstChildCategory = ({
  categories,
  setSelectedCategories,
  selectedCategories,
}) => {

  const handleFilterBySubCategory = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <>
      <div className="">
        {/* ------------------category filter */}

        {categories?.map((item) => {
          return (
            <>
              {item?.first_child_Category?.length<1 ? (
                <span className="text-black/50 py-3">
                  No Category Here.
                </span>
              ) : (
                <>
                  {item?.first_child_Category?.map((child, index) => {
                    return (
                      <label
                        key={index}
                        className="label justify-start gap-2 cursor-pointer"
                      >
                        <input
                          onChange={handleFilterBySubCategory}
                          type="checkbox"
                          className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
                          value={child?.firstChildTitle}
                          checked={selectedCategories.includes(
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
              )}
            </>
          );
        })}
      </div>
      <div className=" mt-3 mb-1">
        <button
          onClick={handleClearFilters}
          type="button"
          className="text-sm flex items-center justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
        >
          <FaTrashAlt />
          <span className="font-bold">Clear</span>
        </button>
      </div>
    </>
  );
};

export default FilterByFirstChildCategory;
