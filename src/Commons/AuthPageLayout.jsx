import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/Constant";

const AuthPageLayout = ({
  TITLE,
  DESCRIPTION,
  FOOTER,
  LINK,
  LINK_HEADING,
  children,
}) => {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-6 xl:min-h-screen">
      <div className="col-span-2 flex flex-col justify-center pt-10 lg:min-h-screen px-10 ">
        <div className="mx-auto flex flex-col justify-between w-full min-w-[400px] h-full">
          <div>
            <div className="flex mb-8">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="grid gap-2 mb-8">
              <h1 className="text-primary text-2xl font-bold">{TITLE}</h1>
              <p className="text-muted-foreground">{DESCRIPTION}</p>
            </div>
            <div className="grid gap-6">{children}</div>
          </div>
          <div className="mt-auto text-sm pb-5">
            {FOOTER} 
            <Link to={LINK} className="text-primary font-bold underline ps-1">
              {LINK_HEADING}
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-4 hidden bg-muted lg:block">
        {/* <img
          src={SectionImage}
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
};

export default AuthPageLayout;
