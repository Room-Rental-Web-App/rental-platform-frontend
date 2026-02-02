import React, { useEffect, useState } from 'react'
import Api from '../../api/Api'
function SharedRoomRequests() {
    const [sharedRoomRequest, setSharedRoomRequest] = useState([])
    const ownerId = localStorage.getItem("userId");

    function fetchSharedRoomRequest() {
        Api.get(`/share_room/owner/${ownerId}`)
            .then(res => {
                console.log(res);
                setSharedRoomRequest(res.data)
            })
    }
    useEffect(() => {
        fetchSharedRoomRequest();
    }, [])
    return (
        <div>
            {sharedRoomRequest.map(req=>{
                return(
                    <div>
                        {req.id}
                    </div>

                )
            })}
        </div>
    )
}


export default SharedRoomRequests