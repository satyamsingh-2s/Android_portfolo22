// Example for the existing React contact form.
//
// Add VITE_API_URL to the frontend .env:
// VITE_API_URL=http://localhost:5000
//
// Then call:
//
// const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     name,
//     email,
//     message,
//     website: ""
//   })
// });
//
// const data = await response.json();
//
// if (!response.ok) {
//   throw new Error(data.message || "Unable to send message.");
// }
