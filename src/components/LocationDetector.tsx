import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";


const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";



const UserLocation = () => {
  const [location, setLocation] = useState<string | null>(null);

  const fetchAndSendLocation = async () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post(`${backendurl}/save-location`, {
            latitude,
            longitude,
          });

          setLocation(response.data.city);
        } catch (error: any) {
          console.error("Axios Error:", error.response?.data || error.message);

        }
      },
    );
  };

  useEffect(() => {
    fetchAndSendLocation();
  }, []);

  return (
    <div className="">
  <h2 className="text-sm text-white font-semibold">Deliver to</h2>
  <div className="flex items-center gap-1"> 
    <FaMapMarkerAlt className="text-red-500" />
    {location ? (
      <p className="text-white">{location}</p>
    ) : (
      <p className="text-white">India!</p>
    )}
  </div>
</div>

  );
};

export default UserLocation;
