import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Lottie from 'lottie-react';
import waves from "@/../public/icons/waves.json"
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@nextui-org/react";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function MusicPlayer(params: Params) {
//ssyles


  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576);
    };

 
    handleResize();

  
    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const smallScreenStyles: React.CSSProperties = {
    marginTop: '8rem',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '4rem',
  };
  const ParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1rem;
  width: 100%;
`;

const NowPlayingDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: -12px;

  & > div {
    width: 50px;
    height: 50px;
  }
`;

const SongName = styled.h1`
  font-size: 1.5rem; /* 3xl */
  font-weight: bold;
  line-height: 1.5rem; /* leading-6 */
`;

const ArtistName = styled.p`
  font-size: 0.9rem; /* sm */
  opacity: 0.5;
`;

const FixedDiv = styled.div`
  position: fixed;
  top: 0.75rem; /* 3 */
  right: 0.75rem; /* 3 */

  .icon-button {
    color: rgba(0, 0, 0, 0.6); /* text-default-900/60 */
    transform: translate(-0.5rem, 0.5rem); /* -translate-y-2 translate-x-2 */
    position: absolute;
    top: 1rem; /* 4 */
    right: 1rem; /* 4 */
  }

  .icon-button:hover {
    background-color: rgba(0, 0, 0, 0.1); /* data-[hover]:bg-foreground/10 */
  }
`;



  const [liked, setLiked] = useState(false);
  const [play, setPlay] = useState(false)

  const audioPlayer = useRef<HTMLAudioElement>(null)

  function togglePlay(){
    if(!play){
    audioPlayer.current?.play()
    }else{
      audioPlayer.current?.pause()
    }
    setPlay(prev=>!prev)
  }
  
  return (
    <Card
      isBlurred
      className={`overflow-scroll flex flex-row items-center col-span-2 justify-center border-none w-[full] ${isSmallScreen?"h-[500px]":"h-[280px]"} relative bg-white hover:transform hover:scale-105 hover:z-10 transition duration-400 cursor-pointer`}
      shadow="sm"
    >
      <CardBody className={`bg-white/70 p-4 rounded-lg overflow-scroll ${isSmallScreen?"-mt-48":""}`}>
      <div
      className="flex justify-evenly gap-16 items-center min-h-[215px] w-[100%]"
      style={isSmallScreen ? smallScreenStyles : {}}
      >
         <div className="relative"> 
          <Image
            alt="Album cover"
            className="object-cover h-[230px] rounded-lg"
            shadow="md"
            src={params.albumCover}
            width="100%"
          />
          <div className="w-[100%] h-[100%] bg-black absolute top-0 z-10 opacity-0 rounded hover:opacity-70 transition duration-400 flex flex-row justify-center items-center">
           <div className="w-[210px] flex flex-row justify-evenly transition duration-400"> 

            <Button
            isIconOnly
            radius="full"
            variant="light"
            onPress={params.prevSong}
            >
              <FontAwesomeIcon icon={faBackward} style={{color:"#fff"}} size="2x"/>
            </Button>  
            
            <Button
            isIconOnly
            onPress={togglePlay}
            radius="full"
            variant="light"
            >
            {play?<FontAwesomeIcon icon={faPause} style={{color: "#ffffff",}} size="3x"/>:<FontAwesomeIcon icon={faPlay} style={{color: "#ffffff",}} size="3x"/>}
            </Button>  
        
            <Button
            isIconOnly
            onPress={params.nextSong}
            radius="full"
            variant="light"
            >
              <FontAwesomeIcon icon={faForward} style={{color:"#fff"}} size="2x"/>
            </Button>

           </div>
          </div>
          </div>
          <ParentDiv>
      <ContentDiv>
        <div className="flex justify-between w-full">
          <FontAwesomeIcon icon={faSpotify} style={{ color: "#1ed760" }} size="2x" />
          <NowPlayingDiv>
            <div>
              <Lottie animationData={waves} />
            </div>
            <p className="text-base text-[#1ED760] font-semibold">My Favorites</p>
          </NowPlayingDiv>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <SongName>{params.songName}</SongName>
          <ArtistName>{params.artistName}</ArtistName>
        </div>
      </ContentDiv>
    </ParentDiv>
        </div>
        <audio ref={audioPlayer} src={params.preview}/>
      </CardBody>
    </Card>
  );
}
