import "./RestaurantCard.css";
import { image_url } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, areaName } =
    resData;

  return (
    <div className="res-card">
      <img src={image_url + cloudinaryImageId} alt={name} />
      <h2>{name}</h2>
      <h3>Rating: {avgRating} stars</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
