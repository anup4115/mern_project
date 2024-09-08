import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useState, useEffect } from "react";

export default function Home() {
  const [search,setSearch]=useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:3001/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setFoodItem(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // useEffect with an empty dependency array to mimic componentDidMount behavior

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner" >
  <div className="carousel-caption d-none d-md-block" style={{zIndex:"5"}}>
  <div className="d-flex justify-content-center" role="search">
        <input className="form-control me-2" style={{background:"transparent",color:"white"}} type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        {/* <button className="btn btn-outline-success text-white bg-danger" type="submit">Search</button> */}
      </div>
      </div>
  <div className="carousel-item active">
      <img src="/burger.jpg" style={{"height":"500px" ,filter:"brightness(20%)"}}  className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/pizza.jpeg" style={{"height":"500px",filter:"brightness(20%)"}} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/burger2.jpg" style={{"height":"500px",filter:"brightness(20%)"}} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filterItems}
                        foodName={filterItems.name}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
                      />
                    </div>
                  ))
              ) : (
                <div>No such data found</div>
              )}
            </div>
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
