import React, { useContext, useEffect } from "react";

import LeftNav from "../components/LeftNav";
import VideoCard from "../components/VideoCard";
import { DataContext } from "../context/contextApi";
import OfflineComponent from "../shared/OfflineComponent";
import ShimmerVideoCard from "../shared/ShimmerVideoCard";
import UseOnline from "../utils/UseOnline";

const Feed = () => {
  const { loading, searchResults } = useContext(DataContext);
  const isOnline = UseOnline();

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex h-[calc(100%-56px)]">
      <LeftNav />

      {!isOnline && (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <OfflineComponent />
        </div>
      )}
      {isOnline && (
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {loading
              ? Array(30)
                  .fill("")
                  .map((e, index) => {
                    return <ShimmerVideoCard key={index} />;
                  })
              : searchResults.map((item, index) => {
                  if (item.type !== "video") return false;
                  return <VideoCard key={index} video={item?.video} />;
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
