import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("/posts/index.json");
      const result = await response.json();
      return result.posts || [];
    },
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    const term = searchTerm.toLowerCase();
    const results = posts?.filter(post => {
      const { title, excerpt, tags } = post.frontmatter;
      return (
        title.toLowerCase().includes(term) || 
        (excerpt && excerpt.toLowerCase().includes(term)) ||
        (tags && tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }) || [];
    
    setSearchResults(results);
    setIsSearching(false);
  }, [searchTerm, posts]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    clearSearch: () => setSearchTerm("")
  };
}
