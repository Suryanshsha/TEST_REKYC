import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import Loader from "../../component/loader";
import { extractParamsValue } from "../../utils/function";
import RImg from "../../component/rImg";
import RButton from "../../component/rButton";
import "./styles.scss";
import { toast, ToastContainer } from "react-toastify";

function DigiLocker(props) {
  const [codeChallenger, setCodeChallenger] = useState("");
  const { fetchData, loading } = useApi();
  const [digiInfo, setDigiInfo] = useState(false);

  const extractCodeFromURL = () => {
    const { pathname, search, origin } = window.location;

    if (pathname.includes("/call") && search.includes("code=")) {
      const url = `${origin}${pathname}`;
      const newURL = url.replace("/call", "");
      // Update the URL in the browser without refreshing the page
      window.history.replaceState({}, document.title, newURL);
    } else {
      setDigiInfo(true);
    }
  };
  const fetchCodeChallenger = async () => {
    try {
      const data = await fetchData("rekyc/digilocker/code/challenger");
      await setCodeChallenger(data?.codeChallenger);
      //await setSessionCodeChallenger(data?.codeChallenger);
    } catch (error) {}
  };

  const handleDigiLocker = () => {
    if (codeChallenger) {
      const stateId = "rmsign" + Math.random().toString(36).substring(7);
      sessionStorage.setItem("state", stateId);

      const redirectUri = encodeURIComponent("https://rat.d32vycwx8evyoc.amplifyapp.com/call");
      const digiLockerUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=FX43913E9F&state=${stateId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenger}&code_challenge_method=S256`;

      window.location.href = digiLockerUrl;
    } else {
      toast.info("We are fetching data from DIGILOCKER.  Kindly Wait!!!");
    }
  };

  useEffect(() => {
    const codeValue = extractParamsValue(window.location.href, "code");
    if (codeValue) {
      extractCodeFromURL();
      props.handlePostRequest({ code: codeValue }, "rekyc/digilocker/access-details/user");
    } else {
      fetchCodeChallenger();
    }
  }, []);

  return (
    // <>
    //   {/* <div className="bg-lightBlack text-white rounded-t-2xl">
    //     <div>
    //       <RImg
    //         src="https://img1.digitallocker.gov.in/assets/img/digiLocker-Medium.png"
    //         alt="Sample Image"
    //         innerImgClassName=""
    //         externalClassName="rounded-xl flex justify-center"
    //       />
    //     </div>
    //     <RImg
    //       src={Gif}
    //       height="300px"
    //       externalClassName="rounded-xl flex justify-center"
    //       innerImgClassName="w-[400px]"
    //     />
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
    //     temporibus et repudiandae.
    //   </div> */}
    //     <div className="digilocker-page bg-lightBlack rounded-t-2xl flex flex-row">
    //       <div className="left-head verification-head w-[50%] flex items-center justify-center">
    //         <div
    //           className="verification-left flex flex-col justify-center md:px-12
    //       md:py-16"
    //         >
    //           <p className="verification-text text-white text-3xl  flex items-center gap-2">
    //             Verification
    //           </p>
    //           <p className="left-mid bg-silver text-xl text-white opacity-60">
    //             Aadhar & PAN
    //           </p>
    //           <div className="web-btn pt-6 max-[550px]:hidden">
    //             <RButton
    //               buttonName="Proceed to Digi Locker"
    //               handleButtonClick={handleDigiLocker}
    //               disabled={!Boolean(codeChallenger)}
    //               externalClassName="digiLocker-btn"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <Loader open={loading} />
    //       <div className="w-[50%] right-head flex justify-center">
    //         <div
    //           onClick={handleDigiLocker}
    //           disabled={!Boolean(codeChallenger)}
    //           className="digiRight-box border-white md:p-4 rounded-xl cursor-pointer "
    //         >
    //           <div>
    //             <RImg
    //               src="https://img1.digitallocker.gov.in/assets/img/digiLocker-Medium.png"
    //               alt="Sample Image"
    //               innerImgClassName=""
    //               externalClassName="rounded-xl"
    //             />
    //             {/* <RImg
    //               src={Gif}
    //               externalClassName="rounded-xl flex justify-center"
    //               innerImgClassName=" w-[400px] h-[380px] rounded-xl"
    //             /> */}
    //             <div className="mob-btn w-[100%] flex justify-center mb-10 min-[550px]:hidden">
    //               <RButton
    //                 buttonName="Proceed to Digi Locker"
    //                 disabled={!Boolean(codeChallenger)}
    //                 externalClassName="digiMob-btn"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   <ToastContainer />
    // </>
    <>
      <button
         onClick={handleDigiLocker}
         disabled={!Boolean(codeChallenger)}
      >DIGILOCKER</button>
    </>
  );
}

export default DigiLocker ;
