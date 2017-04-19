<?php

    $Postdata=file_get_contents("php://input");
    $Pdata=json_decode($Postdata);
    $connect = mysqli_connect("localhost", "root", "root", "StudentSystem");
    $sql="INSERT INTO User (username,password) VALUES('".$Pdata->username."','".$Pdata->password."')";
    $connect->query($sql);


    $connect->close();
    echo "insert successfull!";








?>