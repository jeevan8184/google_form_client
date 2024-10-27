import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { TOKEN, USER } from "./constants";
import { IoMdAdd } from "react-icons/io";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  CircularProgress,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state?.reducer?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [allForms, setAllForms] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const newFunc = async () => {
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        try {
          setIsLoading(true);
          const api = await axios.get(
            `${process.env.REACT_APP_URL}/auth/user/${decoded?.id}`
          );
          if (api) {
            dispatch({ type: USER, payload: api?.data });
            dispatch({ type: TOKEN, payload: token });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate("/login");
      }
    };
    newFunc();
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setIsCreating(true);
      const bgImg="https://res.cloudinary.com/doxykd1yk/image/upload/v1729919696/tler2zgc24oru8bpdtdg.jpg";
      const bgColor="#cce4ff";
      const questions=[];
      const sections=[];
      questions.push({question: "Name", answerType: "answer", required: true});
      questions.push({question: "Email", answerType: "answer", required: true});
      questions.push({question: "Organization", answerType: "answer", required: true});
      questions.push({question: "What days will you attend ?", answerType: "checkbox", required: true,options:[{text:"Day 1"},{text:"Day 2"},{text:"Day 3"},{text:"Day 4"}]});
      questions.push({question: "Dietary restrictions", answerType: "choices", required: true,options:[{text:"Vegetarian"},{text:"Vegan"},{text:"Kosher"},{text:"Gluten-free"}]});
      questions.push({question: "I understand that I will have to pay $$ upon arrival", answerType: "checkbox", required: true,options:[{text:"Yes"},{text:"No"}]});
      questions.push({question: "Date", answerType: "date", required: true});
      questions.push({question: "Time", answerType: "time", required: true});

      sections.push({
        title: "Event Regestration",
        desc:"Event Timing: January 4th-6th, 2016 \n Event Address: 123 Your Street Your City, ST 12345 \n Contact us at (123) 456-7890 or no_reply@example.com",
        questions
      });


      const response = await axios.post(
        `${process.env.REACT_APP_URL}/form/create`,
        {
          name,
          userId: currUser?._id,
          sections,
          bgImg,
          bgColor
        }
      );
      if (response) {
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        console.log("create", response.data);

        setName("");
        setOpen((prev) => !prev);
        navigate(`/create/${response.data._id}`);
      }

      setOpen((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(()=> {
    fetchForms();
  },[]);

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

  if (isLoading) {
    return (
      <div className=" min-h-screen w-full flex-center">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (!currUser) return null;

  return (
    <div className=" bg-gray-50 min-h-screen h-full w-full">
      <div className=" flex flex-col gap-4">
        <div className=" bg-gray-200 p-2 py-4">
          <div className=" max-w-6xl w-full mx-auto">
            <div className="flex flex-col gap-3 ">
              <h1 className=" text-xl font-medium ">Create a new form</h1>
              <div className=" flex gap-6 max-sm:gap-4 overflow-x-auto">
                <div
                  className=" w-48 cursor-pointer rounded hover:border-blue-500 h-60 border bg-white flex-center flex-col"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <IoMdAdd size={24} />
                  <p className=" font-normal text-gray-500">create</p>
                </div>
                <div
                  className=" group overflow-hidden rounded relative w-48 cursor-pointer hover:border-blue-500 h-60 border bg-white flex-center flex-col"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <img
                    src="/assets/form.png"
                    alt="Form"
                    className="w-full h-full object-center group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-3 max-w-6xl w-full mx-auto p-2">
          <h1 className=" text-lg font-medium">Recent Forms</h1>
          {allForms.length === 0 ? (
            <p className=" text-gray-500 font-normal text-[17px] text-center py-8 bg-white shadow my-2">
              There is no recent forms yet
            </p>
          ) : (
            <div className=" flex gap-6">
              {allForms.map((form) => (
                <div
                  key={form._id}
                  onClick={()=> navigate(`/create/${form._id}`)}
                  className="group overflow-hidden rounded relative w-48 cursor-pointer hover:border-blue-500 h-60 border border-2 bg-white flex flex-col"
                >
                  <img
                    src="/assets/form.png"
                    alt="Form"
                    className="w-full h-full object-center group-hover:scale-105 border-b"
                  />
                  <div className="flex flex-col p-2">
                    <p className=" font-[400] text-[17px]">{form.name}</p>
                    <p className=" text-sm text-gray-500"> <span className=" text-black">Created on :  </span> {new Date(form.createdAt).toLocaleDateString()} </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {open && (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
          <DialogTitle>Create Form</DialogTitle>
          <DialogContent>
            Please Enter a new name to create a form
            <TextField
              variant="outlined"
              size="small"
              style={{ marginTop: 15 }}
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpen((prev) => !prev);
              }}
              style={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              color="success"
              style={{ textTransform: "none" }}
              onClick={handleCreate}
            >
              {isCreating ? (
                <CircularProgress
                  size={20}
                  color="success"
                  style={{ marginLeft: 5 }}
                />
              ) : (
                "Create"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
