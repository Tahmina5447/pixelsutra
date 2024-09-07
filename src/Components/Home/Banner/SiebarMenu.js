
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import { getCategories } from "../../../../lib/helper";
import CreateContext from "../../CreateContex";
import CustomCategorySkeleton from "../../CustomSkeleton/CustomCategorySkeleton";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";

const SiebarMenu = ({ catagories }) => {
  const router = useRouter();
  const { query } = router;
  const { setQueryFromCategory,setQuerySubCategory } = useContext(CreateContext);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [activeChildCategory, setActiveChildCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (catagories) {
      setIsLoading(false)
    }
  }, [catagories])

  // const {
  //   data: categories,
  //   isLoading,
  //   refetch,
  // } = useQuery(["categories"], getCategories);

  const handleParentCategoryMouseEnter = (parentCategory) => {
    setActiveParentCategory(parentCategory);
  };

  const handleParentCategoryMouseLeave = () => {
    setActiveParentCategory(null);
    setActiveChildCategory(null);
  };
  const handleChildCategoryMouseEnter = (childCategory) => {
    setActiveChildCategory(childCategory);
  };

  const handleChildCategoryMouseLeave = () => {
    setActiveChildCategory(null);
  };

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
    router.push({
      pathname: "/shop",
      query: { categories: cat},
    })

  }

  const handelChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("first_child_category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
    router.push({
      pathname: "/shop",
      query: {
        categories: activeParentCategory,
        subCategories: cat,
      },
    });
  }

  const handelSecondChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("second_child_category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
    router.push({
      pathname: "/shop",
      query: {
        categories: activeParentCategory,
        subCategories: activeChildCategory,
        subChildCategories: cat,
      },
    });
  }


  return (
    <div className="">
      <ul id="catagory-menu" className="bg-white shadow-md">
        <>
          {
            isLoading ?
              <CustomCategorySkeleton />
              :
              <>
                {catagories?.data?.result?.slice(0, 8).map((category) => {
                  const isParentCategoryActive = activeParentCategory === category?.parent_category;
                  // const hasChildCategories = category?.first_child_Category?.length > 0;
                 
                  return (
                    <li
                      key={category._id}
                      id="parent-category"
                      className=" avenir2"
                      onMouseEnter={() =>
                        handleParentCategoryMouseEnter(category.parent_category)
                      }
                      onMouseLeave={handleParentCategoryMouseLeave}
                    >
                      <a
                        onClick={() =>
                          handelCategoryParams(category.parent_category)
                        }
                        // href={`/shop`}
                        className=" px-4 py-2 "
                      >
                        <span className="flex items-center justify-between text-sm font-medium cursor-pointer">
                          {category.parent_category}
                          {category?.first_child_Category?.length > 0 && <Icon className='text-lg text-black' icon="iconamoon:arrow-right-2-light" />}
                        </span>
                      </a>
                      {/* dropdown */}
                      {category?.first_child_Category?.length > 0 && (
                        <ul
                          className={`${isParentCategoryActive ? "visible" : "hidden"
                            }  absolute mt-2 bg-white left-[299px] bottom-0 shadow-md py-2`}
                        >
                          {category.first_child_Category?.map((child, index) => {
                            const isChildCategoryActive = activeChildCategory === child?.firstChildTitle;
                            return (
                              <li key={index}>
                                <a
                                  onClick={() =>
                                    handelChildeCategoryParams(child?.firstChildTitle)
                                  }
                                  // href="/shop"
                                  className="text-sm cursor-pointer"
                                  onMouseEnter={() =>
                                    handleChildCategoryMouseEnter(child?.firstChildTitle)
                                  }
                                  // onMouseLeave={handleChildCategoryMouseLeave}
                                >
                                  <span className="flex items-center  justify-between text-sm font-medium">
                                    {child?.firstChildTitle}
                                    {child?.secondChilds?.length > 0 && <Icon className='text-lg text-black' icon="iconamoon:arrow-right-2-light" />}
                                  </span>
                                </a>
                                {child?.secondChilds?.length > 0 && (
                                  <ul
                                    className={`${isChildCategoryActive? "visible" : "hidden"
                                      } absolute mt-2 left-[200px] min-h-[245px] bg-white shadow-md py-2`}
                                  >
                                    {child?.secondChilds?.map((child, index) => (
                                      <li key={index} className="flex items-center ml-1">
                                         <Icon icon="lucide:dot" className="text-lg" />
                                        <a
                                          onClick={() =>
                                            handelSecondChildeCategoryParams(child)
                                          }
                                          // href="/shop"
                                          className="text-sm cursor-pointer"
                                        >
                                        <span className=" -ml-4"> {child}</span>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            )

                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </>
          }
        </>
      </ul>
    </div>
  );
};

export default SiebarMenu;
