
export default function Capstone_config() {
    // change the base URL here and all places refering to endpoints from this file will use it
    const backendBaseURL = "http://localhost:3000";

    var config = {
        productEP: `${backendBaseURL}/product`,
		categoryEP: `${backendBaseURL}/category`,
        userLoginEP: `${backendBaseURL}/user/login`,
        userAllEP: `${backendBaseURL}/user/all`,
        userRegisterEP: `${backendBaseURL}/user/register`,
        defaultLoginEmail: "austin@ymail.com",
        defaultLoginPw: "iamaustin123"
    };

    return config;
}