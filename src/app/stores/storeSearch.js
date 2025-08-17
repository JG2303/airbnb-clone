import { create } from "zustand";

export const useStoreSearch = create((set)=>({
    searchData: null,
    setSearchData:(data)=> set({searchData: data})
}))