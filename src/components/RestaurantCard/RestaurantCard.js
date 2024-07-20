import "./RestaurantCard.css";
import { RES_IMAGE } from "../../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, areaName } =
    resData;

  return (
    <div className="res-card">
      <img src={RES_IMAGE + cloudinaryImageId} alt={name} />
      <h3 className="name">{name}</h3>
      <h4 className="details">Rating: {avgRating} stars</h4>
      <h4 className="details">{cuisines.join(", ")}</h4>
      <h4 className="details">{costForTwo}</h4>
      <h4 className="details">{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
