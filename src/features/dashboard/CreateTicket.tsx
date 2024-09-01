import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

interface CreateTicketFormProps {
  setShowForm: any;
}

const CreateTicketForm = ({ setShowForm }: CreateTicketFormProps) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = () => {
    // Handle form submission logic
  };

  return (
    <div className="mt-1.5">
      <h1 className="text-[22px] sm:text-[22px] text-black-75 tracking-[-1px] leading-[44px] mb-2">
        Create Ticket
      </h1>

      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            label="Title"
          />
        </div>

        {/* Details Field (Word Editor) */}
        <div className="h-[170px]">
          <label
            className={
              "inline-block text-sm text-black-100 font-extralight leading-[26.04px]"
            }
          >
            Details
          </label>
          <ReactQuill
            value={details}
            onChange={setDetails}
            className="w-full m-0 bg-white h-[80px] md:h-[100px] text-black-200"
            theme="snow"
          />
        </div>

        {/* File Uploader */}

        <div className="">
          <label
            className={
              "inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]"
            }
          >
            File
          </label>
          <div
            className="w-full bg-white border-dashed border-2 border-black-300 p-4 text-center cursor-pointer"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-sm mt-2 text-black-500"
            >
              Drag and drop files here, or click to select files
            </label>
            {files.length > 0 && (
              <p className="text-sm mt-2 text-black-500">
                {files.length} file(s) selected
              </p>
            )}
          </div>
        </div>

        {/* Priority Select */}
        <div>
          <label
            className={
              "inline-block text-sm text-black-100 font-extralight mb-1 leading-[26.04px]"
            }
          >
            Priority
          </label>
          <Select
            label="Priority"
            options={[
              { value: "Low", label: "Low" },
              { value: "Normal", label: "Normal" },
              { value: "High", label: "High" },
            ]}
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outlined"
            className="!bg-transparent !border-black-300 !text-black-500"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="!bg-primary !text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketForm;
