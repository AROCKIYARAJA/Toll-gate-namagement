let date_func = new Date();
let date = date_func.getDate();
let month = date_func.getUTCMonth();
let year = date_func.getFullYear();
let hours = date_func.getHours();
let minutes = date_func.getMinutes();
let live_time = date_func.toLocaleTimeString();

let today = date_func.toLocaleDateString();


console.log(today + "(" + live_time + ")");