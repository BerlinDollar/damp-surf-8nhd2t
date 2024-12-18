import React, { useState, useEffect } from "react";

const KirayedariApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [roomNo, setRoomNo] = useState("");
  const [tenantName, setTenantName] = useState("");

  const [oldElectricUnit, setOldElectricUnit] = useState("");
  const [currentElectricUnit, setCurrentElectricUnit] = useState("");
  const [unitRate, setUnitRate] = useState("");
  const [govtMeterAmount, setGovtMeterAmount] = useState("");
  const [showGovtMeter, setShowGovtMeter] = useState(false);

  const [waterCharge, setWaterCharge] = useState("");
  const [extraLightCharge, setExtraLightCharge] = useState("");
  const [maintenanceCharge, setMaintenanceCharge] = useState("");
  const [safaiCharge, setSafaiCharge] = useState("");

  const [roomRent, setRoomRent] = useState("");
  const [lateRentFine, setLateRentFine] = useState("");
  const [previousBalance, setPreviousBalance] = useState("");

  const [report, setReport] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCalculate = () => {
    const totalUnits = currentElectricUnit - oldElectricUnit;
    const totalElectricCharge = totalUnits * unitRate;
    const totalRent = showGovtMeter
      ? parseFloat(govtMeterAmount || 0) +
        parseFloat(waterCharge || 0) +
        parseFloat(extraLightCharge || 0) +
        parseFloat(maintenanceCharge || 0) +
        parseFloat(safaiCharge || 0) +
        parseFloat(roomRent || 0) +
        parseFloat(lateRentFine || 0) +
        parseFloat(previousBalance || 0)
      : parseFloat(totalElectricCharge || 0) +
        parseFloat(waterCharge || 0) +
        parseFloat(extraLightCharge || 0) +
        parseFloat(maintenanceCharge || 0) +
        parseFloat(safaiCharge || 0) +
        parseFloat(roomRent || 0) +
        parseFloat(lateRentFine || 0) +
        parseFloat(previousBalance || 0);

    const reportContent = `
      किरायेदार परची
      Date & Time: ${currentTime.toLocaleString()}
      Room No: ${roomNo}
      Tenant Name: ${tenantName.toUpperCase()}
      ${
        showGovtMeter
          ? `Govt Meter Amount: ${govtMeterAmount}`
          : `
      Old Electric Unit: ${oldElectricUnit}
      Current Electric Unit: ${currentElectricUnit}
      Total Units: ${totalUnits}
      Total Electric Charge: ${totalElectricCharge}`
      }
      Water Charge: ${waterCharge}
      Extra Light Charge: ${extraLightCharge}
      Maintenance Charge: ${maintenanceCharge}
      Safai Charge: ${safaiCharge}
      Room Rent: ${roomRent}
      Late Rent Fine: ${lateRentFine}
      Previous Balance: ${previousBalance}
      Total Rent to Collect: ${totalRent}
      कृपया स्क्रीनशॉट लें और किरायेदार को साझा करें
    `;
    setReport(reportContent);
  };

  const handleReset = () => {
    setRoomNo("");
    setTenantName("");
    setOldElectricUnit("");
    setCurrentElectricUnit("");
    setUnitRate("");
    setGovtMeterAmount("");
    setWaterCharge("");
    setExtraLightCharge("");
    setMaintenanceCharge("");
    setSafaiCharge("");
    setRoomRent("");
    setLateRentFine("");
    setPreviousBalance("");
    setReport("");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto border border-gray-300 rounded shadow">
      <h1 className="text-center text-2xl font-bold">Kirayedari App</h1>
      <p className="text-center">
        {currentTime.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </p>

      <div className="mt-4">
        <label>Room NO:</label>
        <input
          type="text"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>

      <div className="mt-4">
        <label>Tenant Name:</label>
        <input
          type="text"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>

      {/* Left Section */}
      <h3 className="text-blue-500 font-bold mt-6">Electric Consumption</h3>
      {!showGovtMeter && (
        <>
          <div>
            <label>Old Electric Unit:</label>
            <input
              type="text"
              value={oldElectricUnit}
              onChange={(e) => setOldElectricUnit(e.target.value)}
              className="block w-full p-2 border-2 border-gray-200"
            />
          </div>
          <div>
            <label>Current Electric Unit:</label>
            <input
              type="text"
              value={currentElectricUnit}
              onChange={(e) => setCurrentElectricUnit(e.target.value)}
              className="block w-full p-2 border-2 border-gray-200"
            />
          </div>
          <div>
            <label>Unit Rate:</label>
            <input
              type="text"
              value={unitRate}
              onChange={(e) => setUnitRate(e.target.value)}
              className="block w-full p-2 border-2 border-gray-200"
            />
          </div>
        </>
      )}
      {showGovtMeter && (
        <div>
          <label>Govt Meter Amount:</label>
          <input
            type="text"
            value={govtMeterAmount}
            onChange={(e) => setGovtMeterAmount(e.target.value)}
            className="block w-full p-2 border-2 border-gray-200"
          />
        </div>
      )}

      {/* Center Section */}
      <h3 className="text-orange-500 font-bold mt-6">Extra Charges</h3>
      <div>
        <label>Water Charge:</label>
        <input
          type="text"
          value={waterCharge}
          onChange={(e) => setWaterCharge(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>
      <div>
        <label>Extra Light Charge:</label>
        <input
          type="text"
          value={extraLightCharge}
          onChange={(e) => setExtraLightCharge(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>
      <div>
        <label>Maintenance Charge:</label>
        <input
          type="text"
          value={maintenanceCharge}
          onChange={(e) => setMaintenanceCharge(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>
      <div>
        <label>Safai Charge:</label>
        <input
          type="text"
          value={safaiCharge}
          onChange={(e) => setSafaiCharge(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>

      {/* Right Section */}
      <h3 className="text-red-500 font-bold mt-6">Rent Record</h3>
      <div>
        <label>Room Rent:</label>
        <input
          type="text"
          value={roomRent}
          onChange={(e) => setRoomRent(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>
      <div>
        <label>Late Rent Fine:</label>
        <input
          type="text"
          value={lateRentFine}
          onChange={(e) => setLateRentFine(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>
      <div>
        <label>Previous Balance:</label>
        <input
          type="text"
          value={previousBalance}
          onChange={(e) => setPreviousBalance(e.target.value)}
          className="block w-full p-2 border-2 border-gray-200"
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleCalculate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
        <button
          onClick={() => setShowGovtMeter(!showGovtMeter)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Govt Meter
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Report Section */}
      {report && (
        <div className="mt-6 border-2 border-gray-400 p-4">
          <pre className="whitespace-pre-wrap">{report}</pre>
        </div>
      )}
    </div>
  );
};

export default KirayedariApp;
