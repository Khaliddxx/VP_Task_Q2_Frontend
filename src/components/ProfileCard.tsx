import React, { useState } from "react";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";
import styled from "styled-components";

interface UserProfile {
  name: string;
  gender: string;
  location: string;
  university: string;
  interests: string;
}

interface ProfileCardProps {
  profile: UserProfile;
  onSwipe: (direction: string) => void;
}

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Takes full height of the viewport
  overflow: hidden; // Ensure nothing spills outside this container
`;

const Card = styled.div<{ posX: number; posY: number; deg: number }>`
  cursor: pointer;
  width: 300px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  transition: transform 0.5s ease-out;
  transform: translate(${(props) => props.posX}px, ${(props) => props.posY}px)
    rotate(${(props) => props.deg}deg);
`;

const CardInfo = styled.div`
  text-align: center;
  h3 {
    margin-top: 0;
    color: #333;
  }
  p {
    margin: 5px 0;
    color: #666;
  }
`;

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe }) => {
  const [position, setPosition] = useState({ posX: 0, posY: 0, deg: 0 });

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => {
      setPosition({ posX: -500, posY: 50, deg: -30 });
      onSwipe("left");
    },
    onSwipedRight: () => {
      setPosition({ posX: 500, posY: 50, deg: 30 });
      onSwipe("right");
    },
    onSwipedDown: () => setPosition({ posX: 0, posY: 0, deg: 0 }), // Reset
    onSwipedUp: () => setPosition({ posX: 0, posY: -50, deg: 0 }), // Optional up motion
    trackMouse: true,
    delta: 10, // sensitivity of swipe
  });

  return (
    <CardContainer>
      <Card
        {...handlers}
        posX={position.posX}
        posY={position.posY}
        deg={position.deg}
      >
        <CardInfo>
          <h3>{profile.name}</h3>
          <p>
            <strong>Gender:</strong> {profile.gender}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>University:</strong> {profile.university}
          </p>
          <p>
            <strong>Interests:</strong> {profile.interests}
          </p>
        </CardInfo>
      </Card>
    </CardContainer>
  );
};

export default ProfileCard;
