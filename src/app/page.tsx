"use client"
import { useCallback, useEffect, useState } from "react";
import { CSVFile } from "./interfaces/file";
import { APIResource } from "./lib/axiosInstance";
import { SortByOptions } from "./lib/helper";
import DropdownMenu from "./ui/Dropdown";
import ListFiles from "./ui/List";
import Loader from "./ui/Loader";

export default function Home() {
  const [data, setData] = useState<CSVFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof SortByOptions>("createdAt_asc");

  const fetchData = useCallback(async () => {
    setLoading(true);
    APIResource.get(`/api/file?sortBy=${sortBy}`)
      .then((response) => {
        setData(response.data);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });

  }, [sortBy])

  // prod and stage env on vercel
  useEffect(() => {
    fetchData();
  }, [fetchData, sortBy]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DropdownMenu selected={sortBy} setSelected={setSortBy} />
      {!!loading && <Loader />}
      <section>
        {!!data?.length && <ListFiles data={data} />}
      </section>
    </div>
  );
}
