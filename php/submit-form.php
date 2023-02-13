$host = "localhost";
$user = "root";
$password = "";
$db = "opd";
$con = mysqli_connect($host, $user, $password, $db);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
$name = mysqli_real_escape_string($con, $_POST['name']);
$email = mysqli_real_escape_string($con, $_POST['email']);
$phone = mysqli_real_escape_string($con, $_POST['phone']);
$date_time = mysqli_real_escape_string($con, $_POST['date_time']);

// Check if there is already a reservation with the same phone number
$check_sql = "SELECT * FROM reservations WHERE phone = '$phone'";
$check_result = mysqli_query($con, $check_sql);

if (mysqli_num_rows($check_result) > 0) {
    // If there is already a reservation with the same phone number
    $existing_reservation = mysqli_fetch_assoc($check_result);

    if ($existing_reservation['date_time'] === $date_time) {
        // If the existing reservation has the same date and time as the new reservation
        echo "A foglalás már létezik a megadott telefonszámmal és időponttal.";
    } else {
        // If the existing reservation has a different date and time from the new reservation
        $sql = "INSERT INTO reservations ( name, email, phone, date_time) VALUES ('$name', '$email', '$phone', '$date_time')";

        if (mysqli_query($con, $sql)) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
    }
} else {
    // If there is no reservation with the same phone number
    $sql = "INSERT INTO reservations ( name, email, phone, date_time) VALUES ('$name', '$email', '$phone', '$date_time')";

    if (mysqli_query($con, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($con);
    }
}

mysqli_close($con);
