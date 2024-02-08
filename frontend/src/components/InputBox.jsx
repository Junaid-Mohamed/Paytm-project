export const InputBox = ({label,placeholder,onChange,type,value}) =>{
    return(
        <div>
            <div className="text-sm font-medium text-left py-2">{label}</div>
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-300" />
        </div>
    )
}

// py - means padding top and bottom