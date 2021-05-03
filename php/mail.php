<?php

$to = 'voskoboev.dmitry@gmail.com';
$from = "From: Request from site";
$subject = 'Request';
$page = 'Main page';
$name = $_POST['name'];
$company = $_POST['company'];
$email = $_POST['email'];
$service = $_POST['service'];
$textarea = $_POST['textarea'];

$message = '
<html>
<body>
<center>	
<table border=1 cellpadding=6 cellspacing=0 width=90% bordercolor="#DBDBDB">
 <tr><td colspan=2 align=center bgcolor="#E4E4E4"><b>Информация</b></td></tr>
 <tr>
  <td><b>Откуда</b></td>
  <td>' . $page . '</td>
 </tr>
 <tr>
  <td><b>Адресат</b></td>
  <td><a href="mailto:' . $email . '">' . $email . '</a></td>
 </tr>
 <tr>
  <td><b>Имя</b></td>
  <td>' . $name . '</td>
 </tr>
 <tr>
  <td><b>Компания</b></td>
  <td>' . $company . '</td>
 </tr>
 <tr>
  <td><b>Сервис</b></td>
  <td>' . $service . '</td>
 </tr>
 <tr>
  <td><b>Сообщение</b></td>
  <td>' . $textarea . '</td>
 </tr>
</table>
</center>	
</body>
</html>';

$headers = "Content-type: text/html; charset=utf-8\r\n";
$headers .= $from;

mail($to, $subject, $message, $headers);