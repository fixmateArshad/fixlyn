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

let mapLink = "";

function detectLocation() {
  const loading = document.getElementById("locLoading");
  loading.style.display = "inline";

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    loading.style.display = "none";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        const area =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.city ||
          "";

        const pincode = data.address.postcode || "";

        document.getElementById("area").value =
          area + (pincode ? " - " + pincode : "");
      } catch (e) {
        console.log("Address fetch failed");
      }

      loading.style.display = "none";
    },
    () => {
      alert("Location permission denied");
      loading.style.display = "none";
    }
  );
}

function sendWhatsApp() {
  const service =
    document.getElementById("serviceTitle")?.innerText || "Fixlyn Service";
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
`*New Booking – Fixlyn*

Service: ${service}
Problem: ${problem}

Name: ${name}
Mobile: ${mobile}

Date: ${date}
Time: ${time}

Area: ${area}
Address: ${address}

📍 Location:
${mapLink || "Not shared"}`;

  const phone = "919036324311"; // YOUR NUMBER
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}
