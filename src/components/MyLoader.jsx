import { Loader } from "lucide-react";
import "../CSS/my-loader.css"

function MyLoader({data}) {
    return (

          <div className="loader">
            <Loader className="spinner-large" size={48} />
            <p>{data}</p>
          </div>
      );
}

export default MyLoader