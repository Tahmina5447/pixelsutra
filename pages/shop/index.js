import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCategories, products } from "../../lib/helper";
import SliderInHeader from "../../src/Components/Home/Banner/SliderInHeader";
import ProductCard from "../../src/Shared/ProductCard";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FilterByCategoryRow from "../../src/Components/Shop/FilterByCategoryRow";
import FilterBySubCategory from "../../src/Components/Shop/FilterBySubCategory";
import { AiFillFilter } from "react-icons/ai";
import ShopPageDrawer from "../../src/Shared/drawer/ShopPageDrawer";
import CreateContext from "../../src/Components/CreateContex";
import CustomPagination from "../../src/Shared/CustomPagination";
import LoadingComponets from "../../src/Shared/LoadingComponets";
import CustomProductSectionSkeleton from "../../src/Components/CustomSkeleton/CustomProductSectionSkeleton";
import { Icon } from "@iconify/react";
import FilterBySecondChildCategory from "../../src/Components/Shop/FilterBySecondChildCategory";
import ShopPagination from "../../src/Shared/ShopPageniation";
import { useRouter } from "next/router";
const Shop = () => {
  const router = useRouter();
  const { query } = router;
  const { queryFromCategory } = useContext(CreateContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubChildCategories, setSelectedSubChildCategories] = useState(
    []
  );
  
  useEffect(() => {
    if (query.categories) {
      setSelectedCategories(query.categories.split(","));
    }
    if (query.subCategories) {
      setSelectedSubCategories(query.subCategories.split(","));
    }
    if (query.subChildCategories) {
      setSelectedSubChildCategories(query.subChildCategories.split(","));
    }
  }, [query]);

  useEffect(() => {
    if (!query.subCategories) {
      setSelectedSubCategories([]);
    }
    if (!query.subChildCategories) {
      setSelectedSubChildCategories([]);
    }
  }, [query]);

  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);
    router.push({
      pathname: "/shop",
      query: { categories: newSelectedCategories.join(",") },
    });
  };
  const handleSubCategoryChange = (subCategory) => {
    const newSelectedSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter((cat) => cat !== subCategory)
      : [...selectedSubCategories, subCategory];

    setSelectedSubCategories(newSelectedSubCategories);
    router.push({
      pathname: "/shop",
      query: {
        categories: selectedCategories.join(","),
        subCategories: newSelectedSubCategories.join(","),
      },
    });
  };

  const handleSubChildCategoryChange = (subChildCategories) => {
    const newSelectedSubChildCategories = selectedSubChildCategories.includes(
      subChildCategories
    )
      ? selectedSubChildCategories.filter((cat) => cat !== subChildCategories)
      : [...selectedSubChildCategories, subChildCategories];

    setSelectedSubChildCategories(newSelectedSubChildCategories);
    router.push({
      pathname: "/shop",
      query: {
        categories: selectedCategories.join(","),
        subCategories: selectedSubCategories.join(","),
        subChildCategories: newSelectedSubChildCategories.join(","),
      },
    });
  };

  // -------------end

  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const [queryFilterPriceSubCategory, setQueryFilterPriceSubCategory] =
    useState("");
  const [
    queryFilterPriceSubChildCategory,
    setQueryFilterPriceSubChildCategory,
  ] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const fetchProducts = useCallback(
    () =>
      products(
        `${queryFilterPrice}${queryFilterPriceSubCategory}${queryFilterPriceSubChildCategory}${filterPrice}&page=${page}&limit=${itemsPerPage}`
      ),
    [
      queryFilterPrice,
      queryFilterPriceSubCategory,
      queryFilterPriceSubChildCategory,
      filterPrice,
      page,
    ]
  );

  const newCurrentItems = [...currentItems]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const { data, isLoading, refetch, isError } = useQuery(
    [
      "products",
      queryFilterPrice,
      queryFilterPriceSubCategory,
      queryFilterPriceSubChildCategory,
      filterPrice,
      page,
    ],
    fetchProducts,
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 10000,
    }
  );

  const {
    data: categories,
    isLoading: categoryLoading,
    refetch: categoryRefetch,
  } = useQuery(["category"], getCategories);

  const filteredCategories = categories?.data?.result?.filter((category) =>
    selectedCategories?.includes(category?.parent_category)
  );

  const allSecondChilds = categories?.data?.result
    ?.filter((category) =>
      category.first_child_Category.some((childCategory) =>
        selectedSubCategories?.includes(childCategory?.firstChildTitle)
      )
    )
    .flatMap((category) =>
      category.first_child_Category
        .filter((childCategory) =>
          selectedSubCategories?.includes(childCategory?.firstChildTitle)
        )
        .flatMap((childCategory) => childCategory?.secondChilds)
    );

  // for when click any category
  useEffect(() => {
    if (queryFromCategory.length > 0) {
      setQueryFilterPrice(queryFromCategory);
      setPage(1); // Reset to the first page when filter changes
      refetch();
    } else {
      setQueryFilterPrice("");
      refetch();
    }
  }, [queryFromCategory, refetch]);

  useEffect(() => {
    if (data?.data?.products) {
      setCurrentItems(data.data.products);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFilterByPrice = (e) => {
    e.preventDefault();
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    setFilterPrice(`&salePrice[gte]=${minPrice}&salePrice[lte]=${maxPrice}`);
    setPage(1); // Reset to the first page when filter changes
    refetch();
  };

  const handlePriceSort = (e) => {
    const value = e.target.value;
    setQueryFilterPrice(value === "lth" ? `sort=salePrice` : `sort=-salePrice`);
    setPage(1); // Reset to the first page when sort changes
    refetch();
  };
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const leftSideBar = (
    <div className="overflow-scroll h-[90vh] md:h-full border-r mr-1.5">
      <form onSubmit={handleFilterByPrice} className="bg-white p-3">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">Filter By Price</h3>
        </div>
        <div className="filter-body">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              {...register("minPrice", { required: true })}
              placeholder="Min - 00"
              className="w-full block h-11 rounded-md bg-[#f5f5f5] text-center text-[#555] text-sm"
            />

            <input
              type="number"
              placeholder="Max - 5k"
              {...register("maxPrice", { required: true })}
              className="w-full block h-11 rounded-md bg-[#f5f5f5] text-center text-[#555] text-sm "
            />
          </div>
        </div>

        <div className=" mt-3 mb-1">
          <button
            type="submit"
            className="text-sm flex items-center justify-center w-full gap-1 text-[#39404a] px-3 py-[6px] rounded-md bg-[#e8e8e8] outline-none duration-150 hover:bg-primary hover:text-white"
          >
            <FaSearch />
            <span className="font-bold">Search</span>
          </button>
        </div>
      </form>
      <div className="bg-white p-3">
        <div className="pb-3">
          <h3 className="text-[#39404a] font-bold text-sm ">
            Filter By Category
          </h3>
        </div>
        {/* filter by category */}
        <FilterByCategoryRow
          setQueryFilterPrice={setQueryFilterPrice}
          categories={categories}
          refetch={refetch}
          onChange={handleCategoryChange}
          selectedCategories={selectedCategories}
        />
      </div>
      {filteredCategories?.length > 0 && (
        <div className="bg-white p-3">
          <div className="pb-3">
            <h3 className="text-[#39404a] font-bold text-sm ">More Filter</h3>
          </div>
          <FilterBySubCategory
            categories={filteredCategories}
            selectedCategories={selectedSubCategories}
            refetch={refetch}
            onChange={handleSubCategoryChange}
            setQueryFilterPriceSubCategory={setQueryFilterPriceSubCategory}
          />
        </div>
      )}

      {allSecondChilds?.length > 0 && (
        <div className="bg-white p-3">
          <div className="pb-3">
            <h3 className="text-[#39404a] font-bold text-sm ">More Filter</h3>
          </div>
          <FilterBySecondChildCategory
            categories={allSecondChilds}
            setQueryFilterPriceSubChildCategory={
              setQueryFilterPriceSubChildCategory
            }
            refetch={refetch}
            onChange={handleSubChildCategoryChange}
            selectedSubChildCategories={selectedSubChildCategories}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="">
      <div className="px-2 md:px-10 ">
        <div className="py-0 md:py-5">
          <div className="flex gap-10">
            <div className=" w-full">
              <div className="flex items-center justify-between my-5 md:pb-3 pt-0 md:pt-1">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="hidden  text-xs md:text-[16px] cursor-pointer lg:flex justify-center items-center "
                >
                  Filter{" "}
                  <Icon className="ml-2" icon="iconamoon:arrow-right-2-fill" />
                </button>
                <div
                  onClick={toggleDrawer}
                  className=" text-xs md:text-[16px] cursor-pointer lg:hidden flex justify-center items-center  "
                >
                  Filter{" "}
                  <Icon className="ml-2" icon="iconamoon:arrow-right-2-fill" />
                </div>
                <span className=" text-xs md:text-[16px]  -ml-12 avenir2">
                  {data?.data?.products?.length} Products
                </span>
                <div className="flex gap-3 items-center"></div>
              </div>
              <div className="lg:flex mt-3">
                <div
                  className={
                    showFilter === true ? "w-[30%] xl:w-[23%] block" : "hidden"
                  }
                >
                  {leftSideBar}
                </div>
                {data?.data?.products?.length === 0 ? (
                  <>
                    <div className="flex items-center h-[50vh] w-full justify-center">
                      <span className="text-xl font-bold text-black/40 ">
                        Product Not Available
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {!isLoading ? (
                      <div className="w-full">
                        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-5 w-full">
                          {newCurrentItems?.map((item) => (
                            <div className="flex justify-center w-full">
                              {" "}
                              <ProductCard
                                key={item._id}
                                product={item}
                              ></ProductCard>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center">
                          <ShopPagination
                            totalItems={data?.data?.total}
                            itemsPerPage={itemsPerPage}
                            currentPage={page}
                            onPageChange={(newPage) => setPage(newPage)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        <CustomProductSectionSkeleton />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShopPageDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        dir={"left"}
        leftSideBar={leftSideBar}
      ></ShopPageDrawer>
    </div>
  );
};

export default Shop;
