import {useState, useEffect} from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'

//styles
import './Create.css'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
  ]
  

export default function Create() {
  const {documents} = useCollection('users')
  const [users, setUsers] = useState([])

  //form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  //to get the documents and create the users array for the select option
  //This use effect allows us to wait for the documents when it changes from null to an array
  useEffect(() => {
   if(documents){
       const options = documents.map(user=>{
        return {value: user, label: user.displayName}
       })
       setUsers(options)
   }    
  }, [documents])

  const handleSubmit = (e)=>{
      e.preventDefault()
      setFormError(null)

      if(!category){
          setFormError('Please select a project category')
          return  //this means do not go any further, enede here
      }
      if(assignedUsers.length<1){
          setFormError('Please assing the project to at least one user')
          return
      }
      console.log(name, details, dueDate, category.value, assignedUsers)
  }
  return (
    <div className="create-form">
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit ={handleSubmit} >
        <label>
            <span>Project name:</span>
            <input
            required
            type="text"
            onChange ={(e)=>setName(e.target.value)}
            value={name}
             />
        </label>
        <label>
            <span>Project Details:</span>
            <textarea
            required
            type="text"
            onChange ={(e)=>setDetails(e.target.value)}
            value={details}
             />
        </label>

        <label>
            <span>Set due date:</span>
            <input
            required
            type="date"
            onChange ={(e)=>setDueDate(e.target.value)}
            value={dueDate}
             />
        </label>
        <label >
            <span> Project category:</span>
            <Select
              onChange={(option)=>setCategory(option)} 
              options={categories}

            />
        </label>
        <label >
            <span>Assign to:</span>
            <Select
              onChange={(option)=>setAssignedUsers(option)} 
              options={users}
              isMulti
            />
        </label>
    
    <button className='btn'>Add Project</button>
    {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
    )
}
