
export const ButtonPrimary = ({children, className, type}) => {  
    // let type = props.type || "button"
    return (
        <button 
        className={"py-2 rounded-lg text-xs font-medium bg-purple-800 text-white hover:bg-purple-900 " + className}
        >
            {children} 
        </button>
    )
} 

export const ButtonSecondary = ({children, className, type}) => {
    // let type = type || "button"
    return (
        <button 
        className={"py-2 border-[1.5px] text-xs font-medium border-purple-800 rounded-lg bg-white text-purple-800 hover:bg-purple-100 " + className}
        >
            {children}
        </button>
    )
} 

export const ButtonCapsule = ({children, className,type}) => { 
    // let type = type || "button"
    return (
        <button 
        className={"py-2 rounded-3xl text-xs font-medium bg-purple-800 text-white hover:bg-purple-900 " + className}
        >
            {children}
        </button>
    )
} 

export const ButtonCapsuleSecond = ({children, className,type}) => { 
    // let type = type || "button"
    return (    
        <button 
        className={"py-2 border-2 text-xs font-medium border-purple-800 rounded-3xl bg-white text-purple-800 hover:bg-purple-100 " + className}
        >
            {children}
        </button>
    )
    
}