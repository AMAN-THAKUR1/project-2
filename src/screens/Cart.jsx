import React from 'react'
import {useCart, useDispatchCart} from "../components/contextReducer";
import trash from "../trash.svg"
const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();
    if(data.length === 0){
        return (
            <div>
                <div className = "m-5 w-100 text-center fs-3">The Cart is Empty</div>
            </div>
        )
    }
        
        // const handleCheckout = async () => {
        //     console.log(data)
        //     let userEmail = localStorage.getItem("userEmail")
        // let response = await fetch("http://localhost:5000/api/OrderData",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type" : "application/json"

        //     },
        //     body: JSON.stringify({
        //         order_date: new Date().toDateString(),
        //         email: userEmail,
        //         order_data: data
        //     })
        // })
        // if(response.status === 200){
        //     dispatch({type: "DROP"})
        // }
        // };
        const handleCheckout = async () => {
            try{
                console.log(`ye hai data ${data}`)
              let userEmail = await localStorage.getItem("userEmail");
        
              if(!userEmail){
                console.error("user email not found in localStorage")
                return
              }
        
              let response = await fetch("http://localhost:5000/api/OrderData", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body : JSON.stringify({
                  order_date:new Date().toDateString(),
                  email : userEmail,
                  order_data : data
                })
              });
              if(response.status === 200){
                dispatch({type:"DROP"})
              }else{
                console.error('Check out failed with response status : ', response.status);
              }
            }catch(error){
              console.error('An error occurred during checkout',error)
            }
          };
        
        
        
    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className = " container m-auto mt-5 table responsive table-responsive-sm table-responsive-md">
                <table className = "table table-hover ">
                    <thead className = "text-success fs-4"> 
                        <tr >
                            <th  className = "text-success" scope = "col" >#</th>
                            <th  className = "text-success" scope = "col">Name</th>
                            <th className = "text-success"  scope = "col">Quantity</th>
                            <th  className = "text-success" scope = "col">Option</th>
                            <th  className = "text-success" scope = "col">Amount</th>
                            <th  scope = "col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food,index)=>(
                            <tr >
                                <th className = "text-white" scope = "row">{index + 1}</th>
                                <th className = "text-white" >{food.name}</th>
                                <th className = "text-white" >{food.qnt}</th>
                                <th className = "text-white" >{food.size}</th>
                                <th className = "text-white" >{food.price}</th>
                                <th><button type = "button" className = "btn p-0">
                                    <img width="20" src={trash} alt="delete" onClick = {()=>{dispatch({type: "REMOVE", index: index})}} />
                                
                                </button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className = "fs-2">Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className = "btn bg-success mt-5" onClick = {handleCheckout}> Check Out</button>
                </div>
            </div>
        </div>
    )
}
export default Cart;