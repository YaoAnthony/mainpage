import React, { 
    createContext, 
    useContext, 
    useState, 
    ReactNode, 
    Dispatch, 
    SetStateAction 
} from 'react';

// 定义搜索结果的类型
interface SearchResult {
  id: number;
  title: string;
}

interface SearchContextType {
  searchResults: SearchResult[];
  setSearchResults: Dispatch<SetStateAction<SearchResult[]>>;
}

const SearchResultContext = createContext<SearchContextType | null>(null);

export const useSearchResults = () => useContext(SearchResultContext)!;

export const SearchResultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    return (
        <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchResultContext.Provider>
    );
};
