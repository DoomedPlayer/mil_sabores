document.addEventListener("DOMContentLoaded", () => {
  const formPago = document.getElementById("formPago");

  formPago.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const tarjeta = document.getElementById("tarjeta").value.trim();
    const exp = document.getElementById("exp").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!nombre || !direccion || !tarjeta || !exp || !cvv) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    if (tarjeta.length !== 16 || isNaN(tarjeta)) {
      alert("⚠️ El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("⚠️ El CVV debe tener 3 dígitos numéricos.");
      return;
    }

    alert("✅ Pago realizado con éxito. ¡Gracias por tu compra! 🎂");

    window.location.href = "procesamiento.html";
  });
});
