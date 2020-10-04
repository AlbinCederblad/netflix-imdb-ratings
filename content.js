if (window.sessionStorage !== "undefined") {
  const target = document.body;

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callbackFn = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log(
          "The " + mutation.attributeName + " attribute was modified."
        );
      }
    }
  };

  // Watch for changes being made to the DOM tree
  // MutationObserver will invoke specified callback function when DOM changes occur
  const observer = new MutationObserver(callbackFn);

  observer.observe(target, config);
}
