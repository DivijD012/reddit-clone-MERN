import '../index.css';
import MyNavBar from "./navbar"

export default function MySubRedditPage() {
    var url = document.URL;
    url = url.split("/")
    url = url[4]
    return (
        <div>
            {MyNavBar(1, url, 0)}
        </div>
    )
}