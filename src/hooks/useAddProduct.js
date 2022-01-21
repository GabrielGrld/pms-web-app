import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp, projectStorage } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return {isPending: false, document: action.payload, success: true, error: null}
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    
    default:
      return state
  }
}

export const useAddProduct = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc, image) => {
    dispatch({ type: 'IS_PENDING' })
    console.log(doc)
    try {
      //added Code
      const uploadPath =`products/${image.name}`
      const img = await projectStorage.ref(uploadPath).put(image)
      const imgUrl = await img.ref.getDownloadURL()
      console.log('Image is added. Url')
      console.log(imgUrl)
      //added Code
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt, imgUrl }) //Added imgUrl
      console.log(addedDocument)
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  //update documents
  const updateDocument = async (id, updates)=>{
    dispatch({type: 'IS_PENDING'})

    try{
      const  updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload:updatedDocument })
      return updatedDocument
    }catch(err){
      dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
      return null
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }

}
