import { type } from "os"
import { Children } from "react"

interface ChildElementProps {
    children: any
}
interface IfElementProps extends ChildElementProps {
    condition: any
}

/**
 * Renders conditional JSX based on the given condition.
 *
 * @param {object} condition - The condition to be evaluated.
 * @param {JSX.Element[] | JSX.Element} children - The JSX elements to be rendered conditionally.
 * @return {JSX.Element} The rendered JSX element.
 */
const If = ({condition:conditionalParameter, children}:IfElementProps) => {
    const condition=Boolean(conditionalParameter)
    if(Array.isArray(children) ){
        let True='',False=''
        for (let child of children){
            if (typeof child ==='string') return <>{children}</>
            if(child?.type?.name==='True') True=child
            if(child?.type?.name==='False') False=child
        }
        return condition?<>{True}</>:<>{False}</>
    }
    else if ((children as JSX.Element)?.type?.name==='True' && condition) return <>{children}</>
    else if((children as JSX.Element)?.type?.name==='False' && !condition) return <>{children}</>
    else if (condition && (children as JSX.Element)?.type?.name!=='False') return <>{children}</>
    return <></>
}

/**
 * Renders the children components.
 * 
 * @param children - The child elements to render.
 */

const True = ({ children }: ChildElementProps) =>(<>{children}</>)

/**
 * Renders the children components.
 * 
 * @param children - The child elements to render.
 */
const False = ({ children }: ChildElementProps) => (<>{children}</>);


export { If, True, False }
