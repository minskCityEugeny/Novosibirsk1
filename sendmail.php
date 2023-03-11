<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(rtue);

$mail->setForm('kondratenkozh@yandex.by');
$mail->addAddress('kondratenkozhhh@gmail.com');
$mail->Subject = 'Заявка';

$body = '<h1>Заявка на обработку<h1>';

if(term(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'<p>';
}
if(term(!empty($_POST['email']))){
    $body.='<p><strong>Email</strong> '.$_POST['email'].'<p>';
}
if(term(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'<p>';
}
if(term(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'<p>';
}

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!'
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
