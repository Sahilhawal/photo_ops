export default function Home() {
  return (
    <div className="w-full flex justify-between gap-8">
      {Array(3)
        .fill(0)
        .map((v, index) => (
          <div
            key={index}
            className="card bg-primary text-primary-content w-96"
          >
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
