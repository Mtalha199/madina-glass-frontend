import React from "react";
import Image from "next/image";

export default function TrustedBySection() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <p className="text-sm sm:text-base font-medium text-gray-500 uppercase tracking-wide dark:text-gray-400">
            TRUSTED BY GLOBAL LOGISTICS LEADERS
          </p>

          <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Brand 1 */}
            <div className="flex items-center justify-center h-12 sm:h-14 md:h-16 opacity-60 hover:opacity-100">
              <Image
                src="/images/partners/nyk.png"
                alt="Brand"
                width={120}
                height={60}
                className="h-full w-auto object-contain"
              />
            </div>
            
            {/* Brand 2 */}
            <div className="flex relative top-1 items-center justify-center h-12 sm:h-14 md:h-16 ">
              <Image
                src="/images/partners/siem.png"
                alt="Brand"
                width={120}
                height={60}
                className="h-full w-auto object-contain"
              />
            </div>
            
            {/* Brand 3 */}
            <div className="flex items-center justify-center h-12 sm:h-14 md:h-16 ">
              <Image
                src="/images/partners/roro.png"
                alt="Brand"
                width={120}
                height={60}
                className="h-full w-auto object-contain"
              />
            </div>
            
            {/* Brand 4 */}
            <div className="flex relative top-2 items-center justify-center h-16 sm:h-20 md:h-24 ">
              <Image
                src="/images/partners/eukor.png"
                alt="Brand"
                width={180}
                height={90}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

