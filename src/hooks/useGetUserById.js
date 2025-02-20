import React, { useEffect } from "react";

export const useGetUserById = (userId, setUser) => {

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${userId}`).then((res) => res.json()).then((data) => setUser(data));
    }, []);

}