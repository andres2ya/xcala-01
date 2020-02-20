export  const loadFromLocalStorage=(key)=>{
    try{
        const serializedData=localStorage.getItem(key);
        if(serializedData===null){
            return undefined
        }
        return JSON.parse(serializedData);
        }catch (err){
            return undefined
        }
    }

export const saveInLocalStorage =(key,data)=>{
    try{
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key,serializedData);
    }
    catch(err){
        console.log(err)
    }
}

export const removeFromLocalStorage=(key)=>{
    try{
        localStorage.removeItem(key)
    }
    catch(err){
        console.log(err)
    }
}

