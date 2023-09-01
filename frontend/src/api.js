import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
});

// export default axios.create({
//   baseURL: 'localhost:8080',
// });
