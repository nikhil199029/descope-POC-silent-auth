(() => {
    const OidcSettings = {
        authority: "https://keycloak-sb.quickolabs.com/realms/mock-testing/protocol/openid-connect/auth",
        client_id: "mock-sf-client",
        redirect_uri: "http://0.0.0.0:9124/",
        post_logout_redirect_uri: "http://0.0.0.0:9124/",
        response_type: "code",
        scope: "openid email roles",
        response_mode: "fragment",
        metadataUrl: "https://keycloak-sb.quickolabs.com/realms/mock-testing/.well-known/openid-configuration",
        filterProtocolClaims: true
    };

    var oidcClient = null, client = null;

    function init() {
        oidcClient = new oidc.UserManager(OidcSettings);
        document.getElementById("btnSignIn").addEventListener('click', signIn);
        window.addEventListener('popstate', loadPoppedState);

        // client = new oidc.UserManager(OidcSettings);
        // alert();
    }
    init();

    async function signIn() {


        let user = await oidcClient.signinsilent()

        alert(user);
        if (false) {
            oidcClient.signinRedirect().then(function (req) {
                console.log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
                window.location = req.url;
            }).catch(function (err) {
                console.error(err);
                console.log(err);
            });
        }
        // let user = await client.signinSilent();
    }


    function loadPoppedState(e) {
        console.log(e);
        console.log(e.state);
        alert("Popped State");
    }



})();





