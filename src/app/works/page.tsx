'use client'

import {docs} from './api/firebase.js'
import { Suspense, lazy } from "react"
import { Spinner } from '@nextui-org/spinner'
import ImageComp from '@/components/Image'
import NavBar from '@/components/Nav'
import { useState, useEffect } from 'react'
import NavBar2 from '@/components/Nav2'
import styled from 'styled-components'
import Head from 'next/head';


export default function Works(){

  const ResponsiveContainer = styled.div
  `
    @media(max-width: 1001px){
      flex-direction: column;
      align-items: start;
      margin-top: 70px;
      height: 100%;
    }
  `
    const Projects = lazy(()=>import('@/components/Projects'))
    const [clicked, setClicked] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1001);
      };
  
   
      handleResize();
  
    
      window.addEventListener('resize', handleResize);
  
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    function toggleClicked() {
      setClicked(prev => !prev);
      window.scrollTo(0,0)
      return clicked;
    }
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0 && clicked) {
          setIsScrolled(true);
          setClicked(false);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [clicked]);


    return (
    <div
      className={`bg-white flex flex-row justify-center items-center transition-all duration-500 ${isSmallScreen?"h-full":''} ${
        clicked && !isScrolled ? 'w-[88%] mt-80' : 'w-[100%]'
      }`}
    >
      <Head>
        <title>My Next.js Page</title>
        <meta name="description" content="This is my Next.js page description." />
        <link rel="icon" href="/path-to-your-favicon.ico" />
        {/* You can also use other favicon formats */}
        <link rel="icon" href="/path-to-your-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/path-to-your-apple-touch-icon.png" />
      </Head>      
      <NavBar toggle={toggleClicked} />
      <NavBar2 clicked={clicked}/>
      <ResponsiveContainer className={`w-[100%] flex`}>
            {isSmallScreen?null:<ImageComp/>}
        <div className="flex-[0.64] mt-16 px-10">
        <Suspense fallback={<Spinner label="" color="default"/>}> 
                <Projects/>
        </Suspense>
        </div>
      </ResponsiveContainer>
    </div>
    )
}
