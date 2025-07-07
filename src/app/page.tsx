import Card from "../../components/Card/Card";

export default function Home() {
  return (
    <div className="p-10 flex flex-row flex-wrap gap-3 justify-center ">
      <Card 
        imagePath="/stockImage.jpg" 
        title="Stock Image"
        discription="nothing to discribe"
        price={0.00}
        category="nothing"
      />
      <Card 
        imagePath="/ferrari.jpeg"
        title="Ferrari"
        discription="ferrari car is one of the fastest and prettiest cars in the world"
        price={2000000}
        category="cars"
      />
    </div>
  );
}
