const params = new URLSearchParams(window.location.search);
const service = params.get("type");

document.getElementById("serviceTitle").innerText = service + " Repair";

const problems = {
  "Laptop":["No Power","No Display","Slow","Battery Issue","Keyboard Issue","Others"],
  "Washing Machine":["Not Starting","Water Leakage","Drum Issue","Noise","Others"],
  "Refrigerator":["Not Cooling","Water Leakage","Noise","Power Issue","Others"],
  "Geyser":["No Heating","Water Leakage","Power Issue","Others"],
  "Microwave":["Not Heating","Button Issue","Spark Issue","Others"]
};

const problemSelect = document.getElementById("problem");
problems[service].forEach(p=>{
  const o=document.createElement("option");
  o.text=p;
  problemSelect.add(o);
});

const tomorrow=new Date();
tomorrow.setDate(tomorrow.getDate()+1);
date.value=tomorrow.toISOString().split("T")[0];

let mapLink="";

function detectLocation(){
  navigator.geolocation.getCurrentPosition(async pos=>{
    mapLink=`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
    const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    const d=await r.json();
    area.value=d.address.suburb||"";
    pincode.value=d.address.postcode||"";
  });
}

function book(){
  const msg=`Fixlyn Service Booking
Service: ${service}
Problem: ${problem.value}
Name: ${name.value}
Phone: ${phone.value}
Date: ${date.value}
Time: ${time.value}
Address: ${building.value}, ${flat.value}, ${address.value}
${area.value} - ${pincode.value}
Map: ${mapLink}`;

  window.open(`https://wa.me/919036324311?text=${encodeURIComponent(msg)}`);
}
