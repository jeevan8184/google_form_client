import React from "react";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Items } from "./constants";
import { Button, CircularProgress } from "@mui/material";

const CreateTopBar = ({
  form,
  setIsTheme,
  setOpen,
  isUpdating,
  handleUpdate,
}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className=" flex flex-col">
        <div className="flex justify-between items-center px-8 py-3 max-sm:px-2 max-sm:pb-1">
          <div className="flex items-center gap-4">
            <FiFileText
              className="text-blue-500 cursor-pointer"
              size={45}
              onClick={() => navigate("/")}
              style={{
                padding: "8px",
                backgroundColor: "#eef2f7",
                borderRadius: "50%",
                border: "2px solid #d1d5db",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <h1 className="text-2xl font-medium text-blue-800 max-sm:hidden">
              {form?.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="">
              <Button
                variant="contained"
                fullWidth
                onClick={handleUpdate}
                className="mt-6"
                disabled={isUpdating}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  borderRadius: "10px",
                  textTransform: "none",
                  paddingLeft:"20px",
                  paddingRight:"20px"
                }}
              >
                {isUpdating ? (
                  <CircularProgress size={20} style={{ color: "#fff" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
            {Items.map((item, i) => (
              <div key={i}>
                <button
                  className="flex max-sm:hidden p-2 cursor-pointer transition-all duration-300 hover:bg-gray-200 active:bg-gray-300 rounded-full flex-center"
                  onClick={() => {
                    setIsTheme((prev) => !prev);
                  }}
                >
                  {item.icon}
                </button>
                <button
                  className="flex sm:hidden p-2 cursor-pointer transition-all duration-300 hover:bg-gray-200 active:bg-gray-300 rounded-full flex-center"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {item.icon}
                </button>
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-medium px-8 max-sm:px-2 pb-2 text-blue-800 sm:hidden">
          {form?.name}
        </h1>
      </div>
    </div>
  );
};

export default CreateTopBar;
