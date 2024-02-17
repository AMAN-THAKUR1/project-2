import React,{useState,useRef, useEffect} from 'react'
import { NavItem } from 'react-bootstrap';
import { useDispatchCart,useCart } from './contextReducer';
export const Card = (props) => {
    let options = props.options;
    let priceoptions = Object.keys(options);
    let foodItem = props.foodItem;
    const [size, setsize] = useState("");
    const [qnt, setqnt] = useState(1);
    let dispatch = useDispatchCart();
    let data = useCart();
    let ref = useRef();
    let finalPrice = qnt * parseInt(options[size])
    useEffect(() => {
        setsize(ref.current.value)
    }, [])
    const handleAddToCart = async () => {
      let food = []
      for (const item of data) {
        if (item.id === foodItem._id) {
          food = item;
  
          break;
        }
      }
      console.log(food)
      console.log(new Date())
      if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qnt: qnt })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qnt: qnt, size: size })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
  
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qnt: qnt, size: size })
  
  
      // setBtnEnable(true)
  
    }
    // console.log(options[size]);
    return (   
        <div className = "m-3"><div className="card" style = {{maxHeight: "400px"}}  >
                <img src={props.foodItem.img} className="img-fluid" style = {{maxHeight: "120px", objectFit: "fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container">
        <select className="m-2 h-100 bg-success"  onChange = {(e)=> setqnt(e.target.value)} >
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className="m-2 h-100 bg-success rounded" ref = {ref} onChange = {(e)=> setsize(e.target.value)}>
                            {priceoptions.map((data)=>{
                                return <option key = {data} value = {data}>{data}</option>
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5">
                        ₹ {finalPrice}/-
                        </div>
                        <hr />
                        <button className = " btn btn-success text-black disable" onClick = {handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div></div>
    )
}
export default Card;
