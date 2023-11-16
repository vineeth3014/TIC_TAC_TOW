import { useState } from "react"

export default function player({initialName, symbol}){
  const[playerName, setPlayerName] = useState(initialName)
  const [isEditing,setIsEditing]= useState(false)

  function handleEditClick(){
    setIsEditing(editing => !editing)// when updating the usesate based on previous state this is wrong way
  }

  function handleChange(event){
    setPlayerName(event.target.value)
  }

  let editablePlayerName =  <span className="player-name">{playerName}</span>
  // let btnCapture = 'Save'
  if(isEditing === true){
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    // btnCapture="Edit"

  }

    return(
        <li>
        <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    )
}