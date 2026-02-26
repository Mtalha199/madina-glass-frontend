import React from "react";
import Image from "next/image";

export default function FeatureCard(props: any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={props.imageSrc}
          alt={props.imageAlt}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center bottom" }}
          width={400}
          height={400}
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 text-center dark:text-white">
        {props.title}
      </h3>
    </div>
  );
}

