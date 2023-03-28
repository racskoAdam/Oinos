<?php
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
        $mail->Host = 'smtp.freemail.hu'; // vagy 'mail.gmail.hu'
        $mail->SMTPAuth = true;
        $mail->Username = 'oinosetterem2023@freemail.hu';
        $mail->Password = 'Futy132aSfhWeGG';
        $mail->SMTPSecure = 'STARTTLS';
        $mail->Port = 587;

        $mail->setFrom('oinosetterem2023@freemail.hu');
        $mail->addAddress($to);
        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = $_POST['email'];
    $subject = 'Sikeres rendelés';
    $message = 'Köszönjük a rendelését! A rendelés részletei...';

    if (send_email($to, $subject, $message)) {
        echo 'Email sent successfully';
    } else {
        echo 'Email could not be sent';
    }
}
?>
