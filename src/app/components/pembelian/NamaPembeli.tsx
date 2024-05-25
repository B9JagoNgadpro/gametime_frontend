"use client"
const NamaPembeli=()=>{
    const email = localStorage.getItem("email")
    return(
        <>
        <h2> Hi, {email}</h2>
        </>
    );
};

export default NamaPembeli
