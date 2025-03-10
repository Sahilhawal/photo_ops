export const compressImage = async (
  file: File,
  quality: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return reject("Canvas context not supported");

        const MAX_WIDTH = 800; // Set max width for resizing
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob with specified quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject("Compression failed");
            }
          },
          "image/jpeg",
          quality / 100, // Convert integer (0-100) to decimal (0-1)
        );
      };
    };

    reader.onerror = (error) => reject(error);
  });
};

export const compressFile = async (image: any, quality: number) => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/compress/?quality=${quality}`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to process image");
  }

  return response.blob();
};
