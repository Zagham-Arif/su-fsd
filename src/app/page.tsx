"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import DropdownMenu from "./ui/Dropdown";
import ListItem from "./ui/ListItem";
import { SortByOptions } from "./lib/helper";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof SortByOptions>("createdAt_asc");

  const fetchData = async () => {
    setLoading(true);
    axios.get(`/api/file?sortBy=${sortBy}`)
      .then((response) => {
        setData(response.data.data);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });

  }

  // prod and stage env on vercel, 
  useEffect(() => {
    fetchData();
  }, [sortBy]);
  console.log('data', data)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DropdownMenu selected={sortBy} setSelected={setSortBy} />
      {loading && <div>Loading...</div>}
        <section>
          {data?.length && <ListItem data={data} />}
        </section>
    </div>
  );
}
