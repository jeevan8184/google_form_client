import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Slide,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { BottomIcons, fontFamilies, Items, UPDATE } from "./constants";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IoMdClose } from "react-icons/io";
import { IoColorPalette } from "react-icons/io5";
import ColorPalette from "./ColorPalette";
import CreateTopBar from "./CreateTopBar";
import AllComponents from "./AllComponents";
import HeaderPage from "./HeaderPage";
import { RxSection } from "react-icons/rx";
import { useDispatch } from "react-redux";

const CreateForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = React.useState("Questions");
  const [isTheme, setIsTheme] = useState(false);
  const [sizes, setSizes] = useState({ header: 24, question: 20, text: 17 });
  const [allFonts, setAllFonts] = useState({
    header: "sans",
    question: "sans",
    text: "sans",
  });

  const [initVals, setInitVals] = useState({
    headerImg: "/assets/form.png",
    bgColor: "#ffc1c1",
  });

  const [open, setOpen] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const getKeyByValue = (arr) => {
    return Object.keys(fontFamilies).find(
      (key) => JSON.stringify(fontFamilies[key]) === JSON.stringify(arr)
    );
  };

  const fetchForm = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/form/get/${id}`
      );
      if (response) {
        setForm(response.data);
        setSizes(response.data.sizes);
        setInitVals({
          headerImg: response.data?.bgImg,
          bgColor: response.data?.bgColor,
        });
        setAllFonts({
          header: getKeyByValue(response.data?.allFonts.header),
          question: getKeyByValue(response.data?.allFonts.question),
          text: getKeyByValue(response.data?.allFonts.text),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSection = async () => {
    try {
      // const lastSection = form?.sections[form?.sections.length - 1];
      // const order = lastSection.order + 1;
      // const newSection = {
      //   title: `Section ${order}`,
      //   desc: `section ${order} description`,
      //   questions: [
      //     {
      //       question: "Name",
      //       answerType: "answer",
      //       required: true,
      //     },
      //   ],
      //   order,
      // };
      // dispatch({type:UPDATE,payload:true});
      // const response = await axios.post(`${process.env.REACT_APP_URL}/form/addSection`, {
      //   sections: [...form?.sections, newSection],
      //   formId:form._id,
      //   bgImg:initVals.headerImg,
      //   bgColor: initVals.bgColor,
      //   sizes,
      //   allFonts:{
      //     header: fontFamilies[allFonts.header],
      //     question: fontFamilies[allFonts.question],
      //     text: fontFamilies[allFonts.text],
      //   }
      // });
      // if(response) {
      //   setForm(response.data);
      //   console.log("newForm",response.data);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchForm();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className=" min-h-screen w-full flex-center">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (!form) {
    return (
      <div className=" text-center text-xl text-gray-500">Form not found</div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-50 relative">
      <CreateTopBar
        form={form}
        setIsTheme={setIsTheme}
        setOpen={setOpen}
        isUpdating={isUpdating}
        handleUpdate={handleUpdate}
      />

      <div className=" bg-white">
        {isTheme && (
          <div className=" max-sm:hidden fixed z-50 top-16 right-0 h-[620px] w-[300px] bg-white shadow-lg rounded-lg overflow-y-auto border border-gray-100">
            <div className="sticky top-0 bg-white z-50 p-3 flex justify-between items-center shadow">
              <p className="text-lg flex items-center gap-2">
                <IoColorPalette size={24} /> Themes
              </p>
              <div
                onClick={() => setIsTheme(false)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-all duration-300 active:bg-gray-300"
              >
                <IoMdClose size={24} />
              </div>
            </div>
            <ColorPalette
              sizes={sizes}
              setSizes={setSizes}
              allFonts={allFonts}
              setAllFonts={setAllFonts}
              initVals={initVals}
              setInitVals={setInitVals}
            />
          </div>
        )}
        <div className=" md:hidden">
          {open && (
            <div className={`${open ? " md:hidden" : " flex"}`}>
              <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
              >
                <AppBar
                  sx={{ position: "relative" }}
                  style={{ backgroundColor: "white" }}
                >
                  <Toolbar>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                      color="black"
                    >
                      Themes
                    </Typography>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => setOpen(false)}
                      style={{ textTransform: "none", color: "gray" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => setOpen(false)}
                      style={{ textTransform: "none", color: "blue" }}
                    >
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                <ColorPalette
                  sizes={sizes}
                  setSizes={setSizes}
                  allFonts={allFonts}
                  setAllFonts={setAllFonts}
                  initVals={initVals}
                  setInitVals={setInitVals}
                />
              </Dialog>
            </div>
          )}
        </div>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "none",
              borderWidth: 0,
            }}
          >
            <div className=" flex-center w-full mx-auto max-w-sm  overflow-hidden bg-none">
              <TabList
                onChange={(e, newValue) => setValue(newValue)}
                aria-label="form tabs"
                indicatorColor="primary"
                textColor="primary"
                sx={{ justifyContent: "center" }}
              >
                <Tab
                  label="Questions"
                  value="Questions"
                  sx={{ textTransform: "none", fontSize: "16px" }}
                />
                <Tab
                  label="Responses"
                  value="Responses"
                  sx={{ textTransform: "none", fontSize: "16px" }}
                />
              </TabList>
            </div>
          </Box>

          <div style={{ backgroundColor: initVals.bgColor }}>
            <TabPanel
              style={{
                margin: 0,
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 20,
                paddingTop: 20,
              }}
              value="Questions"
              className=" w-full p-2"
            >
              <div
                style={{ backgroundColor: initVals.bgColor }}
                className=" max-w-3xl w-full pb-20 mx-auto rounded-lg"
              >
                <div className=" w-full flex flex-col gap-2">
                  {initVals.headerImg && (
                    <div className=" relative h-48 w-full rounded-lg overflow-hidden">
                      <img
                        src={initVals.headerImg}
                        alt="img"
                        className=" h-full object-cover w-full -z-10"
                      />
                    </div>
                  )}
                  <div className=" flex flex-col gap-2">
                    {form?.sections?.map((section, i) => {
                      return (
                        <div className=" flex flex-col gap-2">
                          <HeaderPage
                            sizes={sizes}
                            allFonts={allFonts}
                            section={section}
                          />
                          <AllComponents
                            sizes={sizes}
                            allFonts={allFonts}
                            questions={section.questions}
                            form={form}
                            section={section}
                            setForm={setForm}
                          />
                        </div>
                      );
                    })} 
                    <div
                      className=" flex gap-2 px-3 py-1.5 my-2 rounded-md bg-white w-fit mx-6 cursor-pointer hover:bg-gray-100"
                      onClick={handleAddSection}
                    >
                      <RxSection size={24} />
                      <p className=""> Add section</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel
              value="Responses"
              className="max-w-3xl bg-gray-100 w-full mx-auto rounded-lg p-1"
            >
              <div className="">
                <h2 className="text-xl font-semibold mb-4">Responses</h2>
              </div>
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </div>
  );
};

export default CreateForm;
