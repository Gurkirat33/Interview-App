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
              event.preventDefault();
              const url = event.target.href;
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
