import Head from "next/head";
import { useState } from "react";
import ProductSection from "../../src/Components/ProductSection/ProductSection";
import server_url from "../../lib/config";
import { useCustomQuery } from "../../src/hooks/useMyShopData";
import ProductCard from "../../src/Shared/ProductCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticProps() {
  const [discountedProductsData] = await Promise.all([
    fetch(`${server_url}/product?status=true&sort=-createdAt&limit=10`).then(
      (res) => res.json()
    ),
  ]);

  return {
    props: {
      discountedProducts: discountedProductsData,
    },
    revalidate: 1500,
  };
}

export default function Offer({ discountedProducts }) {
  const [userInterest, setUserInterest] = useState("");
  const [sliceItem, setSliceItem] = useState(12);

  const { data: userProducts, isLoading } = useCustomQuery(
    ["products", userInterest],
    `product/user-interested-product?interest=${userInterest}`
  );

  const discountedProductsData = discountedProducts?.data?.products;
  let productsWithDiscount = [];

  if (Array.isArray(discountedProductsData)) {
    productsWithDiscount = discountedProductsData.filter(
      (product) => product.discount > 0
    );
    // console.log("ppppppppppppp", productsWithDiscount);
  } else {
    console.log(
      "No products available or the data is not in the expected format."
    );
  }

  return (
    <>
      <Head>
        <title>Pixels</title>
        <meta name="description" content="Best e-commerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center mb-1 mt-6">
        <h1 className="text-text-xl md:text-[28px] capitalize  mb-1 avenir3">
          Offer Sale
        </h1>
      </div>
      <div className="mt-6">
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto gap-1 md:gap-3 lg:gap-5">
          {productsWithDiscount?.slice(0, sliceItem)?.map((item) => (
            <div key={item._id} className="flex justify-center">
              <ProductCard product={item}></ProductCard>
            </div>
          ))}
        </div>
      </div>
      {productsWithDiscount?.length > sliceItem &&
        productsWithDiscount?.length !== sliceItem && (
          <div className="text-center py-5 ">
            <button
              onClick={() => setSliceItem((prev) => prev + 8)}
              className="inline-block py-1 text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
            >
              VIEW MORE
            </button>
          </div>
        )}
    </>
  );
}
