import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"



export const useDocument = (collection, id) =>{
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime data for document
  useEffect(()=>{
    const ref = projectFirestore.collection(collection).doc(id)

    //realtime listener
    const unsubscribe =ref.onSnapshot((snapshot)=>{
        if(snapshot.data()){
          setDocument({...snapshot.data(), id: snapshot.id})
          setError(null)
        }else{
            setError('no such document exists')
        }
        
    },(err)=>{      //this is a function that is fired if an error happens. it is the second argument of function onSnapshot
        console.log(err.message)
        setError('failed to get document')
    })
    //Clean up function. it is fired when the component is unmount, to unsubscribe form realtime data. onSnapshot method returns a "unsubscribe function"
    //we only need to invoke that function 
    return () => unsubscribe()


  },[collection, id])

  //in the final part of the hook we only need to return the data of the hook, in this case the document and the error
  return {document, error}
}