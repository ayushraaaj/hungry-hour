import "./Body.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Shimmer from "../ShimmerCard/Shimmer";
import { Link } from "react-router-dom";
import useRestaurantList from "../../utils/useRestaurantsList";
import useOnlineStatus from "../../utils/useOnlineStatus";
import Offline from "../Offline/Offline";
import { useState } from "react";
import ItemsNotFound from "../ItemsNotFound/ItemsNotFound";

const Body = () => {
  const [gotResult, setGotResult] = useState(true);

  const {
    listOfRestaurants,
    filteredListOfRestaurants,
    searchData,
    setSearchData,
    setFilteredListOfRestaurants,
  } = useRestaurantList();

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <Offline />;
  }

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  const filterSearch = () => {
    const filteredList = listOfRestaurants.filter((restaurant) => {
      const { name, cuisines } = restaurant.info;
      const lowerCaseSearchData = searchData.toLowerCase();

      const nameMatches = name.toLowerCase().includes(lowerCaseSearchData);

      const cuisinesMatches = cuisines.some((cuisine) =>
        cuisine.toLowerCase().includes(lowerCaseSearchData)
      );

      return nameMatches || cuisinesMatches;
    });

    if (filteredList.length === 0) {
      setGotResult(false);
    } else {
      setGotResult(true);
    }

    setFilteredListOfRestaurants(filteredList);
  };

  if (gotResult == false) {
    return <ItemsNotFound name={searchData} />;
  }

  const filterTopRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter((restaurants) => {
      return restaurants.info.avgRating > 4;
    });

    setFilteredListOfRestaurants(filteredList);
  };

  const resetFilter = () => {
    setFilteredListOfRestaurants(listOfRestaurants);
  };

  return (
    <div className="body">
      <div className="filter-container">
        <div className="search">
          <input
            type="text"
            placeholder="Type here..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button onClick={filterSearch}>Search</button>
        </div>

        <div className="filter-btn">
          <button className="filter-btn" onClick={filterTopRatedRestaurants}>
            Top Rated Restaurants
          </button>

          <button className="reset-btn" onClick={resetFilter}>
            Reset Filter
          </button>
        </div>
      </div>

      <div className="res-container">
        {filteredListOfRestaurants.map((restaurants) => {
          return (
            <Link
              key={restaurants?.info?.id}
              to={`/restaurant/${restaurants?.info?.id}`}
            >
              <RestaurantCard resData={restaurants.info} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
