// Import the required library
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { GetAllMatkul } from "./controller/template.js";
import { token } from "./controller/cookies.js";

// Wait for the DOM to be ready
CihuyDomReady(() => {
    const tablebody = document.getElementById("body-matkul");

    const requestOptions = {
        method: 'GET',
        headers: {
            'LOGIN': token,
            'Content-Type': 'application/json'
        }
    };

    // Fetch data from API
    fetch(GetAllMatkul, requestOptions)
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        if (data && Array.isArray(data.data)) {
            let tableData = "";
            let uniqueEntries = new Set();
            data.data.forEach((item, index) => {
                const key = item.Nama_Mk_Ind + item.Kode_Mk;
                if (!uniqueEntries.has(key)) {
                    tableData += `
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${item.Nama_Mk_Ind}</h5>
                                    <a href="pertemuan.html?mk=${item.Kode_Mk}" class="btn btn-primary" id="proyek${index + 1}Btn">Lihat Pertemuan</a>
                                </div>
                            </div>
                        </div>
                    `;
                    uniqueEntries.add(key); // Add the key to the set
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