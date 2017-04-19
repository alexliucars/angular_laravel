<?php
session_start();
if(isset($_SESSION['password'])&& isset($_SESSION['username']))
{
    $Postdata=file_get_contents("php://input");
    $Pdata=json_decode($Postdata);
    $connect = mysqli_connect("localhost", "root", "root", "StudentSystem");
    // $sql="SELECT ST.pinfo,SC.subject,SC.score FROM Student ST INNER JOIN Score SC where ST.sname = '".$Pdata->sname."' and ST.Sid = SC.Sid and class='".$Pdata->cname."'";
    // $result=$connect->query($sql);
    // $data=array();
    $sql="SELECT st.pinfo,su.Suname,sco.score FROM Score sco INNER JOIN Student st ON sco.Sid=st.Sid INNER JOIN Subject su ON sco.Suid=su.Suid INNER JOIN SC ON SC.Sid=st.Sid INNER JOIN Class cl ON cl.Cid=SC.Cid where st.sname='".$Pdata->sname."' and cl.Cname='".$Pdata->cname."' ";
    $result=$connect->query($sql);
    $data=array();
    if($result->num_rows > 0){;
        while($row = mysqli_fetch_assoc($result)){
            array_push($data,$row);
        }
        echo json_encode($data);
    }
    else{
        echo "no_such_records";
    }



    $connect->close();
}
else
{
    echo "not";
}








?>