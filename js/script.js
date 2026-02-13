const service = localStorage.getItem("selectedService");
document.getElementById("serviceTitle").innerText = service;

const problems = {
  "Laptop Repair": [
    "No Power",
    "No Display",
    "Slow / Hanging",
    "Battery Issue",
    "Keyboard Issue"
  ],
  "Washing Machine Repair": [
    "Not Spinning",
    "Water Leakage",
    "Not Starting",
    "Noise Issue"
  ],
  "Refrigerator Repair": [
    "Not Cooling",
    "Water Leakage",
    "Noise Issue",
    "Power Issue"
  ],
  "Geyser Repair": [
    "No Heating",
    "Water Leakage",
    "Power Issue"
  ],
  "Microwave Repair": [
    "Not Heating",
    "Button Issue",
    "Spark Issue"
  ]
};

const problemSelect = document.getElementById("problem");
problems[service].forEach(p=>{
  const o=document.createElement("option");
  o.text=p;
  problemSelect.add(o);
});

// Date
const d=new Date();
d.setDate(d.getDate()+1);
date.value=d.toISOString().split("T")[0];

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

function showReview(){
  reviewText.innerText=`
Service: ${service}
Problem: ${problem.value}

Name: ${name.value}
Phone: ${phone.value}
Date: ${date.value}
Time: ${time.value}

Address:
${building.value}, ${flat.value}, ${block.value}
${address.value}
${area.value} - ${pincode.value}
  `;
  reviewBox.style.display="block";
}

function sendWhatsApp(){
  window.open(`https://wa.me/919036324311?text=${encodeURIComponent(reviewText.innerText + "\nMap:\n" + mapLink)}`);
}
