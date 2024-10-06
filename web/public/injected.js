console.log("injected.js loaded");
window.parent.postMessage({ injectedLoaded: true }, "*");

window.addEventListener("message", (event) => {
  console.log("injected.js message", event);
  const data = event.data;
  if (typeof data === "object" && data !== null && data.callId && data.code) {
    try {
      const result = eval(data.code);
      Promise.resolve(result).then(
        (resolvedResult) => {
          event.source?.postMessage(
            { callId: data.callId, result: resolvedResult },
            { targetOrigin: "*" },
          );
        },
        (error) => {
          event.source?.postMessage(
            { callId: data.callId, error: error.message },
            { targetOrigin: "*" },
          );
        },
      );
    } catch (error) {
      event.source?.postMessage(
        { callId: data.callId, error: error.message },
        { targetOrigin: "*" },
      );
    }
  }
});
