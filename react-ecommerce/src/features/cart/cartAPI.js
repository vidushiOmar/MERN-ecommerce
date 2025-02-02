// A mock function to mimic making an async request for data
export function addToCart(items) {
  return new Promise(async(resolve) =>
  {
    const response=await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(items),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    
    resolve({data});
  }
  );
}

export function fetchItemsByUserId() {
  return new Promise(async(resolve) =>
  {
    const response=await fetch('http://localhost:8080/cart');
    const data=await response.json();
    // console.log(data)
    resolve({data});
    
  }
  );
}

export function updateItem(update) {
  return new Promise(async(resolve) =>
  {
    const response=await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    // console.log(data)
    resolve({data});
    
  }
  );
}

export function deleteItem(itemId) {
  return new Promise(async(resolve) =>
  {
    const response=await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    // console.log(data)
    resolve({data:{id:itemId}});
    
  }
  );
}

export function resetCart() {
  return new Promise(async(resolve)=>{const response=await fetchItemsByUserId();
  const items=response.data;
  for(let item of items){
    await deleteItem(item.id)}
    resolve({status:'success'})
  });
  
}