<?php

// Create connection

$conn = mysqli_connect("localhost", "root", "", "utiroda");
$sql = "SELECT * FROM utak WHERE orszag LIKE '%$_POST[name]%' OR kategoria LIKE '%$_POST[name]%' OR varos LIKE '%$_POST[name]%' OR allapot LIKE '%$_POST[name]%'";

$result = mysqli_query($conn, $sql);

echo "<div class='row d-flex justify-content-evenly p-5'>";
if(mysqli_num_rows($result)>0){
	while ($row=mysqli_fetch_assoc($result)) {
		echo "<div class='card col-md-3 card-search m-1'>";
		echo "<img class='card-img-top' src='./assets/img/".$row['kep']."' alt='Card image cap'>";
		echo "<div class='card-body'>";
		echo "<h5 class='card-title'>".$row['szallashelyneve']."</h5>";
		echo "<p class='card-text'> <span class='fw-bold'>".$row['orszag']." </span> - ".$row['varos']."</p>";
		echo "<ul class='list-group list-group-flush'>";
		echo "<li class='list-group-item'>Kezdet: ".$row['mettol']."</li>";
		echo "<li class='list-group-item'>Vége: ".$row['meddig']."</li>";
		echo "<li class='list-group-item'>".$row['tipus']." - ".$row['kategoria']."</li>";

	  	echo "</ul>";
	
		echo "<a href='' class='btn btn-dark w-100'> Bővebb információ </a>";
		echo "</div>";
		echo "</div>";



				
			}





}
else{
	echo "<tr><td>Nincs találat</td></tr>";
}
echo "</div>";

?>
