export const Balance = ({value}) =>{
    return (
        <div className="flex" >
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-smeibold ml-4 text-lg">
                Rs {value}
            </div>
        </div>
    )
}