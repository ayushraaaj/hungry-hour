import "./NotFound.css";
import { useRouteError } from "react-router-dom";

const NotFound = () => {
    const err = useRouteError();
    
    console.log(err);

    return (
        <div className="error">
            <h1>{err.status}</h1>
            <p>{err.error.message}</p>
        </div>
    );
}

export default NotFound;