import React, { useState } from "react";
import Loader from "../../component/loader";
import useApi from "../../hooks/useApi";
import "./styles.scss";
import RButton from "../../component/rButton";
import Ekyc from "../../assests/kyc/ekycLogo.png";
import EditButton from "../../assests/email/editButton.png";
import RImg from "../../component/rImg";
import ClientData from "../clientData";

function ClientIdLogin(props) {
  const [clientId, setClientId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const [valid, setValid] = useState(false);
  const [otp, setOtp] = useState("");
  const { loading, error, postData } = useApi();
  console.log(props, "---------->");

  const handleChange = (event) => {
   
    setClientId(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event, value) => {
    event?.preventDefault();
    // Perform validation
    const id = value ?? clientId;
    const regex = /^([a-zA-Z0-9_-]){3,9}$/;
    const isValid = regex.test(id);
    if (isValid) {
      props.handlePostRequest({ value: clientId }, `rekyc/send/otp`);
      setErrorMsg("");
      setValid(isValid);
    } else {
      setErrorMsg("* Invalid Client Id");
    }
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    if (otp.trim().length === 4) {
      props.handlePostRequest({ dpId: clientId, otp: otp }, `rekyc/verify/otp`);
    } else {
      setOtpErrorMsg("Invalid OTP");
    }
  };
  const handleCancelOTP = () => {
    setValid(false);
    setOtp("");
    setOtpErrorMsg("");
  };
  const handleEditNumber = () => {
    setValid(false);
  };
  return (
    // <>
    //   {props?.response?.accountStatus ? (
    //     <ClientData data={props?.response} />
    //   ) : (
    //     <>
    //       {" "}
    //       <form className="email-container flex justify-around items-center flex-wrap rounded-t-2xl p-3 bg-grey">
    //         <div className="left-container">
    //           <div className="email-container-content text-white text-6xqwwl max-[1087px]:text-5xl max-[998px]:text-4xl">
    //             <Loader open={loading} />
    //             <p>RE KYC your Ryz </p>
    //             <p> Market Account in</p>
    //             <p>just 5 minutes</p>
    //             <p className="note-main text-xs mt-6 text-white">
    //               NOTE: RYZ MARKET IS DOING CLIENT BASED <br /> TRADING AND PRO
    //               ACCOUNT TRADING.
    //             </p>
    //           </div>
    //         </div>
    //         {/* Right Container */}
    //         <div className="right-container">
    //           <div className="rounded-xl text-white border-2 border-white">
    //             <div className="flex justify-end p-4">
    //               <p className="font-bold text-lightGrey text-3xl px-4 pt-2 opacity-25">
    //                 Client Login
    //               </p>
    //             </div>
    //             <div>
    //               {!valid && (
    //                 <>
    //                   <div className="login-container p-9 max-[998px]:p-5">
    //                     <div className="mb-3">
    //                       <p className="right-content text-2xl">
    //                         Enter Client ID
    //                       </p>
    //                     </div>
    //                     <div className="mb-2">
    //                       <input
    //                         autoFocus={true}
    //                         type="text"
    //                         name="clientId"
    //                         id="clientId"
    //                         value={clientId}
    //                         onChange={handleChange}
    //                         placeholder="Enter Client ID"
    //                         className="numberInput p-3 rounded-full spin-button-none text-white"
    //                       />
    //                     </div>
    //                     <p className="text-red mb-5">{errorMsg}</p>
    //                     <div className="flex">
    //                       <input type="checkbox" checked className="me-4" />
    //                       <div className="text-sm max-[998px]:text-xs">
    //                         I agree to receive communication from Ryz
    //                         <br /> through SMS, Whatsapp, Email, and Calls.
    //                       </div>
    //                     </div>
    //                     <br />
    //                     <RButton
    //                       handleButtonClick={handleSubmit}
    //                       buttonName="Send otp"
    //                       bgColor="bg-tertiary"
    //                       externalClassName="p-2"
    //                       type={"submit"}
    //                     />
    //                   </div>
    //                 </>
    //               )}
    //               {valid ? (
    //                 <>
    //                   <div className="login-container p-9 max-[998px]:p-5">
    //                     <p className="right-content text-2xl mb-1">
    //                       Enter the OTP sent on
    //                       <br />
    //                       to your mobile no. or email id
    //                     </p>
    //                     <div className="flex">
    //                       <p className="mb-3 opacity-70">{clientId}</p>
    //                       <div onClick={handleEditNumber}>
    //                         <RImg
    //                           innerImgClassName="w-[20px]"
    //                           externalClassName="ml-4"
    //                           src={EditButton}
    //                           alt="edit"
    //                         />
    //                       </div>
    //                     </div>
    //                     <div className="mb-3">
    //                       <input
    //                         autoFocus
    //                         type="number"
    //                         name="otp"
    //                         id="otp"
    //                         value={otp}
    //                         onChange={handleOtpChange}
    //                         placeholder="Enter otp"
    //                         className="numberInput p-3 rounded-full spin-button-none text-white"
    //                       />
    //                     </div>

    //                     <div className="mob-button flex justify-between mt-3">
    //                       <p
    //                         onClick={handleCancelOTP}
    //                         className="cursor-pointer"
    //                       >
    //                         Cancel OTP
    //                       </p>
    //                       <p onClick={handleSubmit} className="cursor-pointer">
    //                         Resend
    //                       </p>
    //                     </div>
    //                     <RButton
    //                       handleButtonClick={handleOtpSubmit}
    //                       buttonName="Continue"
    //                       bgColor="bg-tertiary"
    //                       externalClassName="p-2 mt-2"
    //                       type={"submit"}
    //                     />
    //                   </div>
    //                 </>
    //               ) : null}
    //             </div>
    //           </div>
    //           <p className="note text-xs mt-6 text-white">
    //             NOTE: RYZ MARKET IS DOING CLIENT BASED <br /> TRADING AND PRO
    //             ACCOUNT TRADING.
    //           </p>
    //         </div>
    //       </form>
    //       <div className="ekyc-container flex justify-end bg-lightBlack">
    //         <img className="ekyc-img w-[40%] mr-[9%]" src={Ekyc} alt="" />
    //       </div>
    //     </>
    //   )}
    // </>
    <>
      <ClientData />
    </>
  );
}

export { ClientIdLogin };
