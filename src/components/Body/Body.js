import "./Body.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { listOfRestaurant } from "../../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState(listOfRestaurant);

  const filterTopRatedRestaurants = () => {
    const filteredList = restaurantList.filter((restaurants) => {
      return restaurants.data.avgRating > 4;
    });

    setRestaurantList(filteredList);
  };

  const resetFilter = () => {
    setRestaurantList(listOfRestaurant);
  };

  return (
    <div className="body">
      <div className="filter-reset">
        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>

        <button className="reset-btn" onClick={resetFilter}>
          Reset Filter
        </button>
      </div>

      <div className="res-container">
        {restaurantList.map((restaurants) => (
          <RestaurantCard key={restaurants.data.id} resData={restaurants} />
        ))}
      </div>
    </div>
  );
};

export default Body;
