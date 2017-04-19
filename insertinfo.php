<?php
session_start();
if(isset($_SESSION['password'])&& isset($_SESSION['username']))
{
    $Postdata=file_get_contents("php://input");
    $Pdata=json_decode($Postdata);
    $connect = mysqli_connect("localhost", "root", "root", "StudentSystem");
    $sql="INSERT INTO Student(sname,pinfo,delete_status) VALUES('".$Pdata->sname."','".$Pdata->pinfo."','0')";
    $connect->query($sql);
    $last_id = $connect->insert_id;

    $sql="SELECT Cid FROM Class WHERE Cname='".$Pdata->class."'";//find class id
    $classid=mysqli_fetch_array($connect->query($sql));
    $sql="INSERT INTO SC(Sid,Cid) VALUES('".$last_id."','".$classid[0]."')";//insert into SC table
    $connect->query($sql);

    $sql="SELECT Suid From Subject WHERE Suname='".$Pdata->subject."'";
    $subjectid=mysqli_fetch_array($connect->query($sql));
    echo $subjectid[0];
    $sql="INSERT INTO Score (Sid,Suid,score) VALUES('".$last_id."','".$subjectid[0]."','".$Pdata->score."')";
    $connect->query($sql);

    $sql="SELECT Suid From Subject WHERE Suname='".$Pdata->subject1."'";
    $subjectid=mysqli_fetch_array($connect->query($sql));
    $sql="INSERT INTO Score (Sid,Suid,score) VALUES('".$last_id."','".$subjectid[0]."','".$Pdata->score1."')";
    $connect->query($sql);

    $sql="SELECT Suid From Subject WHERE Suname='".$Pdata->subject2."'";
    $subjectid=mysqli_fetch_array($connect->query($sql));
    $sql="INSERT INTO Score (Sid,Suid,score) VALUES('".$last_id."','".$subjectid[0]."','".$Pdata->score2."')";
    $connect->query($sql);

    $sql="SELECT Suid From Subject WHERE Suname='".$Pdata->subject3."'";
    $subjectid=mysqli_fetch_array($connect->query($sql));
    $sql="INSERT INTO Score (Sid,Suid,score) VALUES('".$last_id."','".$subjectid[0]."','".$Pdata->score3."')";
    $connect->query($sql);

    $connect->close();
    echo "insert successfull!";
}
else
{
    echo "not";
}







?>