export default defineEventHandler((event) => {
  if (event.method !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
  
  return {
    message: "Inquiry received",
  };
});
