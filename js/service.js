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

function sendWhatsApp() {
  const service = document.getElementById("serviceTitle")?.innerText || "Fixlyn Service";
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const problem = document.getElementById("problem").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const area = document.getElementById("area").value;
  const address = document.getElementById("address").value;

  if (!name || !mobile || !problem || !date || !time) {
    alert("Please fill all required fields");
    return;
  }

  const message =
`*New Service Booking - Fixlyn*

Service: ${service}
Problem: ${problem}

Name: ${name}
Mobile: ${mobile}

Date: ${date}
Time: ${time}

Area: ${area}
Address: ${address}`;

  const phone = "919036324311"; // YOUR NUMBER
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}
