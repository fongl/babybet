//IF UR LOOKING AT THIS UR A FUCKING FAGGOT

const sheetId = '1iO9zPL5eyJnnFUeriqBx7jvm4av8SG4vXMvsmEhhT1c';
const apiKey = 'AIzaSyCKcREmXO0H5ev0z2VWGQhAGMDIs8zWdrs';

async function fetchLiveStats() {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Payout!A:D?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log('Fetched Data:', data);

    const rows = data.values || [];
    console.log('Parsed Rows:', rows);

    const boyRatio = rows[1]?.[3]?.trim() || 'N/A';
    const girlRatio = rows[2]?.[3]?.trim() || 'N/A';
    const totalBoy = rows[1]?.[1]?.trim() || 'N/A';
    const totalGirl = rows[2]?.[1]?.trim() || 'N/A'; 

    document.getElementById('boyRatio').textContent = boyRatio;
    document.getElementById('girlRatio').textContent = girlRatio;
    document.getElementById('totalBoy').textContent = totalBoy;
    document.getElementById('totalGirl').textContent = totalGirl;
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('boyRatio').textContent = 'Error';
    document.getElementById('girlRatio').textContent = 'Error';
    document.getElementById('totalBoy').textContent = 'Error';
    document.getElementById('totalGirl').textContent = 'Error';
  }
}

// Fetch live stats once when the page loads
fetchLiveStats();


document.getElementById('betForm').addEventListener('submit', function(event) {
  event.preventDefault();

  
  const name = document.getElementById('name').value.trim();
  const choice = document.getElementById('choice').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Validation
  if (!name) {
    alert('Please enter your name.');
    return;
  }

  if (!choice) {
    alert('Please select your bet (Boy or Girl).');
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid bet amount greater than 0.');
    return;
  }

  //google form url
  const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeUa64XgAD85ETOnf9ns2vjpBdc9u-fT6xtUfxL37g0GbGpCA/formResponse';

  
  const formData = new FormData();
  formData.append('entry.996325399', name); // Name field ID
  formData.append('entry.1367840369', choice); // Choice field ID
  formData.append('entry.1132365330', amount); // Bet Amount field ID

  // Send POST request to Google Form
  fetch(formUrl, {
    method: 'POST',
    body: formData,
    mode: 'no-cors' 
  })
  .then(() => {
    alert('Bet placed successfully!');
    document.getElementById('betForm').reset(); 
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error placing bet. Please try again.');
  });
});