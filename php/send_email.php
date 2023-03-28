<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


require '../components/PHPMailer/src/PHPMailer.php';
require '../components/PHPMailer/src/Exception.php';
require '../components/PHPMailer/src/SMTP.php';
function send_email($to, $subject, $message, $e) {
    $mail = new PHPMailer(true);
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.freemail.hu';
        $mail->SMTPAuth = true;
        $mail->Username = 'Marianna.katalin@freemail.hu';
        $mail->Password = 'Asderfucker2@';
        $mail->SMTPSecure = 'STARTTLS';
        $mail->Port = 587;
    
        $mail->setFrom('Marianna.katalin@freemail.hu');
        $mail->addAddress($to);
        $mail->isHTML(true);
    
        $mail->Subject = $subject;
        $mail->Body    = $message;
    
        $mail->send();
        return true;
    } catch (Exception $e) {
        $error_message = 'Email could not be sent. Error message: ' . $mail->ErrorInfo;
        error_log($error_message);
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = $_POST['email'];
    $subject = 'Sikeres rendelés';
    $message = 'Köszönjük a rendelését! A rendelés részletei...';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.freemail.hu'; // vagy 'mail.gmail.hu'
        $mail->SMTPAuth = true;
        $mail->Username = 'Marianna.katalin@freemail.hu';
        $mail->Password = 'Asderfucker2@';
        $mail->SMTPSecure = 'STARTTLS';
        $mail->Port = 587;

        $mail->setFrom('pisti1231212@gmail.com');
        $mail->addAddress($to);
        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo 'Email sent successfully';
    } catch (Exception $e) {
        echo 'Email could not be sent. Error message: ', $mail->ErrorInfo;
    }
}

