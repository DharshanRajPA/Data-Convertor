import { useState } from "react";
import "./App.css";
import { AppBar } from "./components/AppBar";
import { Credits } from "./Components/Credits";
import { DataRegion } from "./Components/DataRegion";
import { csvToJson } from "./csvToJson";
import { jsonToCsv } from "./jsonToCsv";

function App() {
  const [csvData, csvSetData] = useState("");
  const [jsonData, jsonSetData] = useState("");

  const handleCsvInputChange = (event) => {
    csvSetData(event.target.value || "");
  };

  const handleJsonInputChange = (event) => {
    jsonSetData(event.target.value || "");
  };

  return (
    <>
      <AppBar />
      <div className="flex justify-normal">
        <DataRegion>
          <div className="flex justify-between bg-black text-white text-center p-2 rounded-lg">
            <div>CSV</div>
            <div>
              <button
                className="bg-white text-black border-2 pl-2 pr-2 rounded-full font-light text-center text-s border-pink-500"
                onClick={() => navigator.clipboard.writeText(csvData)}
              >
                Copy
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 resize-none p-2 border-2 rounded-lg mt-2 w-full bg-blue-200 overflow-auto whitespace-nowrap"
            value={csvData}
            onChange={handleCsvInputChange}
            placeholder="Enter your CSV text here..."
          />
          <button className="bg-red-300 text-black border-2 rounded-xl font-semibold text-center text-l m-2 border-black-500"
            onClick={() => {
              if (csvData && csvData.trim() !== "") {
                try {
                  const jsonResult = csvToJson(csvData);
                  jsonSetData(JSON.stringify(jsonResult, null, 2));
                } catch (error) {
                  console.error("Error converting CSV to JSON:", error);
                }
              } else {
                jsonSetData("");
              }
            }}
          >
            Convert
          </button>
        </DataRegion>
        <DataRegion>
          <div className="flex justify-between bg-black text-white text-center p-2 rounded-lg">
            <div>JSON</div>
            <div>
              <button
                className="bg-white text-black border-2 pl-2 pr-2 rounded-full font-light text-center text-s border-pink-500"
                onClick={() => navigator.clipboard.writeText(jsonData)}
              >
                Copy
              </button>
            </div>
          </div>
          <textarea
            className="flex-1 scroll-auto p-2 border-2 rounded-lg mt-2 w-full bg-green-300 overflow-auto whitespace-nowrap"
            value={jsonData}
            onChange={handleJsonInputChange}
            placeholder="Enter your JSON text here..."
          />
          <button className="bg-red-300 text-black border-2 rounded-xl font-semibold text-center text-l m-2 border-black-500"
            onClick={() => {
              {
                if (jsonData && jsonData.trim() !== "") {
                  try {
                    const jsonArray = "[" + jsonData.replace(/}{/g, "},{") + "]";
                    const csvResult = jsonToCsv(JSON.parse(jsonArray));
                    csvSetData(csvResult);
                  } catch (error) {
                    console.error("Error converting JSON to CSV:", error);
                  }
                } else {
                  csvSetData("");
                }
              }
            }}
          >
            Convert
          </button>
        </DataRegion>
      </div>
      <Credits />
    </>
  );
}

export default App;
