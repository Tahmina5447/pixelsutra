import React, { useContext, useEffect, useState } from "react";

import { getCategories } from "../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "./LoadingComponets";
import CreateContext from "../Components/CreateContex";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";

const NaveCategory = ({ title, toggleDrawerCatagory, toggle = false }) => {
  const router = useRouter();
  const { query } = router;
  const { setQueryFromCategory } = useContext(CreateContext);
  const [active, setActive] = useState("");
  const [activeChildCategory, setActiveChildCategory] = useState();
  const [activeCategory, setActiveCategory] = useState(null);
  const [subCategory,setSubCategory]=useState("")
  const {
    data: catagories,
    isLoading,
    refetch,
  } = useQuery(["category"], getCategories);

  useEffect(() => {
    if (catagories) {
      const newData = catagories?.data?.result?.find(
        (item) => item?.parent_category === title
      );
      setActiveChildCategory(newData);
    }
  }, [catagories]);

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  const handelChildeCategoryParams = (cat) => {
    setSubCategory(cat)
    const params = new URLSearchParams();
    params.append("first_child_category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
    router.push({
      pathname: "/shop",
      query: {
        categories: title,
        subCategories: cat,
      },
    });
  };

  const handelSecondChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("second_child_category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
    router.push({
      pathname: "/shop",
      query: {
        categories: title,
        subCategories: subCategory,
        subChildCategories: cat,
      },
    });
  };

  const handleChildCategoryMouseEnter = (childCategory) => {
    setActiveCategory(childCategory);
  };
  const handleChildCategoryMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <div className="">
        {activeChildCategory?.first_child_Category?.length && (
          <ul  onMouseLeave={handleChildCategoryMouseLeave} className=" min-h-[250px] bg-white shadow-md pt-2">
            <>
              {activeChildCategory?.first_child_Category?.map(
                (child, index) => {
                  const isChildCategoryActive =
                    activeCategory === child?.firstChildTitle;
                  return (
                    <>
                      <li key={index}>
                        <span
                          onClick={() =>
                            handelChildeCategoryParams(child?.firstChildTitle)
                          }
                          // href="/shop"
                          className="text-sm cursor-pointer"
                          onMouseEnter={() =>
                            handleChildCategoryMouseEnter(
                              child?.firstChildTitle
                            )
                          }
                         
                        >
                          <span className="flex items-center justify-between text-sm font-medium py-1.5 px-4">
                            {child?.firstChildTitle}
                            {child?.secondChilds?.length > 0 && (
                              <Icon
                                className="text-lg text-black"
                                icon="iconamoon:arrow-right-2-light"
                              />
                            )}
                          </span>
                        </span>
                      </li>
                      {child?.secondChilds?.length > 0 && (
                        <ul
                          className={`${
                            isChildCategoryActive ? "visible" : "hidden"
                          } absolute mt-2 -right-[194px] bg-white bottom-0 -top-0 z-50 w-[200px] min-h-[242px] shadow-md py-2 px-4`}
                        >
                          {child?.secondChilds?.map((child, index) => (
                            <li key={index} className="pb-2 flex items-center">
                              <Icon icon="lucide:dot" className="text-lg" />
                              <span
                                onClick={() =>
                                  handelSecondChildeCategoryParams(child)
                                }
                                href="/shop"
                                className="text-sm cursor-pointer"
                              >
                                <span className=""> {child}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  );
                }
              )}
            </>
          </ul>
        )}
      </div>
    </>
  );
};

export default NaveCategory;
