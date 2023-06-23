"use client";

import axios from "axios";

export default function Post() {
  const handleClick = async () => {
    const res = await axios.get("http://localhost:3000/");
    console.log("res.data :", res.data);
  };

  return (
    <>
      <div>
        <h3>post page</h3>
      </div>
      <div>
        <button
          className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
          onClick={handleClick}
        >
          handleClick
        </button>
      </div>
    </>
  );
}
