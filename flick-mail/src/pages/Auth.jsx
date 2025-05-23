import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserAPI, checkUserAPI } from "../service/allAPI";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.otpless = async (otplessUser) => {
      if (otplessUser.status === "SUCCESS" && otplessUser.token) {
        try {
          const checkResponse = await checkUserAPI(otplessUser.userId);
          toast({
            variant: "outline",
            className: "bg-green-600",
            title: "Login Successfull",
            position: "top-center",
          });

          if (checkResponse.status === 404) {
            const userData = {
              flickuserId: otplessUser.userId,
              token: otplessUser.token,
              verifiedAt: otplessUser.identities[0].verifiedAt,
              identityType:
                otplessUser.identities[0].identityType.toLowerCase(),
              identityValue: otplessUser.identities[0].identityValue,
              ip: otplessUser.network.ip,
              timezone: otplessUser.network.timezone,
            };

            const addResponse = await addUserAPI(userData);
            if (addResponse.status !== 200) {
              throw new Error("Failed to add user");
            }
          }

          localStorage.setItem("flickuserId", otplessUser.userId);
          navigate("/mail");
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      } else {
        console.log("Invalid response, no action taken");
      }
    };
  }, [navigate]);

  return (
    <>
      <div className="h-[729px] bg-gradient-to-r from-[#F5F5F5] via-[#FF6F00] to-[#F5F5F5]">
        <div className="relative top-16" id="otpless-login-page"></div>
        <Toaster />
      </div>
    </>
  );
}

export default Auth;
