"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const operations = [
    {
      id: 1,
      title: "Compress",
      description: "",
      onClick: () => {
        router.push("/compress");
      },
    },
  ];
  return (
    <div className="w-full flex justify-between gap-8">
      {operations.map((v) => (
        <div key={v.id} className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className=" text-lg">{v.title}</h2>
            <p>{v.description}</p>
            <div className="card-actions justify-end">
              <button className="btn" onClick={v.onClick}>
                Try Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
