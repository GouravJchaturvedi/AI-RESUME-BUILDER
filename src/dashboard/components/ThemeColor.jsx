import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#F1C40F", // Yellow
    "#E67E22", // Orange
    "#9B59B6", // Purple
    "#34495E", // Dark Blue
    "#2ECC71", // Emerald
    "#3498DB", // Light Blue
    "#E74C3C", // Light Red
    "#95A5A6", // Grey
    "#7F8C8D", // Dark Grey
    "#000000", // Black
    "#D35400", // Pumpkin
    "#C0392B", // Pomegranate
    "#16A085", // Turquoise
    "#2980B9", // Bright Blue
    "#8E44AD", // Wisteria
    "#F39C12", // Orange
    "#BFBFBF", // Light Grey
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { resumeId } = useParams();

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.updateResumeDetail(resumeId, data)
      .then((resp) => {
        console.log(resp);
        toast.success("Theme Color updated");
      })
      .catch((error) => {
        console.error("Error updating Theme Color:", error);
        toast("Theme Color Failed to Save");
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((item, index) => (
            <div
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                selectedColor == item && "border border-black"
              }`}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
