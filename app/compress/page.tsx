"use client";
import { DragAndDrop } from "@/src/components/dragAndDrop";
import { compressFile } from "@/src/services/imageProcessing.services";
import { convertBytes } from "@/src/utils/convert";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [compressionRatio, setCompressionRatio] = useState<any>(50);
  const [preview, setPreview] = useState<any>(null);
  const [processedImage, setProcessedImage] = useState<any>(null);
  const [convertedImageSize, setConvertedImageSize] = useState<any>("");

  const handleFileChange = (file: any) => {
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setUploadedImage(null);
    setPreview(null);
    setProcessedImage(null);
  };

  const handleDownload = () => {
    if (!processedImage) return;

    const a = document.createElement("a");
    a.href = processedImage;
    a.download = "processed-image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpload = async () => {
    try {
      const blob = await compressFile(uploadedImage, compressionRatio);
      console.log("blob size: ", blob.size);
      setConvertedImageSize(convertBytes(blob.size));
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      {uploadedImage === null ? (
        <DragAndDrop handleFileChange={handleFileChange} />
      ) : (
        <div className="flex gap-8 flex-col sm:flex-row">
          <div className="flex flex-col gap-2">
            <Image alt="hello" src={preview} width={400} height={400} />
            <div className="flex flex-col gap-4">
              <input
                type="range"
                min={0}
                max="100"
                onChange={(e) => setCompressionRatio(e.target.value)}
                value={compressionRatio}
                className="range w-full"
              />
              <div className="w-full flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpload()}
                >
                  Compress
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {processedImage && (
            <div className="flex flex-col gap-4">
              <Image
                alt="hello"
                src={processedImage}
                width={400}
                height={400}
              />
              <div className="w-full flex justify-between">
                <span>Size: {convertedImageSize}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownload()}
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
