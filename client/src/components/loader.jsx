import '../styles/loader.css'


export default function Loader ({visibility, top}) {
    return (
        <div id = 'loader' style = {{ display: visibility, top: top}}>         
            <span className = "loader"></span>
        </div>
    )

}