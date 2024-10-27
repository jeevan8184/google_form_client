import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { MdImage } from "react-icons/md";
import { fontFamilies, QuestionItems, UPDATE } from "./constants";
import { IoMdMore } from "react-icons/io";
import {
  Add,
  ArrowDropDownCircle,
  CalendarMonth,
  CheckBox,
  CloudUpload,
  Delete,
  Edit,
  QuestionAnswer,
  RadioButtonChecked,
  Schedule,
  Segment,
} from "@mui/icons-material";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import CheckBoxPage from "./CheckBoxPage";
import DropDownPage from "./DropDownPage";
import ChoicesPage from "./ChoicesPage";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";

const Question = ({ sizes, allFonts, question,form,section,setForm }) => {
  const update=useSelector((state)=> state?.reducer?.update);
  const dispatch=useDispatch();
  const [initVals, setInitVals] = useState({
    question: "Question name",
    pic: "",
    answerType: "answer",
  });

  const [items, setItems] = useState({
    bold: false,
    italic: false,
    underline: false,
    // link: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [checkBoxOpts, setcheckBoxOpts] = useState([
    { _id: 1, text: "option 1", image: null },
    { _id: 2, text: "option 2", image: null },
  ]);
  const [choicesOpts, setchoicesOpts] = useState([
    { _id: 1, text: "option 1", image: null },
    { _id: 2, text: "option 2", image: null },
    { _id: 3, text: "option 3", image: null },
    { _id: 4, text: "option 4", image: null },
  ]);
  const [dropDownOpts, setdropDownOpts] = useState([
    { _id: 1, text: "option 1" },
    { _id: 2, text: "option 2" },
  ]);

  const handleUpdate=async()=>{

    try {
      question.question=initVals.question;
      question.pic=initVals.pic;
      question.answerType=initVals.answerType;
      question.items=items;
      if(initVals.answerType==="choices") {
        question.options=choicesOpts;
      }else if(initVals.answerType==="dropdown") {
        question.options=dropDownOpts;
      }else if(initVals.answerType==="checkbox") {
        question.options=checkBoxOpts;
      }

      const updatedQuestions=section.map((q)=> q._id===question._id ? question : q);
      section.push(updatedQuestions);
      const sections=form.sections.map((s)=> s._id===section._id ? section : s);

      const response = await axios.post(`${process.env.REACT_APP_URL}/form/addSection`, {
        sections,
        formId:form._id,
        sizes,
        allFonts:{
          header: fontFamilies[allFonts.header],
          question: fontFamilies[allFonts.question],
          text: fontFamilies[allFonts.text],
        }
      });
      if(response) {
        setForm(Response.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    if(update) {
      handleUpdate();
      dispatch({type: UPDATE, payload: false});
    }
  },[update]);

  useEffect(() => {
    if (question) {
      setInitVals({
        question: question.question,
        answerType: question.answerType,
        pic: question?.pic,
      });
      question?.items && setItems(question?.items);
      if (question.answerType === "choices") {
        setchoicesOpts(question.options);
      } else if (question.answerType === "checkbox") {
        setcheckBoxOpts(question.options);
      } else if (question.answerType === "dropdown") {
        setdropDownOpts(question.options);
      }
    }
  }, [question]);

  const handleItem = (label) => {
    if (label === "Bold") setItems((prev) => ({ ...prev, bold: !prev.bold }));
    else if (label === "Italic")
      setItems((prev) => ({ ...prev, italic: !prev.italic }));
    else if (label === "Underline")
      setItems((prev) => ({ ...prev, underline: !prev.underline }));
    // else if (label === "Link") {
    //   if (!items.link) {
    //     setOpen(true);
    //   }else {
    //     setOpen(false);
    //   setItems((prev) => ({ ...prev, link: !prev.link }));
    //   }
    // }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setIsUploading(true);
        setAnchorEl(null);
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/form/upload`,
          {
            data: reader.result,
          }
        );
        if (response) {
          setInitVals({ ...initVals, pic: response.data });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div className="flex p-6 rounded-lg shadow bg-white w-full cursor-all-scroll">
      <div className="cursor-auto w-full flex flex-col flex-1">
        <div className=" flex flex-col gap-2">
          <div className="flex gap-2 py-2 px-1 max-sm:gap-3 max-sm:flex-col">
            <div className="flex items-start w-full gap-3">
              <div
                className="w-full flex flex-col"
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
              >
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  placeholder="Question"
                  variant="standard"
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontSize: sizes.question,
                      fontFamily: allFonts.question,
                      fontWeight: items.bold ? 600 : 400,
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: sizes.question,
                      fontFamily: allFonts.question,
                      fontWeight: items.bold ? 600 : 400,
                    },
                  }}
                  onFocus={() => setIsFocused(true)}
                  // onBlur={() => setIsFocused(false)}
                  className={`${items.bold ? " font-bold" : " font-normal"} ${
                    items.italic ? "italic" : ""
                  } ${items.underline ? "underline" : ""}`}
                  value={initVals.question}
                  content={parse(initVals.question)}
                  onChange={(e) =>
                    setInitVals({ ...initVals, question: e.target.value })
                  }
                  maxRows={4}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: initVals.question }}
                  />
                </TextField>
                <div
                  className={`${
                    isFocused ? "flex" : "hidden"
                  } transition-all duration-500 flex-col gap-1`}
                >
                  <div className="w-fit flex items-center gap-2 my-1">
                    {QuestionItems.map(({ label, icon }, i) => (
                      <button
                        title={label}
                        key={i}
                        onClick={() => handleItem(label)}
                        className={`custom_btn ${
                          label === "Bold" && items.bold ? " bg-gray-300" : ""
                        } ${
                          label === "Italic" && items.italic
                            ? " bg-gray-300"
                            : ""
                        } ${
                          label === "Underline" && items.underline
                            ? " bg-gray-300"
                            : ""
                        }
                        `}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <Divider />
                </div>
              </div>
              {!initVals.pic && (
                <div {...getRootProps()} className=" custom_btn">
                  <input {...getInputProps()} />
                  <MdImage size={24} />
                </div>
              )}
            </div>
            <div className="w-3/12 max-sm:w-1/2">
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={initVals.answerType}
                  onChange={(e) =>
                    setInitVals({ ...initVals, answerType: e.target.value })
                  }
                  size="small"
                >
                  <MenuItem value="answer" className=" flex gap-2">
                    <QuestionAnswer /> Short answer
                  </MenuItem>
                  <MenuItem value="paragraph" className=" flex gap-2">
                    <Segment /> Paragraph
                  </MenuItem>
                  <MenuItem value="file" className=" flex gap-2">
                    <CloudUpload /> File upload
                  </MenuItem>
                  <MenuItem value="time" className=" flex gap-2">
                    <Schedule /> Time
                  </MenuItem>
                  <MenuItem value="date" className=" flex gap-2">
                    <CalendarMonth /> Date
                  </MenuItem>
                  <MenuItem value="dropdown" className=" flex gap-2">
                    <ArrowDropDownCircle /> Dropdown
                  </MenuItem>
                  <MenuItem value="checkbox" className=" flex gap-2">
                    <CheckBox /> Checkbox
                  </MenuItem>
                  <MenuItem value="choices" className=" flex gap-2">
                    <RadioButtonChecked /> Multiple choices
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {/* Image with More Options Menu */}
          <div className="">
            {isUploading ? (
              <div className="flex-center h-10 w-full ">
                <CircularProgress size={24} />
              </div>
            ) : (
              <div className="">
                {initVals.pic && (
                  <div className="relative w-full h-60">
                    <div
                      className="absolute top-0 left-0 bg-gray-200 hover:bg-gray-300 custom_btn"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                      <IoMdMore size={20} />
                    </div>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setAnchorEl(null);
                          setInitVals({ ...initVals, pic: "" });
                        }}
                        disableRipple
                      >
                        <Delete /> Remove{" "}
                      </MenuItem>
                      <MenuItem
                        onClick={() => setAnchorEl(null)}
                        disableRipple
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <Edit /> Change
                      </MenuItem>
                    </Menu>
                    <img
                      src={initVals.pic}
                      alt="img"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {/* part3 */}

          <div className=" my-2">
            {initVals.answerType === "answer" ? (
              <div className=" flex flex-col gap-10 px-1">
                <p
                  className=" text-gray-400  border-b-2 border-b-gray-400 border-dotted"
                  style={{ fontSize: sizes.text, fontFamily: allFonts.text }}
                >
                  Short answer text
                </p>
                <p className=" text-gray-400  border-b-2 border-b-gray-400 border-dotted"></p>
              </div>
            ) : initVals.answerType === "paragraph" ? (
              <div className=" flex flex-col gap-10 px-1">
                <p
                  className=" text-gray-400  border-b-2 border-b-gray-400 border-dotted"
                  style={{ fontSize: sizes.text, fontFamily: allFonts.text }}
                >
                  Long answer text
                </p>
                <p className=" text-gray-400  border-b-2 border-b-gray-400 border-dotted"></p>
              </div>
            ) : initVals.answerType === "time" ? (
              <div className=" flex flex-col gap-10 px-1">
                <p
                  className=" text-gray-400 w-4/12 flex-between  border-b-2 border-b-gray-400 border-dotted"
                  style={{ fontSize: sizes.text, fontFamily: allFonts.text }}
                >
                  Time <Schedule />{" "}
                </p>
                <p className=" text-gray-400  border-b-2 border-b-gray-400 border-dotted"></p>
              </div>
            ) : initVals.answerType === "date" ? (
              <div className=" flex flex-col gap-10 px-1">
                <p
                  className=" text-gray-400 w-4/12 flex-between  border-b-2 border-b-gray-400 border-dotted"
                  style={{ fontSize: sizes.text, fontFamily: allFonts.text }}
                >
                  Month,day,year <Schedule />{" "}
                </p>
                <p className=" text-gray-400  border-b-2 border-b-gray-400 border-dotted"></p>
              </div>
            ) : initVals.answerType === "file" ? (
              <div className=" flex flex-col">
                <p className=" text-gray-400 w-4/12 flex-between  border-b-2 border-b-gray-400 border-dotted">
                  File <CloudUpload />{" "}
                </p>
                <div className=" my-2">
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      defaultValue={1}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            ) : initVals.answerType === "choices" ? (
              <ChoicesPage
                choicesOpts={choicesOpts}
                setchoicesOpts={setchoicesOpts}
                sizes={sizes}
                allFonts={allFonts}
              />
            ) : initVals.answerType === "dropdown" ? (
              <DropDownPage
                setdropDownOpts={setdropDownOpts}
                dropDownOpts={dropDownOpts}
                sizes={sizes}
                allFonts={allFonts}
              />
            ) : initVals.answerType === "checkbox" ? (
              <CheckBoxPage
                setcheckBoxOpts={setcheckBoxOpts}
                checkBoxOpts={checkBoxOpts}
                sizes={sizes}
                allFonts={allFonts}
              />
            ) : null}
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{ textTransform: "none" }}
              className=" flex gap-2"
            >
              <Add /> Add
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{ textTransform: "none" }}
              className=" flex gap-2"
            >
              <Delete /> Delete
            </Button>
          </div>
        </div>
      </div>
      {/* Dialog for adding link */}
      {/* {open && (
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
              const text = formJson.text;
              const link = formJson.link;
              console.log("text", text);
              console.log("link", link);

              const formattedLink = `<a href="${link}" target="_blank" rel="noopener noreferrer">${
                text ? text : link
              }</a>`;
              setInitVals((prev) => ({
                ...prev,
                question: `${prev.question} ${formattedLink}`,
              }));

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
              id="link"
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
      )} */}
    </div>
  );
};

export default Question;
