if (accessToken === null) {
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("profileDropdown").style.display = "none";
}
else {
    document.getElementById("loginButton").style.display = "none";

    profileDropDown = document.getElementById("profileDropdown");
    profileDropDown.style.display = "block";
    profileDropDown.innerHTML = parsedToken["username"]
}

function logout() {
    localStorage.removeItem("moshan_access_token");
    localStorage.removeItem("moshan_refresh_token");
    window.location.href = "https://auth.moshan.tv/logout?logout_uri=https://" + window.location.hostname + "/index.html&client_id=68v5rahd0sdvrmf7fgbq2o1a9u"
}

