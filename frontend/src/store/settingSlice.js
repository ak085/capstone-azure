import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({ 
    name: 'Settings Slice',
    initialState: {
        accountLogin: {isLogin: false, email: "", password: "", loginTime: " -"}
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