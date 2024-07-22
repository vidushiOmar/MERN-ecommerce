// A mock function to mimic making an async request for data
export function createUser(userData) {
    return new Promise(async(resolve) =>
    {
      const response=await fetch('http://localhost:8080/auth/signup',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
      });
      const data=await response.json();
      resolve({data});
    }
    );
  }

export function checkUser(logInInfo) {
    return new Promise(async(resolve,reject) =>
    {
      try
      {const response=await fetch('http://localhost:8080/auth/login',{
        method:'POST',
        body:JSON.stringify(logInInfo),
        headers:{'content-type':'application/json'}
      });
      if(response.ok){
        const data=await response.json();
        resolve({data});
      }else{
        const err=await response.json();
        reject({err});
      }
      }
      catch(err){
        reject({err});
      }
        
      
    }
    );
  }

export function signOut() {
    return new Promise(async(resolve) =>
    {
    
      resolve({data:'success'});
    }
    );
  }

