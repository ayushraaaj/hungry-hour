import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantsList";
import useOnlineStatus from "../utils/useOnlineStatus";
import Offline from "./Offline";
import { useState } from "react";
import ItemsNotFound from "./ItemsNotFound";

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
    <div>
      <div className="flex justify-center mx-auto my-7">
        <div className="search">
          <input  className="outline-none border-gray-400 border-2 rounded-md py-0.5 px-2"
            type="text"
            placeholder="Type here..."
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <button className="bg-blue-500 p-2 rounded-lg ml-5" onClick={filterSearch}>Search</button>
        </div>

        <div className="mx-5">
          <button className="mx-5 bg-green-400 p-2 rounded-lg" onClick={filterTopRatedRestaurants}>
            Top Rated Restaurants
          </button>

          <button className="bg-gray-400 p-2 rounded-lg" onClick={resetFilter}>
            Reset Filter
          </button>
        </div>
      </div>

      <div className="flex flex-wrap w-[80%] m-auto justify-center">
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
