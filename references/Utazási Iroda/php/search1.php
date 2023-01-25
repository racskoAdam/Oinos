<?php

// Create connection

$conn = mysqli_connect("localhost", "root", "", "utiroda");
$sql = "SELECT utid FROM utak WHERE utid LIKE '%$_POST[name]%'";

$result = mysqli_query($conn, $sql);

echo "<div class='row d-flex justify-content-evenly p-5'>";
if(mysqli_num_rows($result)>0){
	while ($row=mysqli_fetch_assoc($result)) {
		
		echo "<div>".$row['utid'];	
			}
}
else{
	echo "<tr><td>Nincs találat</td></tr>";
}
echo "</div>";

?>
