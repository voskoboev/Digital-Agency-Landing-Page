<?php

$to = 'voskoboev.dmitry@gmail.com';
$from = "From: Request from site";
$subject = 'Request';
$page = 'Main page: footer form';

$email = $_POST['email'];

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
</table>
</center>	
</body>
</html>';

$headers = "Content-type: text/html; charset=utf-8\r\n";
$headers .= $form;

mail($to, $subject, $message, $headers);