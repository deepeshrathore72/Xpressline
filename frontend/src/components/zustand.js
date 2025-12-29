// import { create } from "zustand";

// export const useStore = create((set) => ({
//     auth: {
//         name: "",
//         email: "",
//         address: "",
//         origin: {
//             latitude: "",
//             longitude: ""
//         },
//         destination: {
//             latitude: "",
//             longitude: ""
//         },
//         payment: "",
//     },
//     setName: (name) => set((state) => ({ auth: { ...state.auth, name: name } })),
//     setEmail: (email) => set((state) => ({ auth: { ...state.auth, email: email } })),
//     setAddress: (address) => set((state) => ({ auth: { ...state.auth, address: address } })),
//     setOrigin: (state) => set((state) => ({ auth: { ...state.auth, origin: { ...state.auth.origin, latitude: state.latitude, longitude: state.longitude } } })),
//     setDestination: (state) => set((state) => ({ auth: { ...state.auth, destination: { ...state.auth.destination, latitude: state.latitude, longitude: state.longitude } } })),
//     setPayment: (payment) => set((state) => ({ auth: { ...state.auth, payment: payment } })),
// }
// ));

import {create} from 'zustand';

export const useStore = create((set) => ({
    name: "harsh",
    email: "hhrx",
    address: "ghar",
    origin: {
        latitude: "",
        longitude: ""
    },
    destination: {
        latitude: "",
        longitude: ""
    },
    payment: "",
    setName: (name) => set({ name: name }),
    setEmail: (email) => set({ email: email }),
    setAddress: (address) => set({ address: address }),
    setOrigin: (state) => set({ origin: { ...state.origin, latitude: state.latitude, longitude: state.longitude } }),
    setDestination: (state) => set({ destination: { ...state.destination, latitude: state.latitude, longitude: state.longitude } }),    
    setPayment: (payment) => set({ payment: payment }),
}
));

console.log("hi");