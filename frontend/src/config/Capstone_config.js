
export default function Capstone_config() {
    // change the base URL here and all places refering to endpoints from this file will use it
    const backendBaseURL = "http://localhost:3000";

    var config = {
        productEP: `${backendBaseURL}/product`,
        productFilterEP: `${backendBaseURL}/product/filter/all`,
		categoryEP: `${backendBaseURL}/category`,
        categoryFilterEP: `${backendBaseURL}/category/filter`,
        userLoginEP: `${backendBaseURL}/user/login`,
        userAllEP: `${backendBaseURL}/user/all`,
        userRegisterEP: `${backendBaseURL}/user/register`,
        userFilterEP: `${backendBaseURL}/user/filter`,
        userUpdateEP: `${backendBaseURL}/user/update`,
        userDeleteEP: `${backendBaseURL}/user/delete`,
        defaultLoginEmail: "",
        defaultLoginPw: ""
    };

    return config;
}