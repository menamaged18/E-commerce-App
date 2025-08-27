// data/reducers/User.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import usersList from './usersList.json'
import { Iuser, initUser } from "@/interfaces/userInterfaces"

interface IIuser {
    staticData: Iuser;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isLoggedIn: false | true;
    error: string | null;
}

const initialState: IIuser = {
    staticData: initUser,  
    status: 'idle',
    isLoggedIn: false,
    error: null,
};

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
            const { email, password } = action.payload;
            const user = usersList.users.find((user) => user.Email === email);

            if (!user) {
                state.status = 'failed';
                state.error = 'User not found';
                return;
            }

            if (user.password !== password) {
                state.status = 'failed';
                state.error = 'Invalid password';
                return;
            }

            state.staticData = {
                ID: user.ID,
                Name: user.Name,
                Email: user.Email,
                type: user.type as "A" | "N",
            };
            state.status = 'succeeded';
            state.isLoggedIn = true;
            state.error = null;
        },
        logoutUser: (state) => {
            state.staticData = initUser;
            state.status = 'idle';
            state.isLoggedIn = false;
            state.error = null;
        }
    }
});

export const { loginUser, logoutUser } = users.actions;
export default users.reducer;