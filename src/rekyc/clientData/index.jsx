import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Button from "@mui/material/Button";
import { color } from "@mui/system";
import DigiLocker from "../digilocker";

export default function TabsVertical(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (e, value, c) => {
    e.preventDefault();
    setSelectedTab(value);
  };
  const renderPersonal = () => {
    return (
      <div className="text-white flex flex-col">
        <div className="flex justify-between">
          <div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">Date Of Birth</p>
              <span>{props?.data?.dateOfBirth ?? ""}</span>
            </div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">Email</p>
              <span>{props?.data?.email ?? ""}</span>
            </div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">Mother's Name</p>
              <span>{props?.data?.name ?? ""}</span>
            </div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">PAN</p>
              <span>{props?.data?.panNumber ?? ""}</span>
            </div>
          </div>
          {/* 000000000000000000000000000000000000000 */}
          <div className="w-[50%]">
            <div className="flex py-2 flex-col">
              <p className="font-bold">Gender</p>
              <span>{props?.data?.gender ?? "N/A"}</span>
            </div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">Mobile No.</p>
              <span>{props?.data?.phoneNumber ?? ""}</span>
            </div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">Father's Name</p>
              <span>{props?.data?.fatherName ?? ""}</span>
            </div>
            <div className="flex py-2 flex-col">
              <p className="font-bold">Address</p>
              <span className="flex flex-wrap">
                {`${props?.data?.clientAddressOne}  -  ${props?.data?.pincode}` ??
                  ""}
              </span>
            </div>
          </div>
        </div>
        </div>
    );
  };
  const renderBank = () => {
    const bankData = props?.data?.bankDetailsOfUser ?? [];
    return bankData.map((item) => (
      <div className="flex bg-lightGrey text-white w-1/3 flex-col justify-start items-start">
        <div className="py-2">
          {" "}
          <input type="checkbox" id="markAsDefaultBank" />{" "}
          <label htmlFor="markAsDefaultBank">Mark as Default</label>
        </div>

        <div className="flex py-2 flex-col">
          <p className="font-bold">Account Number</p>
          <span>{item?.accountNumber ?? ""}</span>
        </div>
        <div className="flex py-2 flex-col">
          <p className="font-bold">Account Type</p>
          <span>{item?.accountType ?? ""}</span>
        </div>
        <div className="flex py-2 flex-col">
          <p className="font-bold">Account IFSC</p>
          <span>{item?.ifsc ?? ""}</span>
        </div>
      </div>
    ));
  };
  const renderNominee = () => {
    return <div>Nominee Details</div>;
  };
  const renderOthers = () => {
    return <div>Others Section</div>;
  };
  const renderDocuments = () => {
    return <div>Documents</div>;
  };

  const handleTabNext = (value) => {
    setSelectedTab(+value);
  };

  return (
    <>
      <>
        <DigiLocker/>
      </>
      <div className="flex px-2 bg-lightGrey text-white justify-between items-center w-full py-4 rounded-t-xl">
        <div className="flex flex-col">
          <p className="">Name</p>
          <span className="py-2">{props?.data?.name ?? ""}</span>
        </div>
        <div className="flex flex-col">
          <p className="">Client Id</p>
          <span className="py-2">{props?.data?.clientCode ?? ""}</span>
        </div>
        <div className="flex flex-col">
          <p className="">Status</p>
          <span className="py-2">{props?.data?.accountStatus ?? ""}</span>
        </div>
        <div className="flex flex-col">
          <p className="">CYCN NO.</p>
          <span className="py-2">{props?.data?.name ?? ""}</span>
        </div>
      </div>
      <Tabs
        aria-label="Vertical tabs"
        orientation="vertical"
        variant="outlined"
        sx={{ minWidth: 300, minHeight: 160, }}
        onChange={handleTabChange}
        value={selectedTab}
      >
        <TabList sx={{color:"white", border:"2px solid #343434", borderRadius:"0px 0px 0px 12px", }}>
          <Tab sx={{ padding:"16px"}}>Personal</Tab>
          <Tab sx={{ padding:"16px"}}>Bank</Tab>
          <Tab sx={{ padding:"16px"}}>Other</Tab>
          <Tab sx={{ padding:"16px"}}>Nominee</Tab>
          <Tab sx={{ padding:"16px"}}>Documents</Tab>
        </TabList>
        <TabPanel value={0} sx={{ backgroundColor:"#343434",borderRadius:"0px 0px 12px 0px"}}>
          {renderPersonal()}
          <div className="flex justify-end">
            {" "}
            <Button
              variant="contained"
              color="success"
              onClick={() => handleTabNext(1)}
            >
              Next
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={1} sx={{ backgroundColor:"#343434",borderRadius:"0px 0px 12px 0px"}}>
          <div className="flex px-2 justify-evenly items-center w-full ">
            {renderBank()}
          </div>
          <div className="flex justify-between">
            <Button
              variant="contained"
              color="info"
              onClick={() => handleTabNext(0)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleTabNext(2)}
            >
              Next
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={2}>
          {renderOthers()}
          <div className="flex justify-between">
            <Button
              variant="contained"
              color="info"
              onClick={() => handleTabNext(1)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleTabNext(3)}
            >
              Next
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={3}>
          {renderNominee()}
          <div className="flex justify-between">
            <Button
              variant="contained"
              color="info"
              onClick={() => handleTabNext(2)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleTabNext(4)}
            >
              Next
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={4}>
          {renderDocuments()}{" "}
          <Button
            variant="contained"
            color="info"
            onClick={() => handleTabNext(3)}
          >
            Previous
          </Button>
        </TabPanel>
      </Tabs>
    </>
  );
}
