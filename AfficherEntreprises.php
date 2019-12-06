<?php
 try{
include"./config/config.php";
$bdd = new PDO(DBDRIVER.':host='.DBHOST.';port='.DBPORT.
';dbname='.DBNAME.';charset='
.DBCHARSET,DBUSER,DBPASS); 
}
 catch(Exception $e)
{
 echo $e->getMessage();
 die();
}

//var_dump($_POST);
if($_POST["choix"] == "wad"){
    //$sql= "SELECT titre FROM seriebd";
}
else
{ 
    if($_POST["choix"] == "web"){
     // $sql= "SELECT createur FROM seriebd";
       
      }
     else {
      if($_POST["choix"] == "all"){
      $sql= "SELECT * FROM entreprise";
    }
 else {
          // $sql= "SELECT genre FROM seriebd";
      }
}
}
$statement = $bdd->prepare($sql);  

//var_dump($statement);
$statement-> execute();
// obtenir les données dans un tab associatif
$resultat = $statement->fetchAll(PDO::FETCH_ASSOC);
//var_dump($resultat);
echo json_encode ($resultat);
?>

