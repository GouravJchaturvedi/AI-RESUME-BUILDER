import React from "react";
import Typewriter from "typewriter-effect";

function TypewriterText() {
  return (
    <div className="mt-4 flex justify-center text-gray-500 text-xl">
      <Typewriter
        options={{
          strings: [
            "Effortlessly Craft a Standout Resume with Our AI-Powered Builder",
          ],
          autoStart: true,
          loop: true,
          delay: 75,
        }}
      />
    </div>
  );
}

export default TypewriterText;
