import { useRouter } from "next/router"
import { API_BASE_URL } from "../../constants"

export default function Discord({ openOauth, successful }) {

    if(typeof window != "undefined"){
        const router = useRouter()
        const params = new URL(window.location.href.replace("#", "?")).searchParams;

        if(!params.get("access_token")) {
            router.push("https://discord.com/api/oauth2/authorize?client_id=832045938985140244&redirect_uri=https%3A%2F%2Faperii.com%2Flink%2Fdiscord&response_type=token&scope=identify")
            return null
        }

        fetch(`${API_BASE_URL}/users/@me/connections`, {
            method: "PUT",
            headers: {
                "authorization": window.localStorage.getItem("token"),
                "content-type": "application/json"
            },
            body: `{"discordToken": "${params.get("access_token")}"}`
        }).then(res => res.json()).then(data => {
            if(!data.error) router.push("/home")
        })
        
    }
    return null
}