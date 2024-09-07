import React, { useContext, useState } from "react";
import { getCategories } from "../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "./LoadingComponets";
import CreateContext from "../Components/CreateContex";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";

const CatagoryMenu = ({ toggleDrawerCatagory, toggle = false }) => {
  const router = useRouter();
  const { query } = router;
  const { setQueryFromCategory } = useContext(CreateContext);
  const [active, setActive] = useState("");
  const [activeChildCategory, setActiveChildCategory] = useState("");
  const [showSecondChild, setShowSecondChild] = useState({});

  const { data: catagories, isLoading } = useQuery(["category"], getCategories);

  if (isLoading) {
    return (
      <div className="block md:hidden">
        <LoadingComponets />
      </div>
    );
  }
  const handleCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
    router.push({
      pathname: "/shop",
      query: {
        categories: cat,
      },
    });
  };
  const handleChildCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("first_child_category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
    router.push({
      pathname: "/shop",
      query: {
        categories: active,
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
        categories: active,
        subCategories: activeChildCategory,
        subChildCategories: cat,
      },
    });
  };

  const toggleSecondChild = (firstChildTitle) => {
    setShowSecondChild((prev) => ({
      ...prev,
      [firstChildTitle]: !prev[firstChildTitle],
    }));
  };

  return (
    <ul
      className="py-2 bg-primary w-full uppercase overflow-hidden font-bold lg:h-[350px] overflow-y-scroll avenir2"
      id="test-catagory-menus"
    >
      {catagories?.data?.result?.map((category) => (
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          key={category.parent_category}
        >
          <summary
            onClick={() => setActive(category?.parent_category)}
            className={`flex cursor-pointer items-center justify-between border-b font-bold border-white/20 text-white px-4 py-2 avenir2 ${
              active === category.parent_category
                ? "bg-opacity-100"
                : "bg-opacity-0"
            }`}
          >
            <a
              onClick={() => {
                handleCategoryParams(category?.parent_category);
                if (toggle) {
                  toggleDrawerCatagory();
                }
              }}
              // href={"/shop"}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-sm font-bold">
                {category?.parent_category}
              </span>
            </a>

            {category?.first_child_Category.length > 0 && (
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </summary>
          {category?.first_child_Category.length > 0 && (
            <nav aria-label="Teams Nav" className="flex flex-col px-4">
              {category?.first_child_Category.map((child) => (
                <div key={child.firstChildTitle}>
                  <div className="w-full flex items-center justify-between text-xs text-white font-medium">
                    <a
                      onClick={() => {
                        handleChildCategoryParams(child?.firstChildTitle);
                        setActiveChildCategory(child?.firstChildTitle);
                        setActive(category.parent_category);
                        if (toggle) {
                          toggleDrawerCatagory();
                        }
                      }}
                      // href={"/shop"}
                      className={`flex items-center cursor-pointer gap-2 text-white py-2 ${
                        activeChildCategory === child?.firstChildTitle ? "" : ""
                      }`}
                    >
                      <span className="text-xs font-medium">
                        <span>- {child?.firstChildTitle}</span>
                      </span>
                    </a>
                    {child?.secondChilds?.length > 0 && (
                      <span
                        onClick={() =>
                          toggleSecondChild(child?.firstChildTitle)
                        }
                      >
                        <svg
                          onClick={() =>
                            setActiveChildCategory(child?.firstChildTitle)
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transform transition-transform duration-200 text-white/40 ${
                            showSecondChild[child?.firstChildTitle]
                              ? "rotate-180"
                              : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  {child?.secondChilds?.map((data, index) => (
                    <a
                      key={index}
                      onClick={() => {
                        handelSecondChildeCategoryParams(data);
                        // setActive(category.parent_category);
                        if (toggle) {
                          toggleDrawerCatagory();
                        }
                      }}
                      // href={"/shop"}
                      className={`flex items-center gap-2 text-white px-4 py-2 duration-200 cursor-pointer ${
                        showSecondChild[child?.firstChildTitle]
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      <span className="text-xs font-medium w-full flex items-center">
                        <Icon icon="lucide:dot" className="text-lg" />
                        <span className="ml-1">{data}</span>
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          )}
        </details>
      ))}
    </ul>
  );
};

export default CatagoryMenu;
