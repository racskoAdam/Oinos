<?php

$args = isset($_GET['data']) ? $_GET['data'] :
        (isset($_POST['data']) ? $_POST['data'] :
        file_get_contents("php://input", true));
$args = json_decode($args, true, 512, 0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../components/PHPMailer/src/PHPMailer.php';
require '../components/PHPMailer/src/Exception.php';
require '../components/PHPMailer/src/SMTP.php';

function send_email($to, $subject, $message) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.freemail.hu'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'oinosetterem2023@freemail.hu';
        $mail->Password = 'Futy132aSfhWeGG';
        $mail->SMTPSecure = 'STARTTLS';
        $mail->Port = 587;

        $mail->setFrom('oinosetterem2023@freemail.hu');
        $mail->addAddress($to);
        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->CharSet = 'UTF-8';
        $mail->Body = $message;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

if (send_email($args['email'], $args['subject'], $args['message'])) {
    echo 'Email sent successfully';
} else {
    echo 'Email could not be sent';
}

header('Content-Type: application/json; charset=utf-8');
?>
