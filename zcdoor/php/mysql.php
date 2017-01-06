<?php
$host = 'localhost';

$username = 'root';

$password = '';

$database = 'user';

$table='userlogin';

$conn = new mysqli($host, $username, $password,$database);//连接到数据库

if ($conn->connect_error) {
  die("could not connect to the database.\n" .$conn->connect_error);//诊断连接错误
}

$conn->query("set names 'utf8'");//编码转化
?>