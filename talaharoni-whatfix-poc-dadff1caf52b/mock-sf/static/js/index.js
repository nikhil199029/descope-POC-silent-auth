(() => {

    const byId = (id) => document.getElementById(id);

    const OidcSettings = {
        authority: "https://keycloak-sb-external.quickolabs.com/realms/mock-testing/protocol/openid-connect/auth",
        client_id: "mock-sf-client",
        redirect_uri: "http://localhost:8000/login-complete.html",
        post_logout_redirect_uri: "http://localhost:8000/",
        response_type: "code",
        scope: "openid email roles",
        response_mode: "fragment",
        metadataUrl: "https://keycloak-sb-external.quickolabs.com/realms/mock-testing/.well-known/openid-configuration",
        filterProtocolClaims: true
    };
    // const OidcSettings = {
    //     authority: "https://dev-42892421-admin.okta.com/oauth2/default",
    //     client_id: "0oactdm3vk9CXczFW5d7",
    //     redirect_uri: "http://localhost:8000/login-complete.html",
    //     post_logout_redirect_uri: "http://localhost:8000/",
    //     response_type: "code",
    //     scope: "openid email profile",
    //     response_mode: "fragment",
    //     metadataUrl: "https://dev-42892421-admin.okta.com/oauth2/default/.well-known/openid-configuration",
    //     filterProtocolClaims: true
    // };

    var oidcClient = null, client = null;

    async function init() {
        oidcClient = new oidc.UserManager(OidcSettings);

        // let parsedUrl = new URL(window.location.href);
        // let stateParam = parsedUrl.hash;

        // if (stateParam) {
        //     console.log("stateParam found", stateParam);
        //     oidcClient.signinRedirectCallback(window.location.href).then((user) => {
        //         console.log("signinRedirectCallback called")
        //         if (user != null && user.profile != null) {
        //             document.getElementById("txtUserName").innerText = `${user.profile.family_name}, ${user.profile.given_name}`
        //             document.getElementById("txtEmailId").innerText = user.profile.email;
        //         }
        //     });

        // } else {
        //     console.log("stateParam not found");
        //     try {

        //         oidcClient.signinSilentCallback().then((tmp) => {
        //             console.log("signinSilentCallback", tmp);
        //         }).catch((err) => {
        //             console.error("error in signinsilentcallback", err);
        //         });

        //         console.log("about to call SigninSilent");

        //         let user = await oidcClient.signinSilent();
        //         console.log("SigninSilent called", user);

        //     } catch (err) {
        //         if (err.name === "ErrorResponse" && err.error === "login_required") {
        //             alert("Login is needed. Redirecting");
        //             signIn();
        //         } else {
        //             console.error("signinComplete", JSON.stringify(err));
        //         }
        //     }
        // }




        // if (user) {
        //     byId("notLoggedin").style.display = "none";
        //     byId("loggedIn").style.display = "block";
        //     byId("txtUserName").innerText = user.profile.email;
        // } else {
        //     byId("btnSignIn").addEventListener('click', signIn);
        //     byId("notLoggedin").style.display = "block";
        //     byId("loggedIn").style.display = "none";
        // }
        byId("btnSignIn").addEventListener("click", signIn);

    }
    init();

    async function signIn() {

        var optionalArgs = { nothing: "unrequired as of now" };
        oidcClient.signinRedirect(optionalArgs).then(function (req) {
            console.log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
            window.location = req.url;
        }).catch(function (err) {
            console.error(err);
            console.log(err);
        });

        // let user = await client.signinSilent();
    }


    function loadPoppedState(e) {
        console.log(e);
        console.log(e.state);
        alert("Popped State");
    }



})();





