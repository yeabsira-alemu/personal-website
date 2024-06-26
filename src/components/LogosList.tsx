import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import styled from "styled-components";

export default function Logos() {

  const ResponsiveLogos = styled.div`
  display: flex;

  @media (max-width: 576px) {
    margin-bottom: 5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 5rem;
    
  }

  @media (max-width: 460px){
      max-width: 300px;
      column-gap: 4rem;
  }
`;

  const logos = [
    { name: "React", src: "/logos/react.svg" },
    { name: "Next js", src: "/logos/next.svg" },
    { name: "Javascript", src: "/logos/javascript.svg" },
    { name: "Tailwind", src: "/logos/tailwind.svg" },
    { name: "Firebase", src: "/logos/firebase.svg" },
    { name: "AWS", src: "/logos/aws.svg" },
    //{ name: "Python", src: "/logos/python-5.svg" },
    { name: "Mongo DB", src: "/logos/mongodb.svg" },
    { name: "SQL", src: "/logos/sql.svg" }
  ];

  return (
    <ResponsiveLogos className="max-w-[500px] flex flex-row gap-9 top-72" id="logo-wrapper">
      {logos.map((logo, index) => (
        <Tooltip key={index} content={logo.name}>
          <div className="flex justify-center items-center">
            <Image
              src={logo.src}
              alt={logo.name}
              width={35}
              height={35}
              objectFit="cover"
            />
          </div>
        </Tooltip>
      ))}
    </ResponsiveLogos>
  );
}
