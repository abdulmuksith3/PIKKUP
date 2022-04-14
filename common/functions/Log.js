const LOG_API = "https://discord.com/api/webhooks/964062714521591838/sMFn5VxV7c3svW_tbaWR_RsCbOyeFO39kG49sPc2otckRy9M_ox5-Ax917F7a3sEjqwC";

export const logMessage = async (msg) => {
    let message = `${msg?.title}: \nUser - ${msg?.userId} \nMessage - ${msg?.body}`
    try {
        const URL = `${LOG_API}`;
        await fetch(URL, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({content:message})
        })
    } catch (err) {
        return;
    }
}
