<?php
session_start();
if(isset($_SESSION['password'])&& isset($_SESSION['username']))
{
    $connect = mysqli_connect("localhost", "root", "root", "StudentSystem");
    $sql="SELECT DISTINCT Suname FROM Subject";
    $result=$connect->query($sql);
    $connect->close();

    $data=array();
    while ($row = mysqli_fetch_array($result)) {
        array_push($data,$row[0]);
    } 
    echo json_encode($data);
}
else
{
    echo "not";
}
?>