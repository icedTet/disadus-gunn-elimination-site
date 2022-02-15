import APIWrapper from "@Disadus/disadus-plugin-api";
let APIClient: APIWrapper | null = null;
if (globalThis?.window?.top) {
  APIClient = APIWrapper.getInstance();
  window.top?.postMessage(
    JSON.stringify({
      event: "connect",
    }),
    "*",
    []
  );
  console.log("[APIClient]", "APIClient loaded", APIClient, window.top);
}

export default APIClient;
