// Import the required library
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { GetRpsByKodeMK } from "./controller/template.js";
import { token } from "./controller/cookies.js";

// Wait for the DOM to be ready
CihuyDomReady(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const kodeMK = queryParams.get('mk');

    const tablebody = document.getElementById("body-matkul");
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'LOGIN': token,
            'Content-Type': 'application/json'
        }
    };

    // Fetch data from API
    fetch(GetRpsByKodeMK + kodeMK, requestOptions)
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        if (data && Array.isArray(data.data)) {
            let tableData = "";
            data.data.forEach((item, index) => {
                if (item.PokokBahasan && item.Pertemuan_ke) {
                    tableData += `
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">Pertemuan ${item.Pertemuan_ke}</h5>
                            <p class="card-text">${item.PokokBahasan}</p>
                            <a href="./update_rps.html?pertemuan=${item.Pertemuan_ke}" class="btn btn-primary" id="proyek${item.Pertemuan_ke}Btn">Update RPS</a>
                            </div>
                        </div>
                    </div>
                    `;
                }
            });
            tablebody.innerHTML = tableData;
        } else {
            console.error("Data or data.data is undefined or not an array.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});
