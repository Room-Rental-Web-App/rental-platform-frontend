import { useEffect } from "react";

export default function useInfiniteScroll({ hasMore, loading, onLoadMore }) {
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 &&
        hasMore &&
        !loading
      ) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loading, onLoadMore]);
}
