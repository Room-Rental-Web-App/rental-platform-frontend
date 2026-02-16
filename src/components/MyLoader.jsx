import { Loader } from "lucide-react";
import "../css/my-loader.css"

function MyLoader({data}) {
    return (
        <div className="premium-container user">
          <div className="loader">
            <Loader className="spinner-large" size={48} />
            <p>{data}</p>
          </div>
        </div>
      );
}

export default MyLoader