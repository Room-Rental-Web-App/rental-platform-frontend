
import { useState } from 'react';
import Api from '../api/Api'
function RoomShare({ ownerId, roomId }) {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState({ ownerId, roomId, userId, "approvableStatus": false, "lookingFor": "ANY", ageFrom: 20, "ageTo": 50, "price": 0 , "description":""});

  console.log(data)
  function shareRoomRequest() {
    Api.post("/share_room/add", data).then(res => {
      console.log(res.data)
      alert("Room Shared Succesfully")
    }).catch(err => {
      console.log(err)
      alert("Something went Wront")
    })
  }

  function changeData(e) {
    const { name, value } = e.target;
    setData(pre => ({ ...pre, [name]: value }))
    console.log(data)
  }

  return (
    <div>
      <div>
        <label>Age From</label>
        <input type="number" name="ageFrom" min={18} max={100} value={data.ageFrom} onChange={changeData} />
      </div>

      <div>
        <label>Age To</label>
        <input type="number" name="ageTo" min={18} max={100} value={data.ageTo} onChange={changeData} />
      </div>

      <div>
        <label>Price</label>
        <input type="number" name="price" min={18} max={100} value={data.price} onChange={changeData} />
      </div>

      <div>
        <label>Description </label>
        <input type="text" name='description' value={data.description} onChange={changeData} />
      </div>

      <select value={data.lookingFor} onChange={changeData}>
        <option value="ANY">Anyone</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <button onClick={shareRoomRequest}>Share Room</button>
    </div>
  )
}

export default RoomShare