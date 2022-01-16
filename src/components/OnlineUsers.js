import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
  const {error, documents} = useCollection('users')

  return (
    <div className="user-list">
        <h2>All Users</h2>  
        {error && <div className="error">{error}</div>}
        {console.log(documents)}
        {documents && documents.map(user=>(
            (<>
            <div key={user.id} className='user-list-item'>
            {/* {console.log(user)} */}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL}/>
            </div>
             </>)            
        ))}
    </div>
)
}