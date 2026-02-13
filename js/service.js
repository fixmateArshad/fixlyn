let selectedIssue = '';

function selectIssue(issue) {
  selectedIssue = issue;
  alert("Selected: " + issue);
}

function detectLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById('area').value = 'Bangalore';
    document.getElementById('pincode').value = '';
  });
}

function sendWhatsApp() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const area = document.getElementById('area').value;
  const pincode = document.getElementById('pincode').value;
  const address = document.getElementById('address').value;

  const msg = `Fixlyn Service Booking%0A
Name: ${name}%0A
Phone: ${phone}%0A
Issue: ${selectedIssue}%0A
Area: ${area}%0A
Pincode: ${pincode}%0A
Address: ${address}`;

  window.open(`https://wa.me/919036324311?text=${msg}`, '_blank');
}
