import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const FilterBySecondChildCategory2 = ({
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
  const firstChild = categories?.map((child) => child);
  return (
    <>
      <div className="">
        {firstChild?.map((item, index) => (
          <>
            {firstChild?.length < 1 ? (
              <span className="text-black/50 py-3">No Category Here.</span>
            ) : (
              <>
                <div key={index}>
                  {item?.first_child_Category?.map((firstChild, index) => (
                    <>
                    {console.log(firstChild?.secondChilds)}
                      {firstChild?.secondChilds?.length === 0 && (
                        <>
                          <span className="text-black/50 py-3">
                            No Category Here.
                          </span>
                        </>
                      )}
                      {firstChild?.secondChilds?.length > 0 && (
                        <>
                          <div key={index}>
                            {firstChild?.secondChilds?.map((data, index) => (
                              <label
                                key={index}
                                className="label justify-start gap-2 cursor-pointer"
                              >
                                <input
                                  onChange={handleFilterBySubCategory}
                                  type="checkbox"
                                  className="checkbox border-2 border-[#777] checkbox-sm rounded-xs checkbox-primary"
                                  value={data}
                                  checked={selectedCategories.includes(data)}
                                />
                                <span className="text-[#777] font-bold text-sm  capitalize hover:text-primary">
                                  {data}
                                </span>
                              </label>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        ))}
      </div>
      <div className="mt-3 mb-1">
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

export default FilterBySecondChildCategory2;
