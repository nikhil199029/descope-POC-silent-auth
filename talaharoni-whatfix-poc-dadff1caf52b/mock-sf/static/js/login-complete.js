(function () {
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

    var oidcClient = null;

    async function init() {
        oidcClient = new oidc.UserManager(OidcSettings);
        document.getElementById("btnSignOut").addEventListener('click', signOut);
        
        oidcClient.signinRedirectCallback(window.location.href).then((user) => {
            console.log("user user user")
            console.log(JSON.stringify(user))
            console.log("signinRedirectCallback called")
            console.log(JSON.stringify(user))
            if (user != null && user.profile != null) {
                document.getElementById("txtEmailId").innerText = user.profile.email;
            }
        });
    }
    init();

    function signOut() {
        oidcClient.signoutRedirect({}).then(function (req) {
            console.log("signout request", req, "<a href='" + req.url + "'>go signout</a>");
            window.location = req.url;
        });
    }
})();