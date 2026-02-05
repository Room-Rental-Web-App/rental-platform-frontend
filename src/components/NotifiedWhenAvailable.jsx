import Api from "../api/Api"


function NotifiedWhenAvailable({ userId, roomId }) {

    function notifyMe() {
        Api.post("/room_availability/add", null,{
            params: {
                userId:userId, roomId:roomId
            }
        })
            .then(res => {
                console.log(res)
                alert(res.data)
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    return (
        <button onClick={notifyMe}>notify when available </button>
    )
}

export default NotifiedWhenAvailable