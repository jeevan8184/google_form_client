import { Button, TextField } from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const DropDownPage = ({setdropDownOpts,dropDownOpts,sizes,allFonts}) => {

  return (
    <div className="flex flex-col gap-2">
      {dropDownOpts.map((option,i) => (
        <div key={option._id} className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <p className="">{i+1}</p>
            <TextField
              id="outlined-multiline-flexible"
              variant="standard"
              fullWidth
              InputLabelProps={{style:{fontSize:sizes.text,fontFamily:allFonts.text}}}
              inputProps={{style: {fontSize:sizes.text,fontFamily:allFonts.text}}}
              value={option.text}
              onChange={(e) => {
                setdropDownOpts((options) =>
                  options.map((opt) =>
                    opt._id === option._id
                      ? { ...opt, text: e.target.value }
                      : opt
                  )
                );
              }}
            />
            <div
              className="custom_btn"
              onClick={() =>
                setdropDownOpts((options) =>
                  options.filter((opt) => opt._id !== option._id)
                )
              }
            >
              <MdClose size={24} />
            </div>
          </div>
        </div>
      ))}
      <Button
        className="w-fit"
        style={{ textTransform: "none" }}
        onClick={() => {
          const newOption = {
            id: dropDownOpts.length + 1,
            text: `option ${dropDownOpts.length + 1}`,
          };
          setdropDownOpts((prev) => [...prev, newOption]);
        }}
      >
        Add option
      </Button>
    </div>
  );
};

export default DropDownPage;

