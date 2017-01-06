<?php
require('mysql.php');
$type=isset($_REQUEST['type'])?$_REQUEST['type']:"" ;	
$value=isset($_REQUEST['value'])?$_REQUEST['value']:"";
$sql="select * from $table where $type = '$value'";
$result =$conn->query($sql);//验证用户

if($num=$result->num_rows){
	$exist=1;	
}else{
	$exist=0;
}
echo $exist;


?>