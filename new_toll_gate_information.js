let add_toll_info = document.getElementById("add-toll-info");
let toll_gate_name = document.getElementById("toll-gate-name");

let vehicle_one = document.getElementById("vehicle-one");
let vehicle_two = document.getElementById("vehicle-two");
let vehicle_three = document.getElementById("vehicle-three");
let vehicle_four = document.getElementById("vehicle-four");

let v1_single_trip = document.getElementById("v1-SingleJourney");
let v2_single_trip = document.getElementById("v2-SingleJourney");
let v3_single_trip = document.getElementById("v3-SingleJourney");
let v4_single_trip = document.getElementById("v4-SingleJourney");

let v1_retun_trip = document.getElementById("v1-ReturnJourney");
let v2_retun_trip = document.getElementById("v2-ReturnJourney");
let v3_retun_trip = document.getElementById("v3-ReturnJourney");
let v4_retun_trip = document.getElementById("v4-ReturnJourney");

let toll_information = JSON.parse(localStorage.getItem("Toll_Information")) ? JSON.parse(localStorage.getItem("Toll_Information")) : [];

add_toll_info.addEventListener("click", (e) => {
  e.preventDefault();

  if ( toll_information.some((target) => target.Toll_name == toll_gate_name.value) ) {
    alert(`This Toll Gate Name already exists`);
  } else {

    toll_information.unshift({
      Toll_name: toll_gate_name.value,
      Car_Jeep_Van: [ v1_single_trip.value, v1_retun_trip.value,],
      LCV: [v2_single_trip.value, v2_retun_trip.value, ],
      Truck_Bus: [v3_single_trip.value, v3_retun_trip.value,],
      Heavy_Vehicle: [v4_single_trip.value, v4_retun_trip.value,],
    });
    localStorage.setItem("Toll_Information", JSON.stringify(toll_information));
    Update_option();
    Update_option_two();
    alert("Toll Gate Added Successfully");
    location.reload();
  }
});

let toll_gate_entry = document.getElementById("Toll-gate-entry");
function Update_option_two() {
  for (i = 0; i < toll_information.length; i++) {
    let toll_gate_option_two = document.createElement("option");
    toll_gate_option_two.setAttribute(
      `value`,
      `${toll_information[i].Toll_name}`
    );
    toll_gate_option_two.innerHTML = `${toll_information[i].Toll_name}`;
    toll_gate_entry.appendChild(toll_gate_option_two);
  }
}
Update_option_two();

let Entry_submit = document.getElementById("Entry-submit");
let Toll_gate_vehicle = document.getElementById("Toll-gate-vehicle");
let vehicle_tariff = document.getElementById("vehicle-tariff");

toll_gate_entry.addEventListener("change", (e) => {
  e.preventDefault();
  let selected_option = toll_information.find(
    (target) => target.Toll_name == toll_gate_entry.value
  );

  Toll_gate_vehicle.addEventListener("change", (e) => {
    if (Toll_gate_vehicle.value == "Car/Jeep/Van") {
      vehicle_tariff.value = `${selected_option.Car_Jeep_Van[0]}`;
    } else if (Toll_gate_vehicle.value == "LCV") {
      vehicle_tariff.value = `${selected_option.LCV[0]}`;
    } else if (Toll_gate_vehicle.value == "Truck/Bus") {
      vehicle_tariff.value = `${selected_option.Truck_Bus[0]}`;
    } else if (Toll_gate_vehicle.value == "Heavy Vehicle") {
      vehicle_tariff.value = `${selected_option.Heavy_Vehicle[0]}`;
    } else {
      alert("Select vehicle type");
      vehicle_tariff.value = ``;
    }
  });
});

// ----------------------- [ T I M E   I N P U T   C O D E ] -----------------------

let date_func = new Date();
let hours = date_func.getHours();
let minutes = date_func.getMinutes();
let live_time = date_func.toLocaleTimeString();
let today = date_func.toLocaleDateString();


// ----------------------- [ V E C H I L E   E N T R Y   C O D E ] -----------------------

let toll_vehicles_entry = JSON.parse( localStorage.getItem("Toll Vehicles Entry")) ? JSON.parse(localStorage.getItem("Toll Vehicles Entry")): [];
let vehicle_number = document.getElementById("Vehicle-number");

