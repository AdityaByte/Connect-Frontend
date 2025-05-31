import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchBox = () => {
    return (
        <div className="relative w-[80%] h-[10%] mx-3 p-2 flex justify-center items-center">
            <input type="search" className="bg-[#413A3A] absolute px-4 py-2 w-full border" placeholder="Search..." />
            <FaSearch className="absolute right-2 cursor-pointer hover:text-blue-200 active:text-blue-400"  size={20}/>
        </div>
    )
}

export default SearchBox