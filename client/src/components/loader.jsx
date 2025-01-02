import '../styles/loader.css'


export default function Loader ({visible}) {
    return (
        <div id = 'loader' style = {{textAlign: 'center', top: 532, position: 'relative', display: visible? 'none': 'block'}}>         
            <span className = "loader"></span>
        </div>
    )

}