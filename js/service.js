let mapsLink = "";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById("date").value =
  tomorrow.toISOString().split("T")[0];

function getLocation(){
  const btn = document.getElementById("locBtn");
  const loader = document.getElementById("loader");

  btn.disabled = true;
  loader.style.display = "block";

  navigator.geolocation.getCurrentPosition(async pos=>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    mapsLink = `https://maps.google.com/?q=${lat},${lon}`;

    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const d = await r.json();

    document.getElementById("area").value =
      d.address.suburb || d.address.area || "";
    document.getElementById("pincode").value =
      d.address.postcode || "";

    loader.style.display = "none";
    btn.disabled = false;
  },
  ()=>{
    loader.style.display = "none";
    btn.disabled = false;
    alert("Unable to detect location");
  });
}

function sendWhatsApp(){
  const msg = `Fixlyn Booking
Service: Laptop Repair

Name: ${custName.value}
Phone: ${custPhone.value}
Issue: ${issue.value}

Address:
${building.value}, ${flat.value}
${street.value}
${area.value} - ${pincode.value}

Date: ${date.value}
Time: ${time.value}

Map: ${mapsLink}`;

  window.open(
    `https://wa.me/919036324311?text=${encodeURIComponent(msg)}`
  );
}
