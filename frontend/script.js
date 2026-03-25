const BASE_URL = "http://localhost:3000/api"; // change if needed

// Send Email
async function sendEmail() {
  const email = document.getElementById("emailInput").value;

  if (!email) {
    alert("Enter email");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    alert(data.message);

    loadJobs(); // refresh after sending
  } catch (err) {
    console.error(err);
  }
}

// Load Jobs
async function loadJobs() {
  try {
    const res = await fetch(`${BASE_URL}/jobs`);
    const jobs = await res.json();

    const table = document.getElementById("jobTable");
    table.innerHTML = "";

    jobs.forEach(job => {
      const row = `
        <tr>
          <td>${job.id}</td>
          <td>${job.email}</td>
          <td>${job.status}</td>
        </tr>
      `;
      table.innerHTML += row;
    });
  } catch (err) {
    console.error(err);
  }
}

// auto load on start
loadJobs();