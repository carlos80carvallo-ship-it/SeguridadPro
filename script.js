// 1. Conexión con Firebase (Usando tus llaves de SeguridadProGlobal)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-Q-F-Q-F-Q-F-Q-F-Q-F-Q-F-Q", // Reemplaza con tu API Key real si cambió
  authDomain: "seguridadproglobal.firebaseapp.com",
  projectId: "seguridadproglobal",
  storageBucket: "seguridadproglobal.appspot.com",
  messagingSenderId: "93163351234",
  appId: "1:93163351234:web:866290808770c87895f517"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Función para Guardar en la Nube
window.guardarInspeccion = async function() {
    const btn = document.querySelector('.btn-guardar');
    btn.disabled = true;
    btn.innerText = "⌛ GUARDANDO...";

    const datos = {
        agente: document.getElementById('agente-nombre').value,
        planta: {
            estado: document.getElementById('planta-estado').value,
            nivel: document.getElementById('planta-nivel').value
        },
        bombillos: {
            torreA: document.getElementById('b-ta').value,
            torreB: document.getElementById('b-tb').value,
            sotano: document.getElementById('b-est').value
        },
        observaciones: document.getElementById('obs-recorrido').value,
        fecha: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "inspecciones"), datos);
        alert("✅ ¡Reporte guardado en la nube con éxito!");
        btn.disabled = false;
        btn.innerText = "💾 GUARDAR EN LA NUBE";
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al guardar. Verifica tu conexión.");
        btn.disabled = false;
        btn.innerText = "💾 GUARDAR EN LA NUBE";
    }
};

// 3. Función para WhatsApp
window.compartirWS = function() {
    const agente = document.getElementById('agente-nombre').value;
    const planta = document.getElementById('planta-estado').value;
    const obs = document.getElementById('obs-recorrido').value;
    
    const mensaje = `*REPORTE DE INSPECCIÓN*%0A*Agente:* ${agente}%0A*Planta:* ${planta}%0A*Obs:* ${obs}`;
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
};
