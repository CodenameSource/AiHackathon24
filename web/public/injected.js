console.log("injected.js loaded");
window.addEventListener("message", (event) => {
  const data = event.data;
  if (typeof data === "string") {
    const result = eval(data);
    event.source?.postMessage(result, {
      targetOrigin: "*",
    });
  }
});
