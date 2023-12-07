import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import useSessionStorage from "../hooks/useSession";
import { toast, ToastContainer } from "react-toastify";
import {ClientIdLogin} from "./clientLoginId";
import { Verification } from "./verification";
import ClientData from "./clientData";
import Digilocker from "../rekyc/digilocker";


function Rekyc() {
  const [response, setResponse] = useState("");
  const { loading, postData, error, fetchData } = useApi();
  const [legalityData, setLegalityData] = useState();
  const [kycStatus, setKycStatus] = useSessionStorage("kycStatus", "");
  const [xUserId, setXUserId] = useSessionStorage("xuserid", "");

  const handlePostRequest = async (data, url, isPatch = false) => {
    try {
        // Make the POST or PATCH request
        const response = await postData(url, data, isPatch);

        // Extract xuserid and kycStatus from the response
        const resXUserId = response?.xuserid;
        const resKycStatus = response?.kycStatus;

        // Store xuserid in sessionStorage
        if (resXUserId) {
            setXUserId(resXUserId);
        }

        // Update kycStatus
        if (resKycStatus) {
            setKycStatus(resKycStatus);
        }

        // Set the entire response to your state if needed
        setResponse(response);
    } catch (e) {
        // Handle any errors that occur during the request
        const err = e.message ?? "Something went wrong";
        toast.error(err);
    }
};
  const isToken = () => {
    const token = sessionStorage.getItem("token");
    if (token?.length > 15) return true;
    return false;
  } ;
  const handleFetchData = async (url) => {
    try {
      const response = await fetchData(url);
      const resKycStatus = await response?.kycStatus;
      (await resKycStatus) && setKycStatus(resKycStatus);
      setResponse(response);
    } catch (e) {
      const err = await e;
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const pathName = window?.location?.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const documnetIds = urlParams.get("documentId");
    if (pathName === "/legality/callback" && documnetIds && isToken()) {
      const url = `${origin}${pathName}`;
      const newURL = url.replace("/legality/callback", "");
      window.history.replaceState({}, document.title, newURL);
      handleFetchData(`esign/esign/${documnetIds}`);
      setLegalityData(documnetIds);
    }
  }, []);

  const handleKycStatus = (val) => {
    setKycStatus(val);
  };
  const renderKycComponent = () => {
    switch (kycStatus) {
      case "CLIENT_ID":
        return (
          <ClientIdLogin
            handlePostRequest={handlePostRequest}
            response={response}
          />
        );
      case "CLIENT_DATA":
        return <ClientData handlePostRequest={handlePostRequest} />;
      case "DIGILOCKER":
        return <Digilocker handlePostRequest={handlePostRequest} />;
      case "VERIFICATION":
        return (
          <Verification handleKycStatus={handleKycStatus} data={response} />
        );
      case "CLIENT_DATA":
        return <ClientData handleKycStatus={handleKycStatus} />;
      default:
        return (
          <ClientIdLogin
            handlePostRequest={handlePostRequest}
            response={response}
          />
        );
    }
  };
  return (
    <div>
      {renderKycComponent()}
    </div>
  )
}

export default Rekyc
