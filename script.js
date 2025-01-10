document.getElementById("updateFeeForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Collect form data
    const student_id = document.getElementById("student_id").value;
    const amount_paid = parseFloat(document.getElementById("amount_paid").value);

    // API endpoint (replace with your Azure Function URL)
    const apiUrl = "https://feeuser.azurewebsites.net/api/update_fee";

    const responseMessage = document.getElementById("responseMessage");

    try {
        // Make a PUT request to the Azure Function
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                student_id: student_id,
                amount_paid: amount_paid
            }),
        });

        // Parse the response
        const data = await response.json();

        if (response.ok) {
            // Display success message
            responseMessage.innerHTML = `<p style="color: green;">${data.message}</p>`;
        } else {
            // Display error message
            responseMessage.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        }
    } catch (error) {
        // Handle any other errors
        responseMessage.innerHTML = `<p style="color: red;">Error: Unable to connect to the server.</p>`;
        console.error(error);
    }
});

