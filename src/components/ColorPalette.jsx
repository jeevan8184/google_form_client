import {
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { IoMdClose, IoMdImage } from "react-icons/io";
import { Colors } from "./constants";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ColorPalette = ({
  allFonts,
  setAllFonts,
  sizes,
  setSizes,
  initVals,
  setInitVals,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setIsUploading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/form/upload`,
          {
            data: reader.result,
          }
        );
        if (response) {
          setInitVals({ ...initVals, headerImg: response.data });
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
    <div className=" p-4 flex flex-col gap-1">
      <div className=" flex flex-col gap-3">
        <h1 className=" font-medium">Text style</h1>
        {/* part1 */}
        <div className=" flex flex-col gap-1">
          <h1 className=" font-normal">Header</h1>
          <div className=" flex gap-2">
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={allFonts.header}
                onChange={(e) =>
                  setAllFonts({ ...allFonts, header: e.target.value })
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="sans" style={{ fontFamily: "font-sans" }}>
                  sans
                </MenuItem>
                <MenuItem
                  value="serif"
                  style={{ fontFamily: "font-serif" }}
                >
                  serif
                </MenuItem>
                <MenuItem value="mono" style={{ fontFamily: "font-mono" }}>
                  mono
                </MenuItem>
                <MenuItem
                  value="cursive"
                  style={{ fontFamily: "font-cursive" }}
                >
                  cursive
                </MenuItem>
                <MenuItem
                  value="display"
                  style={{ fontFamily: "font-display" }}
                >
                  display
                </MenuItem>
                <MenuItem
                  value="handwritten"
                  style={{ fontFamily: "font-handwritten" }}
                >
                  handwritten
                </MenuItem>
                <MenuItem
                  value="fancy"
                  style={{ fontFamily: "font-fancy" }}
                >
                  fancy
                </MenuItem>
                <MenuItem value="font-body" style={{ fontFamily: "font-body" }}>
                  body
                </MenuItem>
                <MenuItem
                  value="heading"
                  style={{ fontFamily: "font-heading" }}
                >
                  heading
                </MenuItem>
                <MenuItem value="slab" style={{ fontFamily: "font-slab" }}>
                  slab
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={sizes.header}
                onChange={(e) => setSizes({ ...sizes, header: e.target.value })}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={27}>27</MenuItem>
                <MenuItem value={28}>28</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* part2 */}
        <div className=" flex flex-col gap-1">
          <h1 className=" font-normal">Question</h1>
          <div className=" flex gap-2">
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={allFonts.question}
                onChange={(e) =>
                  setAllFonts({ ...allFonts, question: e.target.value })
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="sans" style={{ fontFamily: "font-sans" }}>
                  sans
                </MenuItem>
                <MenuItem
                  value="serif"
                  style={{ fontFamily: "font-serif" }}
                >
                  serif
                </MenuItem>
                <MenuItem value="mono" style={{ fontFamily: "font-mono" }}>
                  mono
                </MenuItem>
                <MenuItem
                  value="cursive"
                  style={{ fontFamily: "font-cursive" }}
                >
                  cursive
                </MenuItem>
                <MenuItem
                  value="display"
                  style={{ fontFamily: "font-display" }}
                >
                  display
                </MenuItem>
                <MenuItem
                  value="handwritten"
                  style={{ fontFamily: "font-handwritten" }}
                >
                  handwritten
                </MenuItem>
                <MenuItem
                  value="fancy"
                  style={{ fontFamily: "font-fancy" }}
                >
                  fancy
                </MenuItem>
                <MenuItem value="body" style={{ fontFamily: "font-body" }}>
                  body
                </MenuItem>
                <MenuItem
                  value="heading"
                  style={{ fontFamily: "font-heading" }}
                >
                  heading
                </MenuItem>
                <MenuItem value="slab" style={{ fontFamily: "font-slab" }}>
                  slab
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={sizes.question}
                onChange={(e) =>
                  setSizes({ ...sizes, question: e.target.value })
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* part3 */}
        <div className=" flex flex-col gap-1">
          <h1 className=" font-normal">Text</h1>
          <div className=" flex gap-2">
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={allFonts.text}
                onChange={(e) =>
                  setAllFonts({ ...allFonts, text: e.target.value })
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="sans" style={{ fontFamily: "font-sans" }}>
                  sans
                </MenuItem>
                <MenuItem
                  value="serif"
                  style={{ fontFamily: "font-serif" }}
                >
                  serif
                </MenuItem>
                <MenuItem value="font-mono" style={{ fontFamily: "font-mono" }}>
                  mono
                </MenuItem>
                <MenuItem
                  value="cursive"
                  style={{ fontFamily: "font-cursive" }}
                >
                  cursive
                </MenuItem>
                <MenuItem
                  value="display"
                  style={{ fontFamily: "font-display" }}
                >
                  display
                </MenuItem>
                <MenuItem
                  value="handwritten"
                  style={{ fontFamily: "font-handwritten" }}
                >
                  handwritten
                </MenuItem>
                <MenuItem
                  value="fancy"
                  style={{ fontFamily: "font-fancy" }}
                >
                  fancy
                </MenuItem>
                <MenuItem value="body" style={{ fontFamily: "font-body" }}>
                  body
                </MenuItem>
                <MenuItem
                  value="heading"
                  style={{ fontFamily: "font-heading" }}
                >
                  heading
                </MenuItem>
                <MenuItem value="slab" style={{ fontFamily: "font-slab" }}>
                  slab
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value={sizes.text}
                onChange={(e) => setSizes({ ...sizes, text: e.target.value })}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Divider />
      <div className=" flex flex-col gap-2 mb-2">
        <h1 className=" font-medium">Header</h1>
        {isUploading ? (
          <div className=" h-16 w-full flex-center">
            <CircularProgress size={24} />
          </div>
        ) : (
          <div className="">
            {initVals.headerImg ? (
              <div className=" text-orange-500 gap-5 flex-between px-2 py-1 w-fit cursor-pointer rounded border border-orange-500">
                <div className=" flex gap-1">
                  <IoMdImage size={22} />
                  <p className=""> Image selected</p>
                </div>
                <div
                  className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300 active:bg-gray-300"
                  onClick={() => setInitVals({ ...initVals, headerImg: "" })}
                >
                  <IoMdClose size={20} />
                </div>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className=" text-blue-500 flex gap-1 px-2 py-1 w-fit cursor-pointer rounded border border-blue-500"
              >
                <input {...getInputProps()} />
                <IoMdImage size={22} />
                <p className="">Choose Image</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Divider />
      <div className=" flex flex-col gap-2">
        <h1 className=" font-medium">BackgroundColor</h1>
        <div className=" flex flex-row flex-wrap gap-3">
          {Colors.map(({ color, label }, i) => {
            return (
              <div key={i}>
                {initVals.bgColor === color ? (
                  <div
                    title={label}
                    className="cursor-pointer p-2 rounded-full overflow-hidden flex-center hover:scale-110"
                    style={{ backgroundColor: color }}
                  >
                    <IoCheckmarkSharp size={15} />
                  </div>
                ) : (
                  <div
                    title={label}
                    className="cursor-pointer p-4 rounded-full overflow-hidden flex-center hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={(e)=> {
                      e.preventDefault();
                      setInitVals({...initVals,bgColor: color});
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;

