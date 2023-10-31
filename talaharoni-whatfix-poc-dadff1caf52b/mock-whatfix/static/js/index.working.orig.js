(async () => {
    const sdk = Descope({
        projectId: 'P2SWiUrKlpyYyNZ0hGE2XTtT953t',
        persistTokens: true,
        logger: {log: ()=>{}, error: ()=>{}}
    });
    let user = await sdk.refresh();
    console.log("user is ", user);

    // const sessionToken = sdk.getSessionToken();
    // console.log("sessionToken is ", sessionToken);
    const byId = (id) => document.getElementById(id);


    if (!user.ok) {
        // byId("btnLogin").addEventListener("click", doLogin);
        doLogin()
    }else{
        const me = await sdk.me()

        // alert(`User ${JSON.stringify(user)} is logged in`);
        displayUserDetails(me.data)
    }



    function doLogin() {
        const urlParams = new URLSearchParams(window.location.search);
        const flowId = urlParams.get('descope-login-flow')?.split('|')?.[0]
        console.log(flowId)

        // user is not logged it - we probably want to show <descope-wc
        // alert("not logged in");
        var container = document.getElementById('container');
        // debugger;
        container.innerHTML = '<descope-wc project-id="P2SWiUrKlpyYyNZ0hGE2XTtT953t" flow-id="test-oidc-flow"></descope-wc>';
        // container.innerHTML = `<descope-wc project-id="P2Qmar7b5rRuCxxfjWKwelSB07p8" base-url="https://api.descope.org" flow-id="${flowId || 'prompt-none'}"></descope-wc>`;

        const wcElement = document.getElementsByTagName('descope-wc')[0];
        const onSuccess = (e) => {
            displayUserDetails(e.detail.user);
            // sdk.refresh();

            // window.location.replace("./loggedIn?userId=" + encodeURIComponent(e.detail.user.loginIds))
        };
        const onError = (err) => {
            console.error('error is ', err.detail.errorDescription);
            byId("btnLogin").onclick = ()=> {
                wcElement.setAttribute('flow-id', 'prompt')
            }
            showNotLoggedIn()
        }

        wcElement.addEventListener('success', onSuccess);
        wcElement.addEventListener('error', onError);
    }

    function displayUserDetails(user) {
        if (user) {
            byId("notLoggedIn").style.display = "none";
            byId("loggedIn").style.display = "block";
            console.log(JSON.stringify(user));
            byId("txtUserEmailAddress").innerText = user.email;
            const logout = document.createElement("button");
            logout.innerText = "logout"
            logout.onclick = async () => {
                await sdk.logout()
                location.reload()
            }
            byId("loggedIn").append(logout)
        }
    }

    function showNotLoggedIn() {
            byId("notLoggedIn").style.display = "block";
            byId("loggedIn").style.display = "none";
            byId("txtUserEmailAddress").innerText = "not-logged-in  ";
    }

})()