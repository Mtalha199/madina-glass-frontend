import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Download, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE } from "@/Constant";
import { useParams } from "react-router-dom";
import { DOWNLOADFILE } from "../DownloadFile";
import { Loader } from "../Loader";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const RateDeckApproval = () => {
  const { id } = useParams();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  // reCAPTCHA states
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    getData();

    // Load the reCAPTCHA script
    const loadRecaptchaScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadRecaptchaScript();

    // Add a cleanup function to remove the script when component unmounts
    return () => {
      const recaptchaScript = document.querySelector(
        'script[src="https://www.google.com/recaptcha/api.js"]'
      );
      if (recaptchaScript) {
        document.body.removeChild(recaptchaScript);
      }
    };
  }, []);

  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.APPROVED_RATE_DECK}/${id}`,
      setloading,
      null,
      setData,
      setCount
    );
  };

  // Handle reCAPTCHA verification
  const handleRecaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  // Handle reCAPTCHA expiration
  const handleRecaptchaExpired = () => {
    setCaptchaVerified(false);
  };
  const [loaderDownload, setLoaderDownload] = useState(false);

  const handleDownload = async () => {
    setLoaderDownload(true);
    try {
      const response =  await DOWNLOADFILE(
        `${API_END_POINT.RATE_DECK}/download/${id}`,
        "Rate deck",
        setLoaderDownload,
        "CSV file download successfully",
        false
      );
      console.log(response,"respisein")
      if (response == true) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}${
            API_END_POINT.APPROVED_RATE_DECK
          }/${id}`
        );
        getData();

      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoaderDownload(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Company Logo and Name */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-2xl font-bold">RC</span>
          </div>
          {/* <h1 className="text-xl font-bold text-blue-600">
            RateCloud Solutions
          </h1> */}
        </div>

        {/* Main Card */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Rate Deck Details</CardTitle>
            {/* <CardDescription>
              Your submission has been reviewed and accepted
            </CardDescription> */}
          </CardHeader>

          <CardContent className="pt-4">
            <div className="space-y-4">
              {/* File Information */}
              <div className="bg-blue-50 rounded-md p-4 mb-4 flex items-center">
                <FileText className="text-blue-500 mr-3" size={24} />
                <div>
                  <h3 className="font-medium">
                    {data?.rate_deck?.file_name || "N/A"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    2.4 MB • Excel Spreadsheet
                  </p>
                </div>
              </div>

              {/* Summary Details */}
              <div className="bg-slate-50 rounded-md p-4 space-y-3">
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">
                    Sip Trunk ID:
                  </span>
                  <span>{data?.sip_trunk?.id || "N/A"}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">
                    Sip Trunk Name:
                  </span>
                  <span>{data?.sip_trunk?.trunk_name || "N/A"}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">
                    Assign Date:
                  </span>
                  <span>{data?.createdAt || "N/A"}</span>
                </div>
                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">
                    Effective Date:
                  </span>
                  <span className="font-medium text-primary">
                    {data?.effective_date || "N/A"}
                  </span>
                </div>
                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Status:</span>
                  <Badge
                    variant={
                      data?.status === "ACTIVE" ? "success" : "warning" || "N/A"
                    }
                  >
                    {data?.status || "N/A"}
                  </Badge>
                </div>
              </div>

              {/* Google reCAPTCHA */}
              <div className="mt-4 space-y-3">
                <div className="text-center mb-2">
                  {/* <h3 className="font-medium">Verify you're human</h3> */}
                  <p className="text-sm text-slate-500 mb-4">
                    Please complete the CAPTCHA verification
                  </p>

                  <div className="flex justify-center">
                    <div
                      className="g-recaptcha"
                      data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual site key in production
                      data-callback="onRecaptchaSuccess"
                      data-expired-callback="onRecaptchaExpired"
                      ref={recaptchaRef}
                    ></div>
                  </div>

                  {/* Add global callback functions for reCAPTCHA */}
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                      window.onRecaptchaSuccess = function(token) {
                        ${handleRecaptchaChange
                          .toString()
                          .replace(
                            "function handleRecaptchaChange(value)",
                            "function(token)"
                          )}
                      };
                      window.onRecaptchaExpired = function() {
                        ${handleRecaptchaExpired
                          .toString()
                          .replace(
                            "function handleRecaptchaExpired()",
                            "function()"
                          )}
                      };
                    `,
                    }}
                  />

                  {captchaVerified && (
                    <div className="mt-4 bg-green-50 rounded-md p-3 flex items-center justify-center">
                      <CheckCircle2 className="text-green-500 mr-2" size={20} />
                      <span className="text-green-700">
                        Verification successful
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-4 space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={() => setTermsAccepted(!termsAccepted)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600">
                    I acknowledge that by downloading this rate deck, I agree to
                    implement these rates effective April 1, 2025, and comply
                    with all applicable terms and conditions as outlined in our
                    service agreement.
                  </label>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
            {
              <>
                {/* loaderDownload ?  <Loader />  :    <Button
              className="w-full py-6"
              disabled={!termsAccepted }
            >
              <Download className="mr-2 h-4 w-4" onClick={handleDownload}   />
              Download Rate Deck
            </Button> */}

                <Button
                  className="w-full py-6"
                  onClick={handleDownload}
                  disabled={!termsAccepted}
                >
                  {loaderDownload ? (
                    <Loader size={60} />
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" /> Download Rate Deck
                    </>
                  )}
                </Button>
              </>
            }
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          Please contact support if you have any questions.
        </div>
      </div>
    </div>
  );
};

export default RateDeckApproval;
