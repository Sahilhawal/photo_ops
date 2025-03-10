import React from "react";

interface Props {
  handleFileChange: any;
}
export const DragAndDrop: React.FC<Props> = ({ handleFileChange }) => {
  return (
    <div className="flex items-center justify-center w-[400px]">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary-300 border-dashed rounded-lg cursor-pointer bg-primary dark:hover:bg-primary-800 dark:bg-primary-700 hover:bg-primary-100 dark:border-primary-600 dark:hover:border-primary-500 dark:hover:bg-primary-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-white">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-white">SVG, PNG, JPG or GIF</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(event: any) => handleFileChange(event.target.files[0])}
        />
      </label>
    </div>
  );
};
