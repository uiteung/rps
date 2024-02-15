// Import the required library
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { PutPokokBahasan } from "./controller/template.js";
import { token } from "./controller/cookies.js";

// Wait for the DOM to be ready
CihuyDomReady(() => {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const kodeMK = formData.get('kode_mk');
        const kelas = formData.get('kelas');
        const pertemuan_ke = formData.get('pertemuan_ke');
        const pokok_bahasan = formData.get('pokok_bahasan');

        const requestOptions = {
            method: 'PUT',
            headers: {
                'LOGIN': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                kode_mk: kodeMK,
                kelas: kelas,
                pertemuan_ke: pertemuan_ke,
                pokok_bahasan: pokok_bahasan
            })
        };

        fetch(PutPokokBahasan + kodeMK, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('PUT request succeeded with JSON response:', data);
        })
        .catch((error) => {
            console.error('Error while sending PUT request:', error);
        });
    });
});
