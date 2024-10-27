import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate=useNavigate();
  const [allForms, setAllForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/form/allForms`
      );
      if (response) {
        console.log("all forms", response.data);
        setAllForms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      setFilteredData([]);
    } else {
    //   allusers.length>0 && allusers.forEach((user)=> {
    //     if(user.username.toLowerCase().includes(value.toLowerCase())) {
    //       setFilteredData((filteredData)=> {
    //         const exists=filteredData.some((item)=> item._id===user._id);
    //         if(exists) {
    //           return filteredData;
    //         }else{
    //           return [...filteredData, user];
    //         }
    //       })
    //     } else {
    //       setFilteredData((filteredData)=> filteredData.filter((u)=> u._id !== user._id));
    //     }
    //   })
    }
  };

  return (
    <div className=" lg:w-[500px] sm:w-[360px] w-full max-w-xl  h-full flex justify-start items-start p-2">
      <div className="max-w-xl w-full relative">
        <div className="relative flex items-center">

          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <IoIosSearch size={26} />
          </span>

          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search here..."
            className="w-full pl-10 pr-10 py-2 border rounded-full shadow-sm border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query && (
            <span
             onClick={()=> setQuery("")}
             className="absolute right-3 top-1/2 transform -mr-2.5 -translate-y-1/2 text-gray-400 cursor-pointer p-2 hover:bg-gray-200 rounded-full">
                <MdClose size={24} />
            </span>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="z-40 absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
            {filteredData.map((form) => (
              <div
                key={form._id}
                onClick={(e)=> navigate(`/create/${form._id}`)}
                className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
              >
                <p className="">{form.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

