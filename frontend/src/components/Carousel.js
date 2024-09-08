

export default function Carousel() {
  return (
    <div>
        <div id="carouselExampleFade" class="carousel slide carousel-fade">
  <div class="carousel-inner" >
  <div class="carousel-caption d-none d-md-block" style={{zIndex:"5"}}>
  <form class="d-flex" role="search">
        <input class="form-control me-2" style={{background:"transparent",color:"white"}} type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success text-white bg-danger" type="submit">Search</button>
      </form>
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
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}
