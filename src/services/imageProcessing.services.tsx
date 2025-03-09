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

  return response;
};
