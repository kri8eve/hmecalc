import React, { useState } from "react";

function App() {
  const [totalStationCapacity, updateTotalStationCapacity] = useState(0);
  const [sessionPerDay, updateSessionPerDay] = useState(10);
  const [selectedType, updateSelectedType] = useState("DC");
  const [powerOutput, updatePowerOutput] = useState(7.4);

  const [chargers, updateChargers] = useState([]);
  function handleFormChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "totalStationCapacity":
        updateTotalStationCapacity(value);
        break;
      case "sessionPerDay":
        updateSessionPerDay(value);
        break;
      case "powerOutput":
        updatePowerOutput(value);
        break;

      default:
        break;
    }
  }
  function handleAddCharger() {
    var temp = {
      id: Date.now(),
      type: selectedType,
      powerOutput,
    };
    updateChargers((old) => [...old, temp]);
    updateTotalStationCapacity((old) => {
      console.log(old + powerOutput);
      return old + parseFloat(powerOutput);
    });
    updatePowerOutput(0);
  }
  function handleDeleteCharger(charger) {
    updateChargers((old) => {
      const temp = old.filter((i) => i.id != charger.id);
      return temp;
    });
  }
  return (
    <div className="App min-h-screen  bg-[#0d8b65] flex flex-col justify-center items-center">
      <div className="p-4">
        <p className="text-2xl font-semibold text-white">HORSEMEN ENERGY</p>
        <p className="text-white">Calculator</p>
      </div>

      <section className="flex-1 flex flex-col space-y-4 ">
        <div className="text-white mt-8 px-4">
            <p className="font-semibold text-xl ">
              Power Consumed in {sessionPerDay} hr :{" "}
              <span>
                {parseFloat(sessionPerDay * totalStationCapacity).toFixed(2)} Kw
              </span>
            </p>
            <p className="font-semibold text-xl ">
              Total Revenue per Day :{" "}
              <span>
                {parseFloat(sessionPerDay * totalStationCapacity * 15).toFixed(
                  2
                )}{" "}
                Inr
              </span>
            </p>
          </div>
        <form className="px-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="pb-2 text-white">Total Station Capacity</p>
                <p className="outline-none border-2 bg-white px-4 py-2 rounded-md  border-[#d9d9d959] focus:border-white">
                  {parseFloat(totalStationCapacity).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="pb-2 text-white">Session (hr) per day</p>
                <input
                  type={"number"}
                  name="sessionPerDay"
                  value={sessionPerDay}
                  onChange={handleFormChange}
                  min={0}
                  max={24}
                  step={1}
                  className="outline-none border-2 bg-white px-4 py-2 rounded-md  border-[#d9d9d959] focus:border-green-300"
                />
              </div>
            </div>
          </form>
        <div className="p-4 ">
          <div className="flex items-end space-x-4">
            <div>
              <p className="pb-2 text-white">Charger Type</p>
              <div className="flex items-center space-x-4">
                <div
                  onClick={() => updateSelectedType("DC")}
                  style={{
                    background: selectedType == "DC" ? "#F9f9f9" : "#F9F9F930",
                    color: selectedType == "DC" ? "#0d8b65" : "#F9F9F9",
                  }}
                  className="px-4 py-2 rounded-md cursor-pointer"
                >
                  DC
                </div>
                <div
                  style={{
                    background: selectedType == "AC" ? "#F9f9f9" : "#F9F9F930",
                    color: selectedType == "AC" ? "#0d8b65" : "#F9F9F9",
                  }}
                  onClick={() => updateSelectedType("AC")}
                  className="px-4 py-2 rounded-md cursor-pointer"
                >
                  AC
                </div>
              </div>
            </div>
            <div>
              <p className="pb-2 text-white">Power Output</p>
              <input
                type={"number"}
                name="powerOutput"
                value={powerOutput}
                onChange={handleFormChange}
                className="w-[100px] outline-none border-2 bg-white px-4 py-[7px] rounded-md  border-[#d9d9d959] focus:border-white"
              />
            </div>
            <button
              onClick={handleAddCharger}
              className="px-4 py-2 rounded-full text-2xl text-white bg-[#f9f9f92e]"
            >
              +
            </button>
          </div>
          <p className="text-white py-2">Chargers</p>
          <div className="flex flex-col space-y-4">
            {chargers.map((charger, i) => {
              return (
                <ChargerCard
                  key={i}
                  charger={charger}
                  deleteCharger={handleDeleteCharger}
                  decreaseTotalCapacityBy={(val) => {
                    updateTotalStationCapacity((old) => old - parseFloat(val));
                  }}
                  increaseTotalCapacityBy={(val) => {
                    updateTotalStationCapacity((old) => old + parseFloat(val));
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

export function ChargerCard({
  charger,
  deleteCharger,
  decreaseTotalCapacityBy,
  increaseTotalCapacityBy,
}) {
  const [chargerQunatity, updateChargerQunatity] = useState(1);
  return (
    <div className="bg-white  flex items-center justify-between p-4 rounded-md">
      <p>
        {charger.type}~{charger.powerOutput}KwH
      </p>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            updateChargerQunatity((old) => {
              if (old < 2) {
                deleteCharger(charger);
                return old;
              }

              return old - 1;
            });
            decreaseTotalCapacityBy(charger.powerOutput);
          }}
          className="rounded-md flex items-center justify-center h-[30px] w-[30px] bg-[#0d8b65] text-white"
        >
          <span className="text-lg">-</span>
        </button>
        <p>{chargerQunatity}</p>
        <button
          onClick={() => {
            increaseTotalCapacityBy(charger.powerOutput);
            updateChargerQunatity((old) => {
              return old + 1;
            });
          }}
          className="rounded-md flex items-center justify-center h-[30px] w-[30px] bg-[#0d8b65] text-white"
        >
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}
