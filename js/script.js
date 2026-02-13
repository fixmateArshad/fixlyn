
// SET SERVICE NAME
const service = localStorage.getItem("selectedService") || "Service Booking";
document.getElementById("serviceTitle").innerText = service;

// SET DEFAULT DATE = TOMORROW
const dateInput = document.getElementById("date");
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.value = tomorrow.toISOString().split("T")[0];

let mapLink = "";

// LOCATION DETECTION
function detectLocation(){
  if(!navigator.geolocation){
    alert("Location not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    mapLink = `https://maps.google.com/?q=${lat},${lon}`;

    try{
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();

      document.getElementById("area").value =
        data.address.suburb ||
        data.address.neighbourhood ||
        data.address.city ||
        "";

      document.getElementById("pincode").value =
        data.address.postcode || "";

      alert("Location detected successfully");
    }catch{
      alert("Unable to fetch address");
    }
  },
  ()=>{
    alert("Location permission denied");
  });
}

// SHOW REVIEW
function showReview(){
  const review = `
Service: ${service}
Problem: ${problem.value}

Name: ${name.value}
Mobile: ${phone.value}

Date: ${date.value}
Time: ${time.value}

Address:
${building.value}
Flat/Room: ${flat.value}
Block/Tower: ${block.value}
${address.value}
${area.value} - ${pincode.value}
  `;

  document.getElementById("reviewText").innerText = review;
  document.getElementById("reviewBox").style.display = "block";
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// SEND TO WHATSAPP
function sendWhatsApp(){
  const msg = `
Fixlyn – New Booking

Service: ${service}
Problem: ${problem.value}

Name: ${name.value}
Mobile: ${phone.value}

Date: ${date.value}
Time: ${time.value}

Address:
${building.value}
Flat/Room: ${flat.value}
Block/Tower: ${block.value}
${address.value}
${area.value} - ${pincode.value}

Location Map:
${mapLink}
  `;

  window.open(
    `https://wa.me/919036324311?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
