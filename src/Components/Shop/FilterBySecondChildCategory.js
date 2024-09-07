import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterBySecondChildCategory = ({
  categories,
  setQueryFilterPriceSubChildCategory,
  refetch,
  selectedSubChildCategories,
  onChange,
}) => {
  useEffect(() => {
    getProducts();
  }, [selectedSubChildCategories]);

  const getProducts = async () => {
    if (selectedSubChildCategories?.length > 0) {
      const params = new URLSearchParams();
      selectedSubChildCategories?.forEach((category) => {
        params?.append("second_child_category", category);
      });
      const url = `${params.toString()}`;
      setQueryFilterPriceSubChildCategory(`&${url}`);
      
    refetch(["products", url]);
    } else {
      setQueryFilterPriceSubChildCategory("");
    }

  };

  return (
    <>
      <div className="">
        {categories?.map((data, index) => (
          <label
            key={index}
            className="label justify-start gap-2 cursor-pointer"
          >
            <input
              onClick={() => onChange(data)}
              type="checkbox"
              className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
              value={data}
              checked={selectedSubChildCategories.includes(data)}
            />
            <span className="text-[#777] font-bold text-sm  capitalize hover:text-primary">
              {data}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default FilterBySecondChildCategory;