Entry_submit.addEventListener("click", (e) => {
  e.preventDefault();

  if ( toll_vehicles_entry.some( (target) => target.vehicle_number == vehicle_number.value.toUpperCase() ) ) {

    let repeated_vehicle_info =  toll_vehicles_entry.find(target => target.vehicle_number == vehicle_number.value.toUpperCase());
    let repeated_vehicle_info_index = toll_vehicles_entry.findIndex(target => target.vehicle_number == vehicle_number.value.toUpperCase());
    if( hours +":"+minutes <= repeated_vehicle_info.time_limits){
      let tariff_update_value = toll_vehicles_entry[repeated_vehicle_info_index];
      let tariff_updating = {...tariff_update_value, tariff : Number(tariff_update_value.tariff/2) + Number(tariff_update_value.tariff), status: "Retuned", }
      toll_vehicles_entry.splice(repeated_vehicle_info_index,1,tariff_updating)
      localStorage.setItem("Toll Vehicles Entry", JSON.stringify(toll_vehicles_entry))
      location.reload();
    }
    else{
      let tariff_update_value = toll_vehicles_entry[repeated_vehicle_info_index];
      let tariff_updating = {...tariff_update_value, tariff :  tariff_update_value.tariff * 2, status: "Late Returns" }
      toll_vehicles_entry.splice(repeated_vehicle_info_index,1,tariff_updating)
      localStorage.setItem("Toll Vehicles Entry", JSON.stringify(toll_vehicles_entry))
      location.reload();
    }

  } else {
    let new_vehicle = {
      vehicle_type: Toll_gate_vehicle.value,
      vehicle_number: vehicle_number.value.toUpperCase(),
      vehicle_entry_time: today + "(" + live_time + ")",
      Toll_gate_name: toll_gate_entry.value,
      tariff: vehicle_tariff.value,
      entry_time: hours +":"+minutes,
      time_limits: hours+1 +":"+minutes,
      status : "New Entry",
    };
    toll_vehicles_entry.push(new_vehicle);
    localStorage.setItem( "Toll Vehicles Entry", JSON.stringify(toll_vehicles_entry) );
    Toll_vehicle_list_UI();
    location.reload();
  }
});
let vehicle_list_table = document.getElementById("vehicle-list-table");

  function Toll_vehicle_list_UI(){
    for (i = 0; i < toll_vehicles_entry.length; i++) {
      let vehicle_datum = document.createElement("div");
      vehicle_datum.classList.add("vehicle_datum_row");
      vehicle_datum.innerHTML = ` <p>${i+1})</p>  
      <p>${toll_vehicles_entry[i].vehicle_type}</p>  
      <p>${toll_vehicles_entry[i].vehicle_number}</p>
      <p>${toll_vehicles_entry[i].vehicle_entry_time}</p>
      <p>${toll_vehicles_entry[i].Toll_gate_name}</p>
      <p>${toll_vehicles_entry[i].tariff}</p>
      <p>${toll_vehicles_entry[i].status}</p>
      `;
  
      vehicle_list_table.append(vehicle_datum);
    }
  }
  Toll_vehicle_list_UI();

  // ------------------- [ V E H I C L E    T O L L   G A T E   S E A R C H   E N G I N E ] ----------------------- \\

  let search_engine = document.getElementById("search-vehicle");
  search_engine.addEventListener("input", (e)=> {
    let search_key = search_engine.value.toUpperCase();
    for(i=0;i< toll_vehicles_entry.length;i++){
      if(toll_vehicles_entry[i].vehicle_number.includes(search_key) || toll_vehicles_entry[i].Toll_gate_name.toUpperCase().includes(search_key)){
        document.getElementsByClassName("vehicle_datum_row")[i].style.display="flex";
      }
      else{
        document.getElementsByClassName("vehicle_datum_row")[i].style.display="none";
        }
    }
  })

  // ------------------- [ V E H I C L E    E N T R Y    D A T A    T R A S H    C O D E ] ----------------------- \\

  // localStorage.removeItem('Toll Vehicles Entry');
