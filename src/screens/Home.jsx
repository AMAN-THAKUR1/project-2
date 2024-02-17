import React,{useEffect,useState} from 'react'
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
    const [foodCat,setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);
    const [search, setsearch] = useState("")
    const loadData = async ()=>{
        let response = await fetch("http://localhost:5000/api/foodData",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            }
        });
        response = await response.json();
        setfoodCat(response.foodCategory);
        setfoodItem(response.fooditems);
    }

        useEffect(() => {
            loadData()
        }, [])


    return (
        <div>
            <div><Navbar /></div>
            <div>

            <div id="carouselExampleFade" className="carousel slide carousel-fade" style = {{objectFit: "contain !important"}}>
  <div className="carousel-inner" id= "carausel">
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <div className="d-flex justify-center">
    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value = {search} onChange = {(e)=> setsearch(e.target.value)}/>
    {/* <button className="btn bg-success text-white" type="submit">Search</button> */}
  </div>
  </div>
    <div className="carousel-item active" >
      <img src="https://source.unsplash.com/random/900x500/?burger" className="d-block w-100" style = {{filter:"brightness(50%)"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x500/?noodles" className="d-block w-100" style = {{filter:"brightness(50%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x500/?pizza" className="d-block w-100" style = {{filter:"brightness(50%)"}} />
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

            </div>
            <div className = "container ">{foodCat ? foodCat.map((data)=>{
                return (<div className = "row mb-3">
                    <div key = {data.id} className = "fs-3 m-3">
                        {data.CategoryName}
                    </div>
                    <hr />
                    {foodItem?foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search)))
                    .map(filterItems =>{
                        return(
                            <div key = {filterItems._id} className = "col-12 col-mj-6 col-lg-3">
                                <Card foodItem = {filterItems}
                                     options = {filterItems.options[0]}
                                />
                            </div>
                        )
                    }):"NO such Data"}
                </div>
                    
                )
            }) :""
            }</div>
            <div><Footer /></div>
        </div>
    )
}

export default Home
