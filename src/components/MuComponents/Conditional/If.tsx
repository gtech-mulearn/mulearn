interface ChildElementProps {
    children: JSX.Element|JSX.Element[]|string
}
interface IfElementProps extends ChildElementProps {
    condition: boolean
}

/**
 * Renders conditional JSX based on the given condition.
 *
 * @param {object} condition - The condition to be evaluated.
 * @param {JSX.Element[] | JSX.Element} children - The JSX elements to be rendered conditionally.
 * @return {JSX.Element} The rendered JSX element.
 */
const If = ({condition, children}:IfElementProps) => {
    if(typeof children === 'string') return <>{children}</>
    if(Array.isArray(children)){
        const True=children.find(child=>child.type.name==='True')
        const False=children.find(child=>child.type.name==='False')
        return condition?<>{True}</>:<>{False}</>
    }
    else if ((children as JSX.Element)?.type.name==='True' && condition) return <>{children}</>
    else if((children as JSX.Element)?.type.name==='False' && !condition) return <>{children}</>
    else if (condition && (children as JSX.Element)?.type.name!=='False') return <>{children}</>
    return <></>
}

/**
 * Renders the children components.
 * 
 * @param children - The child elements to render.
 */
const True = ({ children }: ChildElementProps) => (<>{children}</>);

/**
 * Renders the children components.
 * 
 * @param children - The child elements to render.
 */
const False = ({ children }: ChildElementProps) => (<>{children}</>);


export { If, True, False }
