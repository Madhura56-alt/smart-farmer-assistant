import React from "react";

function LanguageSelector({ language, setLanguage }) {

  return (

    <div className="languageSelector">

      <label>
        🌐 Select Language
      </label>


      <select
        value={language}
        onChange={(e)=>setLanguage(e.target.value)}
      >

        <option value="en">
          🇬🇧 English
        </option>

        <option value="kn">
          🇮🇳 ಕನ್ನಡ
        </option>

        <option value="hi">
          🇮🇳 हिन्दी
        </option>

      </select>


    </div>

  );

}


export default LanguageSelector;