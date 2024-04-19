import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./components/ProfileCard";

interface UserProfile {
  name: string;
  gender: string;
  location: string;
  university: string;
  interests: string;
}

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get<UserProfile[]>(
        "http://localhost:5001/recommendations/1/New%20York/NYU/music,sports/Female"
      );
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSwipe = (direction: string) => {
    console.log(`Swiped ${direction}`);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="App">
      {profiles.length > 0 && currentIndex < profiles.length ? (
        <ProfileCard
          key={profiles[currentIndex].name}
          profile={profiles[currentIndex]}
          onSwipe={handleSwipe}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <p>No more profiles!</p>
          <button onClick={fetchProfiles}>Refresh</button>
        </div>
      )}
    </div>
  );
};

export default App;
