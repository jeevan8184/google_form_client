import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { QuestionItems } from "./constants";
import { DeleteForever } from "@mui/icons-material";

const HeaderPage = ({ sizes, allFonts, section }) => {
  const [isFocused, setIsFocused] = useState({ header: false, desc: false });
  const [open, setOpen] = useState({ header: false, desc: false });
  const [initVals, setInitVals] = useState({
    header: "Form Header",
    desc: "Event Timing: January 4th-6th, 2016 \n Event Address: 123 Your Street Your City, ST 12345 \n Contact us at (123) 456-7890 or no_reply@example.com",
  });
  const [items, setItems] = useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
  });
  const [items1, setItems1] = useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
  });

  useEffect(() => {
    if (section && section._id) {
      setItems(section?.titleItem);
      setItems1(section?.descItem);
      setInitVals({ header: section.title, desc: section.desc });
    }
  }, [section]);

  const handleItem = (label, setItems) => {
    if (label === "Bold") setItems((prev) => ({ ...prev, bold: !prev.bold }));
    else if (label === "Italic")
      setItems((prev) => ({ ...prev, italic: !prev.italic }));
    else if (label === "Underline")
      setItems((prev) => ({ ...prev, underline: !prev.underline }));
    else if (label === "Link") {
      if (!items.link) setOpen({ ...open, header: true });
    }
  };

  return (
    <div className=" flex flex-col rounded-lg overflow-hidden">
      <div className=" text-white w-fit bg-violet-500 px-2 py-0.5 rounded-tr-lg">
        Section {section.order + 1}
      </div>
      <div className=" h-2.5 w-full bg-violet-500 rounded-tr-lg"></div>
      <div className="flex flex-col gap-4 p-6 shadow bg-white w-full">
        <div
          className="w-full flex flex-col"
          onMouseEnter={() => setIsFocused({ ...isFocused, header: true })}
          onMouseLeave={() => setIsFocused({ ...isFocused, header: false })}
        >
          <TextField
            id="outlined-multiline-flexible"
            multiline
            placeholder="Header"
            variant="standard"
            fullWidth
            size="large"
            InputLabelProps={{
              style: {
                fontSize: sizes.header,
                fontFamily: allFonts.header,
                fontWeight: items.bold ? 800 : 400,
              },
            }}
            inputProps={{
              style: {
                fontSize: sizes.header,
                fontFamily: allFonts.header,
                fontWeight: items.bold ? 800 : 400,
              },
            }}
            onFocus={() => setIsFocused({ ...isFocused, header: true })}
            // onBlur={() => setIsFocused({ ...isFocused, header: false })}
            className={`${items.bold ? " font-bold" : " font-normal"} ${
              items.italic ? "italic" : ""
            } ${items.underline ? "underline" : ""} text-3xl custom_text`}
            value={initVals.header}
            sx={{
              fontWeight: items.bold ? 900 : 400,
            }}
            onChange={(e) =>
              setInitVals({ ...initVals, header: e.target.value })
            }
            maxRows={4}
          />
          <div
            className={`${
              isFocused.header ? "flex" : "hidden"
            } transition-all duration-500 flex-col gap-1`}
          >
            <div className="w-fit flex items-center gap-2 my-1">
              {QuestionItems.map(({ label, icon }, i) => (
                <button
                  title={label}
                  key={i}
                  onClick={() => handleItem(label, setItems)}
                  className={`custom_btn ${
                    (label === "Bold" && items.bold) ||
                    (label === "Italic" && items.italic) ||
                    (label === "Underline" && items.underline) ||
                    (label === "Link" && items.link)
                      ? " bg-gray-300"
                      : ""
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <Divider />
          </div>
        </div>
        <div
          className="w-full flex flex-col"
          onMouseEnter={() => setIsFocused({ ...isFocused, desc: true })}
          onMouseLeave={() => setIsFocused({ ...isFocused, desc: false })}
        >
          <TextField
            id="outlined-multiline-flexible"
            multiline
            placeholder="Header"
            variant="standard"
            fullWidth
            InputLabelProps={{ style: { fontWeight: items1.bold ? 600 : 400 } }}
            inputProps={{ style: { fontWeight: items1.bold ? 600 : 400 } }}
            onFocus={() => setIsFocused({ ...isFocused, desc: true })}
            className={`${items1.bold ? " font-bold" : " font-normal"} ${
              items1.italic ? "italic" : ""
            } ${items1.underline ? "underline" : ""}`}
            value={initVals.desc}
            sx={{
              fontWeight: items1.bold ? 900 : 400,
              fontSize: "2rem",
            }}
            onChange={(e) => setInitVals({ ...initVals, desc: e.target.value })}
            maxRows={4}
          />
          <div
            className={`${
              isFocused.desc ? "flex" : "hidden"
            } transition-all duration-500 flex-col gap-1`}
          >
            <div className="w-fit flex items-center gap-2 my-1">
              {QuestionItems.map(({ label, icon }, i) => (
                <button
                  title={label}
                  key={i}
                  onClick={() => handleItem(label, setItems1)}
                  className={`custom_btn ${
                    (label === "Bold" && items1.bold) ||
                    (label === "Italic" && items1.italic) ||
                    (label === "Underline" && items1.underline) ||
                    (label === "Link" && items1.link)
                      ? " bg-gray-300"
                      : ""
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <Divider />
          </div>
          {section.order !== 0 && (
            <div className=" mt-2">
              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{ textTransform: "none" }}
                  className=" flex gap-2"
                >
                  <DeleteForever /> Delete
                </Button>
              </div>
            </div>
          )}
        </div>
        {open.header && (
          <Dialog
            open={open}
            fullWidth
            onClose={() => setOpen(false)}
            PaperProps={{
              component: "form",
              onSubmit: (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                setItems((prev) => ({ ...prev, link: !prev.link }));
                setOpen(false);
              },
            }}
          >
            <DialogTitle>Add link</DialogTitle>
            <DialogContent className=" w-full flex flex-col gap-2">
              <TextField
                autoFocus
                margin="dense"
                id="text"
                name="text"
                label="Text to display"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="link"
                label="Link to"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button
                style={{ textTransform: "none" }}
                color="grey"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button style={{ textTransform: "none" }} type="submit">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
