import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for existing JWT on store initialization
const getInitialLoginState = () => {
    try {
        const jwtToken = localStorage.getItem('jwtToken');
        const jwtTime = localStorage.getItem('jwtToken_time');
        const jwtUser = localStorage.getItem('jwtToken_user');
        
        console.log('settingSlice: Initializing with JWT:', jwtToken ? 'Found' : 'Not found');
        console.log('settingSlice: JWT time:', jwtTime);
        console.log('settingSlice: JWT user:', jwtUser);
        
        if (jwtToken && jwtTime && jwtUser) {
            // Check if JWT token is not expired (basic check)
            const tokenTime = new Date(jwtTime);
            const currentTime = new Date();
            const timeDiff = currentTime.getTime() - tokenTime.getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            
            console.log('settingSlice: Token age (hours):', hoursDiff);
            
            // If token is less than 24 hours old, consider it valid
            if (hoursDiff < 24) {
                console.log('settingSlice: Setting initial login state to TRUE');
                return {
                    isLogin: true,
                    email: jwtUser,
                    password: "", // Don't store password in state
                    loginTime: jwtTime
                };
            } else {
                console.log('settingSlice: Token expired, clearing localStorage');
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('jwtToken_time');
                localStorage.removeItem('jwtToken_user');
            }
        }
    } catch (error) {
        console.log('Error reading localStorage:', error);
    }
    
    console.log('settingSlice: Setting initial login state to FALSE');
    return {
        isLogin: false,
        email: "",
        password: "",
        loginTime: " -"
    };
};

const settingSlice = createSlice({ 
    name: 'Settings Slice',
    initialState: {
        accountLogin: getInitialLoginState()
    },
    reducers: {
        updateLogin: function (state, action)
        {
            state.accountLogin.isLogin = action.payload.setLogin;
            state.accountLogin.email = action.payload.email;
            state.accountLogin.password = action.payload.password;
            state.accountLogin.loginTime = action.payload.loginTime;

            console.log("settingSlice: updateLogin: isLogin:", state.accountLogin.isLogin);
            console.log("settingSlice: updateLogin: email:", JSON.parse(JSON.stringify(state.accountLogin.email)));
            console.log("settingSlice: updateLogin: password:", JSON.parse(JSON.stringify(state.accountLogin.password)));
        },
        clearLogin: function (state, action)
        {
            state.accountLogin.isLogin = false;
            state.accountLogin.email = "";
            state.accountLogin.password = "";
            state.accountLogin.loginTime = " -";

            console.log("settingSlice: clearLogin: isLogin:", state.accountLogin.isLogin);
            console.log("settingSlice: clearLogin: email:", JSON.parse(JSON.stringify(state.accountLogin.email)));
            console.log("settingSlice: clearLogin: password:", JSON.parse(JSON.stringify(state.accountLogin.password)));
        },        
    },
});

export const { updateLogin, clearLogin } = settingSlice.actions;

export default settingSlice.reducer;