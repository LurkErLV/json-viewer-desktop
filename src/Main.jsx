import React, { useState } from "react";
import ReactJson from "react-json-view";

export default function Main() {
  const [file, setFile] = useState();
  const [jsonString, setJsonString] = useState("{}");
  const [jsonObject, setJsonObject] = useState({});

  const changeJson = (value) => {
    setJsonString(value);

    try {
      const parsedJson = JSON.parse(value);
      setJsonObject(parsedJson);
    } catch (_) {
      setJsonObject({ error: "Invalid JSON object" });
    }
  };

  const handleFileRead = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const content = event.target.result;

      try {
        const jsonContent = JSON.parse(content);
        setJsonString(JSON.stringify(jsonContent, null, 2));
        setJsonObject(jsonContent);
      } catch (error) {
        setJsonString(JSON.stringify({ error: "Invalid JSON content" }));
        setJsonObject({ error: "Invalid JSON content" });
      }
    };

    if (file.type === 'application/json' || file.type === 'text/plain') {
      fileReader.readAsText(file);
    } else {
      setJsonString(JSON.stringify({ error: "Unsupported file type" }));
      setJsonObject({ error: "Unsupported file type" });
    }
  };

  const changeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      handleFileRead(file);
    }
  };

  return (
    <>
      <div className="flex items-center px-4 gap-[10px] bg-[#272822] h-8">
        <input
          className="w-full h-full"
          value={jsonString}
          onChange={(e) => changeJson(e.target.value)}
          type="text"
          placeholder="Enter JSON string"
        />

        <input accept=".txt,application/json" onChange={changeFile} type="file" id="file" className="hidden" />
        <label className="w-24 ml-2 bg-red-500 flex justify-center items-center rounded-lg text-white hover:opacity-80 transition" htmlFor="file">Select file</label>
      </div>

      <ReactJson name={null} theme="monokai" src={jsonObject} />
    </>
  );
}
