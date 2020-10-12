function onVidyoClientLoaded(status) {
    switch (status.state) {
    case "READY":    // The library is operating normally              
        console.log("Ready to connect")
        break;
    default:
        console.log("Vidyo client load failed.");
        break;
    }
}

document.querySelector("#join-call").addEventListener("click", function(e) {
    e.preventDefault();
    const displayName = document.querySelector("input[name=name]").value;
    fetch("/token")
        .then(res => res.json())
        .then(function(data) {
        const token = data.token;
        connect(token, displayName);
    })
});

function connect(token, displayName) {
    VC.CreateVidyoConnector({
        viewId: "video", // Div ID where the composited video will be rendered
        viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
        remoteParticipants: 15, // Maximum number of participants
        logFileFilter: "warning all@VidyoConnector info@VidyoClient",
        logFileName:"",
        userData:""
    }).then(function(vidyoConnector) {
        vidyoConnector.Connect({
            host: "prod.vidyo.io",
            token: token,
            displayName: displayName,
            resourceId: "DefaultRoom",
        }).then(function(status) {
            if (status) {
                console.log("Connection Success");
            } else {
                console.error("Connection Failed");
            }
        }).catch(function() {
            console.error("Connection Failed");
        });
    }).catch(function() {
        console.error("CreateVidyoConnector Failed");
    });
}