import React, { useRef, useState } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cards } from "../../data";
function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const minRef = useRef();
  const maxRef = useRef();
  const location = useLocation();
const { search } = location;

console.log(location);

  const { data, isLoading, error ,refetch} = useQuery({
    queryKey: ["gigs",search, sort],
  queryFn: async () => {
  const res = await newRequest.get(
    `/gigs${search}${
      search ? "&" : "?"
    }min=${minRef.current?.value || ""}&max=${
      maxRef.current?.value || ""
    }&sort=${sort}`
  );

  return res.data;
},
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
 
  const apply = () => {
    refetch();
  };

  console.log("Fetched Gigs:", data);
  const [searchParams] = useSearchParams();

const categorySlug = searchParams.get("cat");

const currentCategory = cards.find(
  (card) => card.cat === categorySlug
);

const pageTitle = currentCategory?.title || "All Services";

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1400px] py-[30px] flex flex-col gap-4 px-4">

        {/* BREADCRUMBS */}
       <span className="text-xs uppercase text-gray-600 font-light">
  Fiverr &gt; Categories &gt; {pageTitle}
</span>

<h1 className="text-3xl font-medium">
  {pageTitle}
</h1>

        

       <p className="text-gray-400 font-light">
  Explore top-quality {pageTitle.toLowerCase()} services from professional freelancers.
</p>

        {/* MENU */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-4">

          {/* LEFT FILTER */}
          <div className="flex items-center gap-2 text-gray-600 font-light flex-wrap">
            <span>Budget</span>

            <input
              ref={minRef}
              type="number"
              placeholder="min"
              className="p-1 border border-gray-300 rounded outline-none placeholder-gray-400"
            />

            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              className="p-1 border border-gray-300 rounded outline-none placeholder-gray-400"
            />

            <button
              onClick={apply}
              className="px-3 py-1 bg-[#1dbf73] text-white font-medium rounded"
            >
              Apply
            </button>
          </div>

          {/* RIGHT SORT */}
          <div className="relative flex items-center gap-2">
            <span className="text-gray-500 font-light">Sort by</span>

            <span className="font-medium">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>

            <img
              src="/img/down.png"
              alt="Sort"
              onClick={() => setOpen(!open)}
              className="w-4 cursor-pointer"
            />

            {open && (
              <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded p-4 flex flex-col gap-4 text-gray-600 z-10 min-w-[150px]">
                {sort === "sales" ? (
                  <span
                    className="cursor-pointer hover:text-black"
                    onClick={() => reSort("createdAt")}
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    className="cursor-pointer hover:text-black"
                    onClick={() => reSort("sales")}
                  >
                    Best Selling
                  </span>
                )}

                <span
                  className="cursor-pointer hover:text-black"
                  onClick={() => reSort("sales")}
                >
                  Popular
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CARDS */}
        <div className="flex flex-wrap justify-between gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong!</p>
          ) : (
            data?.map((gig) => (
              <GigCard
                key={gig._id}
                item={gig}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Gigs;