<?php

// Check if 'data' parameter is present in GET or POST request, or read input stream
$args = isset($_GET['data']) ? $_GET['data'] :
        (isset($_POST['data']) ? $_POST['data'] :
        file_get_contents("php://input", true));

// Decode JSON data from $args variable into a PHP array
$args = json_decode($args, true, 512, 0);

// Import PHPMailer library
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../components/PHPMailer/src/PHPMailer.php';
require '../components/PHPMailer/src/Exception.php';
require '../components/PHPMailer/src/SMTP.php';

// Define function to send email
function send_email($to, $subject, $message) {
    $mail = new PHPMailer(true);

    try {
        // Configure SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.freemail.hu'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'oinosetterem2023@freemail.hu';
        $mail->Password = 'Futy132aSfhWeGG';
        $mail->SMTPSecure = 'STARTTLS';
        $mail->Port = 587;

        // Set 'from' and 'to' addresses, and email body
        $mail->setFrom('oinosetterem2023@freemail.hu');
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->CharSet = 'UTF-8';
        $mail->Body = $message;

        // Send email and return true if successful
        $mail->send();
        return true;
    } catch (Exception $e) {
        // Return false if email sending fails
        return false;
    }
}

// Call send_email() function with email recipient, subject, and message extracted from $args array
if (send_email($args['email'], $args['subject'], $args['message'])) {
    // Output success message if email sent successfully
    echo 'Email sent successfully';
} else {
    // Output error message if email sending fails
    echo 'Email could not be sent';
}

// Set Content-Type header to specify JSON encoding of response
header('Content-Type: application/json; charset=utf-8');
?>
