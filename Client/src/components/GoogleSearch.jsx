import React, { useEffect } from "react";

const GoogleSearch = () => {
  useEffect(() => {
    const loadGoogleCSE = () => {
      if (window.google && window.google.search && window.google.search.cse) {
        window.google.search.cse.element.render({
          div: "gcse-search",
          tag: "search",
        });

        // Add event listener for link clicks
        document
          .querySelector("#gcse-search")
          .addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
              console.log(event.target.tagName);
              event.preventDefault();
              // Open the link in the modal or within the application
              const url = event.target.href;
              // Add your custom logic here to open the URL in a modal
              console.log(`Intercepted link click: ${url}`);
            }
          });
      }
    };

    if (document.readyState === "complete") {
      loadGoogleCSE();
    } else {
      window.addEventListener("load", loadGoogleCSE);
    }

    return () => {
      window.removeEventListener("load", loadGoogleCSE);
    };
  }, []);

  return <div id="gcse-search"></div>;
};

export default GoogleSearch;
