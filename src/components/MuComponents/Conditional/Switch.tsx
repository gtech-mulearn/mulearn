type Child=JSX.Element| null|string

interface ChildElement {
    children: Child|JSX.Element[]
}

interface CaseProps extends ChildElement {
    condition: boolean
}
/**
 * Generates a switch component that renders the first child whose condition is true, or the default child if no condition is true.
 *
 * @param {ChildElement} children - The children elements of the switch component.
 * @return {JSX.Element} - The matched child or the default child if no condition is true.
 */
const Switch = ({children}:ChildElement) => {
    if(Array.isArray(children)){
        let matchChild:Child = null,defaultChild:Child = null
        children.forEach((child:Child)=>{
            if(!matchChild && (child as JSX.Element)?.type.name==='Case'){
                const {condition} = (child as JSX.Element)?.props
                if(Boolean(condition)) matchChild=child
                else if (!defaultChild && (child as JSX.Element)?.type.name==='Default') defaultChild=child 
            }
        }) 
        console.log(defaultChild,matchChild)
        return matchChild || <>{defaultChild}</> ||<></>
    }
    return <></>
}

/**
 * Renders the children if the condition is true.
 * 
 * @param condition - The condition to check.
 * @param children - The children to render.
 */
const Case = ({ condition, children }: CaseProps) => <>{children}</>;

/**
 * Renders the default component.
 *
 * @param {ChildElement} props - The props for the component.
 * @returns {React.ReactNode} The rendered component.
 */

const Default = ({children}:ChildElement)=><>{children}</>


export { Switch,Case,Default}