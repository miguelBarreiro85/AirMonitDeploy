$(document).ready(function () {
    $("#getAllEntries").click(() => {
        getAirEntries("", "/api/AirEntries");
    });
    $("#airEntryLeiria").click(() => {
        getAirEntries("Leiria", "/api/AirEntries/cities/");
    });
    $("#airEntryPorto").click(() => {
        getAirEntries("Porto", "/api/AirEntries/cities/");
    });
    $("#airEntryCoimbra").click(() => {
        getAirEntries("Coimbra", "/api/AirEntries/cities/");
    });
    $("#airEntryLisboa").click(() => {
        getAirEntries("Lisboa", "/api/AirEntries/cities/");
    });
    $("#bSubmit").click(() => {
        if ($("#bstartDate").val() > $("#bendDate").val()) {
            alert("Data inicial deve ser menor que a data final ");
        } else {
            var jsonForm = { form: $("#dailyForm").serialize() };
            console.log("/api/resumes/" + $("#bElem").val() + "/" + $("#bCity").val() + "?dateIn=" + $("#bstartDate").val() + "&dateOut=" + $("#bendDate").val());
            $.get("/api/resumeAlarms/date/elements/" + $("#bElem").val() + "/cities/" + $("#bCity").val() + "?dateIn=" + $("#bstartDate").val() + "&dateOut=" + $("#bendDate").val(), (data, status) => {
                console.log(JSON.stringify(data));
                $("#DivBody").html("");
                var html = '<table class="table"><thead>';
                html += '<th>Maximum Value</th>';
                html += '<th>Minimum Value</th>';
                html += '<th>Average Value</th>';
                html += '<th>Location</th>';
                html += '<th>Resume Date</th>';
                html += "</thead>";
                html += "<tbody>";
                for (i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += '<td>' + data[i]["Max"] + '</td>';
                    html += '<td >' + data[i]["Min"] + '</td>';
                    html += '<td>' + data[i]["Avg"] + '</td>';
                    html += '<td>' + data[i]["City"] + '</td>';
                    html += '<td>' + data[i]["Date"] + '</td>';
                    html += "</tr>";
                }
                html += "</tbody>";
                html += "</table>";
                $("#DivBody").append(html);
            });
        }
    });
    function getAirEntries(city, url) {
        $("#DivBody").html("");
        console.log(city);
        var baseUrl = document.location.origin;
        $.get(baseUrl + url + city, function (data, status) {
            var html = '<table class="table"><thead>';
            html += '<th>CityElementID</th>';
            html += '<th>Element</th>';
            html += '<th>ElementValue</th>';
            html += '<th>City</th>';
            html += '<th>Date</th>';
            html += "</thead>";
            html += "<tbody>";
            for (i = 0; i < data.length; i++) {
                html += "<tr>";
                html += '<td>' + data[i]["CityElementID"] + '</td>';
                html += '<td >' + data[i]["Element"] + '</td>';
                html += '<td>' + data[i]["ElementValue"] + '</td>';
                html += '<td>' + data[i]["Location"] + '</td>';
                html += '<td>' + data[i]["Date"] + '</td>';
                html += "</tr>";
            }
            html += "</tbody>";
            html += "</table>";
            $("#DivBody").append(html);
        });
    }
});