import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdClose, MdImage } from "react-icons/md";

const CheckBoxPage = ({ checkBoxOpts, setcheckBoxOpts,sizes,allFonts }) => {
  const [currentOptionId, setCurrentOptionId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  console.log("checkBoxOpts", checkBoxOpts, currentOptionId);
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const optionId = currentOptionId;
      if (!optionId) return;

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setIsUploading(true);
          const response = await axios.post(
            `${process.env.REACT_APP_URL}/form/upload`,
            { data: reader.result }
          );
          if (response.data) {
            setcheckBoxOpts((options) =>
              options.map((opt) =>
                opt._id === optionId ? { ...opt, image: response.data } : opt
              )
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [currentOptionId, setcheckBoxOpts]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col gap-2">
      {checkBoxOpts.map((option) => (
        <div key={option._id} className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <CheckBoxOutlineBlank />
            <TextField
              id="outlined-multiline-flexible"
              variant="standard"
              fullWidth
              InputLabelProps={{style:{fontSize:sizes.text,fontFamily:allFonts.text}}}
              inputProps={{style: {fontSize:sizes.text,fontFamily:allFonts.text}}}
              value={option.text}
              onChange={(e) => {
                setcheckBoxOpts((options) =>
                  options.map((opt) =>
                    opt._id === option._id
                      ? { ...opt, text: e.target.value }
                      : opt
                  )
                );
              }}
            />
            <div
              {...getRootProps({
                onClick: () => setCurrentOptionId(option._id),
              })}
              className="custom_btn"
            >
              <input {...getInputProps()} />
              <MdImage size={24} />
            </div>
            <div
              className="custom_btn"
              onClick={() =>
                setcheckBoxOpts((options) =>
                  options.filter((opt) => opt._id !== option._id)
                )
              }
            >
              <MdClose size={24} />
            </div>
          </div>
          {(isUploading && currentOptionId===option._id) ? (
            <div className="flex-center h-10 w-full ">
              <CircularProgress size={24} />
            </div>
          ) : (
            <div className="">
              {option.image && (
                <div className="px-4 relative h-40 w-fit">
                  <div
                    className="absolute top-0 right-0 bg-gray-200 custom_btn"
                    onClick={() =>
                      setcheckBoxOpts((options) =>
                        options.map((opt) =>
                          opt._id === option._id ? { ...opt, image: null } : opt
                        )
                      )
                    }
                  >
                    <MdClose size={24} />
                  </div>
                  <img
                    src={option.image}
                    className="w-full h-full object-contain"
                    alt="img"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <Button
        className="w-fit"
        style={{ textTransform: "none" }}
        onClick={() => {
          const newOption = {
            id: checkBoxOpts.length + 1,
            text: `option ${checkBoxOpts.length + 1}`,
            image: null,
          };
          setcheckBoxOpts((prev) => [...prev, newOption]);
        }}
      >
        Add option
      </Button>
    </div>
  );
};

export default CheckBoxPage;

