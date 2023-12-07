import React from "react";
import Lion from "../../assests/verification/lion.svg";
import Flag from "../../assests/verification/flagText.svg";
import Bharat from "../../assests/verification/bharatText.svg";
import "./style.scss";
import RButton from "../../component/rButton";
import Verified from "../../assests/verification/verified.png"
import RImg from "../../component/rImg"

function Verification(props) {
  const { aadharResponseData, panCardDataDto } = props.data;

  return (
    <>
      <div className="verification-page flex flex-row rounded-t-2xl">
        <div className="left-head w-[50%] flex  items-center">
          <div className="verified-left flex flex-col justify-center px-12
          py-16">
            <p className="left-up text-white text-3xl  flex items-center gap-2">
              Verified <RImg
                src={Verified}
                alt="ryzKyc"
                width="35px"
                externalClassName="flex justify-center items-center"
                innerImgClassName="verified-tick"
              />
            </p>
            <p className="left-mid bg-silver text-xl text-white opacity-60">
            Aadhar & PAN
            </p>
            <div className="web-btn pt-6 max-[550px]:hidden" >
              <RButton
                buttonName="Proceed"
                handleButtonClick={() => props.handleKycStatus("PERSONAL_INFO")}
                bgColor=""
                color
                border
                text
                externalClassName="verified-btn"
              />
            </div>
          </div>
        </div>
        <div className="right-head w-[50%] flex flex-col justify-center items-center">
          <div className="right-box border border-white p-4 rounded-xl w-[100%]  my-10 mr-2 ">
            <div className="aadharPan-wrapper flex flex-col w-full">
              <div className="aadhar-card w-[100%] border rounded-lg bg-white mb-4">
                <div className="flex justify-around mb-2 ">
                  <img src={Lion} alt="" width="8%" />
                  <img src={Flag} alt="" width="70%" />
                </div>
                <div className="flex">
                  <div className="aadhar-image m-2">
                    <img
                      src={`data:img/jpeg;base64, ${aadharResponseData?.aadharProfilePhotoBase64 ?? ""
                        }`}
                      alt="Aadhar card of user"
                      className="border"
                      width="80px"
                    />
                  </div>
                  <div className="aadhar-info font-bold">
                    <p>Name: {aadharResponseData?.name ?? ""}</p>
                    <p>DOB: {panCardDataDto?.dob ?? ""}</p>
                    <p>Gender: {panCardDataDto?.gender ?? ""} </p>
                  </div>
                </div>
                <div className="aadhar-no text-center my-3 font-bold text-xl">
                  
                  {aadharResponseData?.maskAadharNumber ?? ""}
                  <hr className="text-red" />
                </div>
                <div className="text-center font-bold">
                  आधार - आम आदमी का अधिकार
                </div>
              </div>
              <div className="pan-card w-[100%] border rounded-lg">
                <div className="flex justify-around">
                  <div className="">
                    <p className=" pan-heading1 text-sm text-center">आयकर विभाग</p>
                    <p className="pan-heading ">INCOME TAX DEPARTMENT</p>
                  </div>
                  <img src={Lion} alt="lion" width="8%" />
                  <img src={Bharat} alt="" width="40%" />
                </div>
                <div className="flex">
                  <img
                    src={`data:img/jpeg;base64, ${aadharResponseData?.aadharProfilePhotoBase64 ?? ""
                  }`}
                    alt="Pan card of user"
                    width="100px"
                    height="100px"
                    className="pan-image border ml-2"
                  />
                  <div className="flex justify-center w-[60%]">
                    <p className="pan-no">PAN CARD NUMBER</p>
                    <span className="font-bold "> {panCardDataDto?.panNumber ?? ""}</span>
                  </div>
                  
                </div>
                <div className="aadhar-info ml-2">
                    <p>NAME: <span className="font-bold"> {panCardDataDto?.name ?? ""}</span></p>
                    <p>FATHER NAME: <span className="font-bold"> {aadharResponseData?.careOf ?? ""}</span></p>
                    <p>Date Of Birth:<span className="font-bold"> {panCardDataDto?.dob ?? ""}</span></p>
                </div>
              </div>
            </div>
          </div>  
              <div className="mob-btn w-[100%] ml-12  mb-6 min-[550px]:hidden">
              <RButton
                buttonName="Proceed"
                handleButtonClick={() => props.handleKycStatus("PERSONAL_INFO")}
                bgColor=""
                color
                border
                text
                externalClassName="verified-btn"
              />
            </div>
        </div>
      </div>
        
    </>
  );
}

export { Verification };
