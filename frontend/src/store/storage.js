import { configureStore } from '@reduxjs/toolkit';
import settingSlice from './settingSlice.js';

export default configureStore({
    reducer: {
        settings: settingSlice
    },
});

