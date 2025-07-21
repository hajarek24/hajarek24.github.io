<?php
// Show errors (debug mode)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form fields
    $name    = htmlspecialchars($_POST['name'] ?? '');
    $email   = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? 'Contact Form Submission');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Recipient email
    $to = "hajar.elkasiri3@gmail.com";

    // Email body
    $body = "You received a new message from your contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('✅ Message sent successfully!'); window.location.href = 'thankyou.html';</script>";
    } else {
        echo "<script>alert('❌ Failed to send message.'); window.history.back();</script>";
    }
} else {
    echo "Invalid request";
}
?>
